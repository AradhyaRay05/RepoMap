from datetime import datetime
from app import db


class Repository(db.Model):
    __tablename__ = "repositories"

    id = db.Column(db.Integer, primary_key=True)
    github_url = db.Column(db.String(500), nullable=False, unique=True)
    owner = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    default_branch = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    analyses = db.relationship("Analysis", backref="repository", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "github_url": self.github_url,
            "owner": self.owner,
            "name": self.name,
            "description": self.description,
            "default_branch": self.default_branch,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }