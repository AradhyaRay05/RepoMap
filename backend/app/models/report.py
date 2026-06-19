from datetime import datetime
from app import db


class Report(db.Model):
    __tablename__ = "reports"

    id = db.Column(db.Integer, primary_key=True)
    analysis_id = db.Column(db.Integer, db.ForeignKey("analyses.id"), nullable=False)
    project_type = db.Column(db.String(100), nullable=True)
    architecture = db.Column(db.String(100), nullable=True)
    frontend_framework = db.Column(db.String(100), nullable=True)
    backend_framework = db.Column(db.String(100), nullable=True)
    db_engine = db.Column("database", db.String(100), nullable=True)
    devops_tools = db.Column(db.JSON, nullable=True)
    languages = db.Column(db.JSON, nullable=True)
    entry_points = db.Column(db.JSON, nullable=True)
    important_files = db.Column(db.JSON, nullable=True)
    reading_order = db.Column(db.JSON, nullable=True)
    dependency_graph = db.Column(db.JSON, nullable=True)
    directory_structure = db.Column(db.JSON, nullable=True)
    onboarding_guide = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "analysis_id": self.analysis_id,
            "project_type": self.project_type,
            "architecture": self.architecture,
            "frontend": self.frontend_framework,
            "backend": self.backend_framework,
            "database": self.db_engine,
            "devops": self.devops_tools,
            "languages": self.languages,
            "entry_points": self.entry_points,
            "important_files": self.important_files,
            "reading_order": self.reading_order,
            "dependency_graph": self.dependency_graph,
            "directory_structure": self.directory_structure,
            "onboarding_guide": self.onboarding_guide,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }