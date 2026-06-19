import os
from pathlib import Path
from typing import Dict, List


class EntryPointDetector:
    ENTRY_POINT_PATTERNS = {
        "frontend": [
            "src/main.tsx", "src/main.ts", "src/main.js", "src/main.jsx",
            "src/index.tsx", "src/index.ts", "src/index.js", "src/index.jsx",
            "app/page.tsx", "app/page.ts", "app/page.js",
            "pages/index.tsx", "pages/index.ts", "pages/index.js",
            "src/App.tsx", "src/App.ts", "src/App.js", "src/App.jsx",
            "index.html",
        ],
        "backend": [
            "app.py", "main.py", "server.py", "run.py", "manage.py",
            "server.js", "server.ts", "index.js", "index.ts",
            "app.js", "app.ts", "main.js", "main.ts",
            "src/main.py", "src/app.py", "src/server.py",
            "cmd/main.go", "main.go",
            "src/main/java/**/Application.java",
            "Program.cs", "Startup.cs",
        ],
        "config": [
            "package.json", "requirements.txt", "Pipfile",
            "pyproject.toml", "Cargo.toml", "go.mod",
            "pom.xml", "build.gradle", "composer.json",
            "tsconfig.json", "vite.config.ts", "vite.config.js",
            "webpack.config.js", "next.config.js", "next.config.mjs",
            "angular.json", "svelte.config.js",
            "docker-compose.yml", "docker-compose.yaml",
            "Dockerfile", ".env.example",
        ],
    }

    def detect(self, repo_path: str) -> Dict:
        entry_points = {
            "frontend": [],
            "backend": [],
            "config": [],
        }

        for category, patterns in self.ENTRY_POINT_PATTERNS.items():
            for pattern in patterns:
                if "*" in pattern:
                    import glob
                    matches = glob.glob(os.path.join(repo_path, pattern))
                    for match in matches:
                        rel_path = os.path.relpath(match, repo_path)
                        entry_points[category].append(rel_path.replace(os.sep, "/"))
                else:
                    filepath = os.path.join(repo_path, pattern)
                    if os.path.exists(filepath):
                        entry_points[category].append(pattern)

        return entry_points

    def get_primary_entry_points(self, repo_path: str) -> List[str]:
        all_points = self.detect(repo_path)
        primary = []

        if all_points["frontend"]:
            primary.append(all_points["frontend"][0])
        if all_points["backend"]:
            primary.append(all_points["backend"][0])

        return primary