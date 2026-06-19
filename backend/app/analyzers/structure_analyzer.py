import os
from pathlib import Path
from typing import Dict, List, Optional


class StructureAnalyzer:
    IGNORE_DIRS = {
        ".git", "node_modules", "__pycache__", ".venv", "venv",
        "env", ".env", "dist", "build", ".next", ".nuxt",
        "coverage", ".cache", "tmp", "temp",
    }

    IGNORE_FILES = {
        ".gitignore", ".env", ".env.local", ".DS_Store",
        "Thumbs.db", "*.pyc", "*.pyo", "*.class",
    }

    def analyze(self, repo_path: str) -> Dict:
        structure = self._build_tree(repo_path)
        modules = self._detect_modules(repo_path)
        layers = self._detect_layers(repo_path)

        return {
            "tree": structure,
            "modules": modules,
            "layers": layers,
            "root_directories": self._get_root_directories(repo_path),
        }

    def _build_tree(self, repo_path: str, max_depth: int = 4) -> Dict:
        tree = {}
        path = Path(repo_path)

        for item in sorted(path.iterdir()):
            if item.name.startswith(".") and item.name not in {".github", ".husky"}:
                continue
            if item.name in self.IGNORE_DIRS:
                continue

            if item.is_dir():
                child_count = self._count_children(item)
                if child_count > 0:
                    tree[item.name + "/"] = {
                        "type": "directory",
                        "children_count": child_count,
                    }
            else:
                tree[item.name] = {
                    "type": "file",
                    "size": item.stat().st_size,
                }

        return tree

    def _count_children(self, path: Path) -> int:
        count = 0
        try:
            for item in path.iterdir():
                if item.name in self.IGNORE_DIRS:
                    continue
                if item.is_file():
                    count += 1
                elif item.is_dir():
                    count += 1
        except PermissionError:
            pass
        return count

    def _get_root_directories(self, repo_path: str) -> List[str]:
        dirs = []
        path = Path(repo_path)

        for item in sorted(path.iterdir()):
            if item.is_dir() and not item.name.startswith("."):
                if item.name not in self.IGNORE_DIRS:
                    dirs.append(item.name)

        return dirs

    def _detect_modules(self, repo_path: str) -> List[str]:
        modules = []
        module_indicators = [
            "package.json", "setup.py", "pyproject.toml",
            "Cargo.toml", "go.mod", "pom.xml", "build.gradle",
        ]

        for root, dirs, files in os.walk(repo_path):
            dirs[:] = [d for d in dirs if d not in self.IGNORE_DIRS]

            for indicator in module_indicators:
                if indicator in files:
                    rel_path = os.path.relpath(root, repo_path)
                    if rel_path == ".":
                        modules.append("root")
                    else:
                        modules.append(rel_path.replace(os.sep, "/"))
                    break

        return modules

    def _detect_layers(self, repo_path: str) -> List[str]:
        layers = []
        layer_patterns = {
            "controllers": "Controller Layer",
            "controller": "Controller Layer",
            "routes": "Routing Layer",
            "router": "Routing Layer",
            "services": "Service Layer",
            "service": "Service Layer",
            "models": "Model Layer",
            "model": "Model Layer",
            "repositories": "Repository Layer",
            "repository": "Repository Layer",
            "middleware": "Middleware Layer",
            "utils": "Utility Layer",
            "helpers": "Utility Layer",
            "config": "Configuration Layer",
            "api": "API Layer",
            "views": "View Layer",
            "components": "Component Layer",
            "hooks": "Hook Layer",
            "stores": "State Management",
            "store": "State Management",
        }

        path = Path(repo_path)
        for item in path.rglob("*"):
            if item.is_dir() and item.name.lower() in layer_patterns:
                rel_path = os.path.relpath(item, repo_path)
                if "node_modules" not in rel_path and "__pycache__" not in rel_path:
                    layers.append({
                        "path": rel_path.replace(os.sep, "/"),
                        "type": layer_patterns[item.name.lower()],
                    })

        return layers