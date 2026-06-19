import os
import tempfile
from datetime import datetime
from typing import Dict, Optional
from app import db
from app.models.repository import Repository
from app.models.analysis import Analysis
from app.models.report import Report
from app.services.github_service import GitHubService
from app.analyzers.structure_analyzer import StructureAnalyzer
from app.analyzers.tech_detector import TechDetector
from app.analyzers.language_analyzer import LanguageAnalyzer
from app.analyzers.entry_point_detector import EntryPointDetector
from app.analyzers.dependency_analyzer import DependencyAnalyzer
from app.analyzers.architecture_detector import ArchitectureDetector
from app.analyzers.file_ranker import FileRanker


class AnalysisService:
    def __init__(self):
        self.github_service = GitHubService(os.environ.get("GITHUB_TOKEN", ""))
        self.structure_analyzer = StructureAnalyzer()
        self.tech_detector = TechDetector()
        self.language_analyzer = LanguageAnalyzer()
        self.entry_point_detector = EntryPointDetector()
        self.dependency_analyzer = DependencyAnalyzer()
        self.architecture_detector = ArchitectureDetector()
        self.file_ranker = FileRanker()

    def start_analysis(self, github_url: str) -> Dict:
        validation = self.github_service.validate_repository(github_url)
        if not validation["valid"]:
            raise ValueError(f"Repository validation failed: {validation.get('error', 'Unknown error')}")

        if validation.get("private", False):
            raise ValueError("Repository is private or inaccessible")

        repo = Repository.query.filter_by(github_url=github_url).first()
        if not repo:
            repo = Repository(
                github_url=github_url,
                owner=validation["owner"],
                name=validation["name"],
                description=validation.get("description"),
                default_branch=validation.get("default_branch"),
            )
            db.session.add(repo)
            db.session.commit()

        analysis = Analysis(
            repository_id=repo.id,
            status="processing",
            started_at=datetime.utcnow(),
        )
        db.session.add(analysis)
        db.session.commit()

        self._run_analysis(repo, analysis)

        return {
            "analysis_id": str(analysis.id),
            "status": "processing",
        }

    def _run_analysis(self, repo: Repository, analysis: Analysis) -> None:
        temp_dir = tempfile.mkdtemp()

        try:
            analysis.status = "cloning"
            analysis.progress = 10
            db.session.commit()

            self.github_service.clone_repository(repo.github_url, temp_dir)

            analysis.status = "analyzing"
            analysis.progress = 30
            db.session.commit()

            structure = self.structure_analyzer.analyze(temp_dir)
            analysis.progress = 40
            db.session.commit()

            tech_stack = self.tech_detector.detect(temp_dir)
            analysis.progress = 50
            db.session.commit()

            languages = self.language_analyzer.analyze(temp_dir)
            analysis.progress = 60
            db.session.commit()

            entry_points = self.entry_point_detector.detect(temp_dir)
            analysis.progress = 70
            db.session.commit()

            dependencies = self.dependency_analyzer.analyze(temp_dir)
            analysis.progress = 80
            db.session.commit()

            architecture = self.architecture_detector.detect(temp_dir)
            analysis.progress = 90
            db.session.commit()

            important_files = self.file_ranker.rank(temp_dir, entry_points, dependencies)

            reading_order = self._generate_reading_order(entry_points, important_files)

            report = Report(
                analysis_id=analysis.id,
                project_type=tech_stack["project_type"],
                architecture=architecture["architecture"],
                frontend_framework=tech_stack["frontend"],
                backend_framework=tech_stack["backend"],
                db_engine=tech_stack["database"],
                devops_tools=tech_stack["devops"],
                languages=languages,
                entry_points=entry_points,
                important_files=important_files[:20],
                reading_order=reading_order,
                dependency_graph=dependencies,
                directory_structure=structure,
            )

            report.onboarding_guide = self._generate_onboarding_guide(report)

            db.session.add(report)

            analysis.status = "completed"
            analysis.progress = 100
            analysis.completed_at = datetime.utcnow()
            db.session.commit()

        except Exception as e:
            analysis.status = "failed"
            analysis.error_message = str(e)
            db.session.commit()
            raise
        finally:
            self.github_service.cleanup(temp_dir)

    def _generate_reading_order(self, entry_points: Dict, important_files: list) -> list:
        reading_order = []

        if entry_points.get("config"):
            for f in entry_points["config"][:3]:
                if f not in reading_order:
                    reading_order.append(f)

        if entry_points.get("backend"):
            for f in entry_points["backend"][:3]:
                if f not in reading_order:
                    reading_order.append(f)

        if entry_points.get("frontend"):
            for f in entry_points["frontend"][:3]:
                if f not in reading_order:
                    reading_order.append(f)

        for item in important_files[:10]:
            if item["file"] not in reading_order:
                reading_order.append(item["file"])

        return reading_order[:15]

    def _generate_onboarding_guide(self, report: Report) -> str:
        guide_parts = ["# Repository Onboarding Guide\n"]

        guide_parts.append("## Project Overview\n")
        guide_parts.append(f"- **Project Type:** {report.project_type or 'Unknown'}")
        guide_parts.append(f"- **Architecture:** {report.architecture or 'Unknown'}")

        if report.frontend_framework:
            guide_parts.append(f"- **Frontend:** {report.frontend_framework}")
        if report.backend_framework:
            guide_parts.append(f"- **Backend:** {report.backend_framework}")
        if report.db_engine:
            guide_parts.append(f"- **Database:** {report.db_engine}")
        if report.devops_tools:
            guide_parts.append(f"- **DevOps:** {', '.join(report.devops_tools)}")

        if report.languages:
            guide_parts.append("\n## Languages\n")
            for lang in report.languages[:5]:
                guide_parts.append(f"- {lang['language']}: {lang['files']} files ({lang['percentage']}%)")

        if report.entry_points:
            guide_parts.append("\n## Entry Points\n")
            for category, files in report.entry_points.items():
                if files:
                    guide_parts.append(f"### {category.title()}")
                    for f in files[:3]:
                        guide_parts.append(f"- `{f}`")

        if report.important_files:
            guide_parts.append("\n## Important Files\n")
            for item in report.important_files[:10]:
                guide_parts.append(f"- `{item['file']}` (importance: {item['score']})")

        if report.reading_order:
            guide_parts.append("\n## Recommended Reading Order\n")
            for i, file in enumerate(report.reading_order, 1):
                guide_parts.append(f"{i}. `{file}`")

        return "\n".join(guide_parts)

    def get_analysis_status(self, analysis_id: str) -> Optional[Dict]:
        analysis = Analysis.query.get(int(analysis_id))
        if not analysis:
            return None
        return analysis.to_dict()