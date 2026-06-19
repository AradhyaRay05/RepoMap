import os
import re
import requests as http_requests
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, redirect
import jwt
from app.models.user import User
from app import db

auth_bp = Blueprint("auth", __name__)

SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-jwt-secret-key")
GOOGLE_CLIENT_ID = os.environ.get("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = os.environ.get("GOOGLE_CLIENT_SECRET", "")
GITHUB_CLIENT_ID = os.environ.get("GITHUB_CLIENT_ID", "")
GITHUB_CLIENT_SECRET = os.environ.get("GITHUB_CLIENT_SECRET", "")
FRONTEND_URL = os.environ.get("FRONTEND_URL", "http://localhost:3000")


def create_token(user_id):
    payload = {
        "user_id": user_id,
        "exp": datetime.utcnow() + timedelta(days=7),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["user_id"]
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None


def validate_email(email):
    return re.match(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", email)


def validate_password(password):
    errors = []
    if len(password) < 8:
        errors.append("at least 8 characters")
    if not re.search(r"[A-Z]", password):
        errors.append("an uppercase letter")
    if not re.search(r"[a-z]", password):
        errors.append("a lowercase letter")
    if not re.search(r"\d", password):
        errors.append("a number")
    if not re.search(r"[!@#$%^&*()_+\-=\[\]{};':\"\\|,.<>\/?]", password):
        errors.append("a special character")
    if " " in password:
        errors.append("no spaces")
    if errors:
        return "Password must contain " + ", ".join(errors)
    return None


def find_or_create_user(email, username, provider, avatar_url=None):
    user = User.query.filter_by(email=email).first()
    if user:
        return user, False

    base_username = username
    counter = 1
    while User.query.filter_by(username=username).first():
        username = f"{base_username}{counter}"
        counter += 1

    user = User(email=email, username=username, provider=provider)
    user.set_password(os.urandom(24).hex())
    db.session.add(user)
    db.session.commit()
    return user, True


@auth_bp.route("/config", methods=["GET"])
def get_config():
    return jsonify({
        "google_client_id": GOOGLE_CLIENT_ID,
        "github_client_id": GITHUB_CLIENT_ID,
        "frontend_url": FRONTEND_URL,
    })


@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    email = data.get("email", "").strip().lower()
    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not email or not validate_email(email):
        return jsonify({"error": "Valid email is required"}), 400
    if not username or len(username) < 3:
        return jsonify({"error": "Username must be at least 3 characters"}), 400
    if not password:
        return jsonify({"error": "Password is required"}), 400

    password_error = validate_password(password)
    if password_error:
        return jsonify({"error": password_error}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already taken"}), 409

    user = User(email=email, username=username, provider="email")
    user.set_password(password)
    db.session.add(user)
    db.session.commit()

    return jsonify({"token": create_token(user.id), "user": user.to_dict()}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Request body is required"}), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({"token": create_token(user.id), "user": user.to_dict()}), 200


@auth_bp.route("/github/login", methods=["GET"])
def github_login():
    if not GITHUB_CLIENT_ID:
        return jsonify({"error": "GitHub OAuth not configured. Set GITHUB_CLIENT_ID in .env"}), 500

    redirect_uri = f"{FRONTEND_URL}/auth/callback/github"
    github_url = f"https://github.com/login/oauth/authorize?client_id={GITHUB_CLIENT_ID}&redirect_uri={redirect_uri}&scope=user:email"
    return jsonify({"url": github_url})


@auth_bp.route("/github/callback", methods=["POST"])
def github_callback():
    data = request.get_json()
    code = data.get("code", "")

    if not code:
        return jsonify({"error": "Authorization code is required"}), 400

    if not GITHUB_CLIENT_ID or not GITHUB_CLIENT_SECRET:
        return jsonify({"error": "GitHub OAuth not configured"}), 500

    token_response = http_requests.post(
        "https://github.com/login/oauth/access_token",
        json={"client_id": GITHUB_CLIENT_ID, "client_secret": GITHUB_CLIENT_SECRET, "code": code},
        headers={"Accept": "application/json"},
        timeout=10,
    )

    if token_response.status_code != 200:
        return jsonify({"error": "Failed to exchange code for token"}), 400

    token_data = token_response.json()
    access_token = token_data.get("access_token")

    if not access_token:
        return jsonify({"error": "No access token received from GitHub"}), 400

    user_response = http_requests.get(
        "https://api.github.com/user",
        headers={"Authorization": f"Bearer {access_token}", "Accept": "application/json"},
        timeout=10,
    )

    if user_response.status_code != 200:
        return jsonify({"error": "Failed to fetch GitHub profile"}), 400

    gh_user = user_response.json()
    email = gh_user.get("email")
    username = gh_user.get("login", "github_user")
    avatar = gh_user.get("avatar_url")

    if not email:
        emails_response = http_requests.get(
            "https://api.github.com/user/emails",
            headers={"Authorization": f"Bearer {access_token}", "Accept": "application/json"},
            timeout=10,
        )
        if emails_response.status_code == 200:
            emails = emails_response.json()
            primary = next((e for e in emails if e.get("primary") and e.get("verified")), None)
            if primary:
                email = primary["email"]
            elif emails:
                email = emails[0]["email"]

    if not email:
        return jsonify({"error": "Could not get email from GitHub. Make sure your email is public."}), 400

    user, _ = find_or_create_user(email, username, "github", avatar)
    return jsonify({"token": create_token(user.id), "user": user.to_dict()}), 200


@auth_bp.route("/google/login", methods=["GET"])
def google_login():
    if not GOOGLE_CLIENT_ID:
        return jsonify({"error": "Google OAuth not configured. Set GOOGLE_CLIENT_ID in .env"}), 500

    redirect_uri = f"{FRONTEND_URL}/auth/callback/google"
    google_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={GOOGLE_CLIENT_ID}"
        f"&redirect_uri={redirect_uri}"
        f"&response_type=code"
        f"&scope=openid%20email%20profile"
        f"&access_type=offline"
    )
    return jsonify({"url": google_url})


@auth_bp.route("/google/callback", methods=["POST"])
def google_callback():
    data = request.get_json()
    code = data.get("code", "")

    if not code:
        return jsonify({"error": "Authorization code is required"}), 400

    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        return jsonify({"error": "Google OAuth not configured"}), 500

    token_response = http_requests.post(
        "https://oauth2.googleapis.com/token",
        json={
            "client_id": GOOGLE_CLIENT_ID,
            "client_secret": GOOGLE_CLIENT_SECRET,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": f"{FRONTEND_URL}/auth/callback/google",
        },
        timeout=10,
    )

    if token_response.status_code != 200:
        return jsonify({"error": "Failed to exchange code for token"}), 400

    token_data = token_response.json()
    access_token = token_data.get("access_token")

    if not access_token:
        return jsonify({"error": "No access token received from Google"}), 400

    user_response = http_requests.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        headers={"Authorization": f"Bearer {access_token}"},
        timeout=10,
    )

    if user_response.status_code != 200:
        return jsonify({"error": "Failed to fetch Google profile"}), 400

    google_user = user_response.json()
    email = google_user.get("email", "").lower()
    name = google_user.get("name", "Google User")
    avatar = google_user.get("picture")
    username = email.split("@")[0] if email else "google_user"

    if not email:
        return jsonify({"error": "Could not get email from Google"}), 400

    user, _ = find_or_create_user(email, username, "google", avatar)
    return jsonify({"token": create_token(user.id), "user": user.to_dict()}), 200


@auth_bp.route("/me", methods=["GET"])
def me():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return jsonify({"error": "Missing token"}), 401

    token = auth_header.split(" ", 1)[1]
    user_id = verify_token(token)
    if not user_id:
        return jsonify({"error": "Invalid or expired token"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"user": user.to_dict()}), 200