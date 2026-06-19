from flask import Blueprint, request, jsonify
from app.api import api_bp
from app.services.analysis_service import AnalysisService
from app.utils.validators import validate_github_url

analysis_service = AnalysisService()


@api_bp.route("/analyze", methods=["POST"])
def analyze_repository():
    data = request.get_json()

    if not data or "github_url" not in data:
        return jsonify({"error": "github_url is required"}), 400

    github_url = data["github_url"]

    validation_error = validate_github_url(github_url)
    if validation_error:
        return jsonify({"error": validation_error}), 400

    try:
        result = analysis_service.start_analysis(github_url)
        return jsonify(result), 202
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api_bp.route("/analysis/<analysis_id>", methods=["GET"])
def get_analysis_status(analysis_id):
    try:
        status = analysis_service.get_analysis_status(analysis_id)
        if status is None:
            return jsonify({"error": "Analysis not found"}), 404
        return jsonify(status), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500