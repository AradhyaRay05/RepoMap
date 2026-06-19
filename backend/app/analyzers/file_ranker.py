import os
from pathlib import Path
from typing import Dict, List


class FileRanker:
    def __init__(self):
        self.weights = {
            "import_count": 0.3,
            "is_entry_point": 0.25,
            "is_config": 0.15,
            "file_size": 0.1,
            "centrality": 0.2,
        }

    def rank(self, repo_path: str, entry_points: Dict, dependency_data: Dict) -> List[Dict]:
        file_scores = {}

        for root, dirs, files in os.walk(repo_path):
            dirs[:] = [d for d in dirs if d not in {".git", "node_modules", "__pycache__", "dist", "build"}]

            for filename in files:
                filepath = os.path.join(root, filename)
                rel_path = os.path.relpath(filepath, repo_path).replace(os.sep, "/")

                score = self._calculate_score(rel_path, filepath, entry_points, dependency_data)
                if score > 0:
                    file_scores[rel_path] = score

        sorted_files = sorted(file_scores.items(), key=lambda x: x[1], reverse=True)

        return [
            {"file": file, "score": round(score, 2)}
            for file, score in sorted_files[:50]
        ]

    def _calculate_score(self, rel_path: str, filepath: str, entry_points: Dict, dependency_data: Dict) -> float:
        score = 0

        all_entry_points = []
        for category in entry_points.values():
            if isinstance(category, list):
                all_entry_points.extend(category)

        if rel_path in all_entry_points:
            score += self.weights["is_entry_point"]

        config_files = {
            "package.json", "requirements.txt", "pyproject.toml",
            "tsconfig.json", "vite.config.ts", "next.config.js",
            "docker-compose.yml", "Dockerfile", ".env.example",
        }
        if Path(rel_path).name in config_files:
            score += self.weights["is_config"]

        try:
            size = os.path.getsize(filepath)
            if size > 1000:
                score += self.weights["file_size"] * min(size / 10000, 1)
        except OSError:
            pass

        if dependency_data and "most_connected" in dependency_data:
            for item in dependency_data["most_connected"]:
                if item["module"] in rel_path:
                    score += self.weights["centrality"] * item["centrality"]
                    break

        return score