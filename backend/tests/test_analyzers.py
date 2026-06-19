import os
import tempfile
import pytest
from app.analyzers.structure_analyzer import StructureAnalyzer
from app.analyzers.tech_detector import TechDetector
from app.analyzers.language_analyzer import LanguageAnalyzer
from app.analyzers.entry_point_detector import EntryPointDetector
from app.analyzers.architecture_detector import ArchitectureDetector


@pytest.fixture
def temp_repo():
    with tempfile.TemporaryDirectory() as tmpdir:
        os.makedirs(os.path.join(tmpdir, "src"))
        os.makedirs(os.path.join(tmpdir, "controllers"))
        os.makedirs(os.path.join(tmpdir, "models"))
        os.makedirs(os.path.join(tmpdir, "views"))

        with open(os.path.join(tmpdir, "package.json"), "w") as f:
            f.write('{"dependencies": {"react": "^18.0.0", "express": "^4.18.0"}}')

        with open(os.path.join(tmpdir, "src", "main.tsx"), "w") as f:
            f.write('import React from "react";')

        with open(os.path.join(tmpdir, "app.py"), "w") as f:
            f.write("from flask import Flask\napp = Flask(__name__)")

        yield tmpdir


class TestStructureAnalyzer:
    def test_analyze_returns_structure(self, temp_repo):
        analyzer = StructureAnalyzer()
        result = analyzer.analyze(temp_repo)

        assert "tree" in result
        assert "modules" in result
        assert "layers" in result
        assert "root_directories" in result

    def test_detects_directories(self, temp_repo):
        analyzer = StructureAnalyzer()
        result = analyzer.analyze(temp_repo)

        assert "src" in result["root_directories"]
        assert "controllers" in result["root_directories"]


class TestTechDetector:
    def test_detects_react(self, temp_repo):
        detector = TechDetector()
        result = detector.detect(temp_repo)

        assert result["frontend"] == "React"

    def test_detects_express(self, temp_repo):
        detector = TechDetector()
        result = detector.detect(temp_repo)

        assert result["backend"] == "Express"

    def test_project_type_full_stack(self, temp_repo):
        detector = TechDetector()
        result = detector.detect(temp_repo)

        assert result["project_type"] == "Full Stack"


class TestLanguageAnalyzer:
    def test_analyze_returns_languages(self, temp_repo):
        analyzer = LanguageAnalyzer()
        result = analyzer.analyze(temp_repo)

        assert isinstance(result, list)
        assert len(result) > 0

    def test_detects_typescript(self, temp_repo):
        analyzer = LanguageAnalyzer()
        result = analyzer.analyze(temp_repo)

        languages = [lang["language"] for lang in result]
        assert "TypeScript" in languages


class TestEntryPointDetector:
    def test_detects_entry_points(self, temp_repo):
        detector = EntryPointDetector()
        result = detector.detect(temp_repo)

        assert "frontend" in result
        assert "backend" in result
        assert "config" in result

    def test_detects_main_tsx(self, temp_repo):
        detector = EntryPointDetector()
        result = detector.detect(temp_repo)

        assert "src/main.tsx" in result["frontend"]


class TestArchitectureDetector:
    def test_detects_mvc(self, temp_repo):
        detector = ArchitectureDetector()
        result = detector.detect(temp_repo)

        assert result["architecture"] == "MVC"