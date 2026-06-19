from flask import jsonify
from app.api import api_bp
from app.services.report_service import ReportService

report_service = ReportService()


@api_bp.route("/report/<analysis_id>", methods=["GET"])
def get_report(analysis_id):
    try:
        report = report_service.get_report(analysis_id)
        if report is None:
            return jsonify({"error": "Report not found or analysis not complete"}), 404
        return jsonify(report), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api_bp.route("/report/<analysis_id>/guide", methods=["GET"])
def get_onboarding_guide(analysis_id):
    try:
        guide = report_service.get_onboarding_guide(analysis_id)
        if guide is None:
            return jsonify({"error": "Guide not available"}), 404
        return jsonify({"guide": guide}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500