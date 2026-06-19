from typing import Dict, Optional
from app.models.analysis import Analysis
from app.models.report import Report


class ReportService:
    def get_report(self, analysis_id: str) -> Optional[Dict]:
        analysis = Analysis.query.get(int(analysis_id))
        if not analysis:
            return None

        if analysis.status != "completed":
            return {
                "status": analysis.status,
                "progress": analysis.progress,
                "error": analysis.error_message,
            }

        report = Report.query.filter_by(analysis_id=analysis.id).first()
        if not report:
            return None

        return report.to_dict()

    def get_onboarding_guide(self, analysis_id: str) -> Optional[str]:
        analysis = Analysis.query.get(int(analysis_id))
        if not analysis or analysis.status != "completed":
            return None

        report = Report.query.filter_by(analysis_id=analysis.id).first()
        if not report:
            return None

        return report.onboarding_guide