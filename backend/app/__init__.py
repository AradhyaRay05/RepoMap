import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from dotenv import load_dotenv
import pymysql

pymysql.install_as_MySQLdb()

load_dotenv()

db = SQLAlchemy()
migrate = Migrate()


def create_app(config_name=None):
    app = Flask(__name__)

    if config_name is None:
        config_name = os.environ.get("FLASK_ENV", "development")

    db_url = os.environ.get("DATABASE_URL")
    if not db_url:
        db_url = "mysql+pymysql://root:Aradhya%40123@localhost:3306/repo_onboarding"

    app.config["SQLALCHEMY_DATABASE_URI"] = db_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key")
    app.config["GITHUB_TOKEN"] = os.environ.get("GITHUB_TOKEN", "")
    app.config["MAX_REPO_SIZE_MB"] = 500
    app.config["MAX_FILES"] = 20000
    app.config["MAX_ANALYSIS_TIME_SECONDS"] = 300

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    @app.route("/")
    def health_check():
        return jsonify({"status": "ok", "message": "Repository Onboarding Assistant API"})

    from app.api import api_bp
    app.register_blueprint(api_bp, url_prefix="/api")

    from app.api.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/api/auth")

    with app.app_context():
        from app.models import repository, analysis, report, user
        db.create_all()

    return app