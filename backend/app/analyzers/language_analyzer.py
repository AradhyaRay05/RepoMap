import os
from pathlib import Path
from typing import Dict, List


class LanguageAnalyzer:
    EXTENSION_MAP = {
        ".js": "JavaScript",
        ".jsx": "JavaScript",
        ".mjs": "JavaScript",
        ".ts": "TypeScript",
        ".tsx": "TypeScript",
        ".py": "Python",
        ".java": "Java",
        ".cs": "C#",
        ".go": "Go",
        ".rs": "Rust",
        ".php": "PHP",
        ".cpp": "C++",
        ".cc": "C++",
        ".cxx": "C++",
        ".c": "C",
        ".h": "C/C++",
        ".hpp": "C++",
        ".rb": "Ruby",
        ".swift": "Swift",
        ".kt": "Kotlin",
        ".scala": "Scala",
        ".r": "R",
        ".R": "R",
        ".dart": "Dart",
        ".lua": "Lua",
        ".perl": "Perl",
        ".pl": "Perl",
        ".sh": "Shell",
        ".bash": "Shell",
        ".zsh": "Shell",
        ".ps1": "PowerShell",
        ".sql": "SQL",
        ".html": "HTML",
        ".htm": "HTML",
        ".css": "CSS",
        ".scss": "SCSS",
        ".sass": "Sass",
        ".less": "Less",
        ".vue": "Vue",
        ".svelte": "Svelte",
        ".json": "JSON",
        ".yaml": "YAML",
        ".yml": "YAML",
        ".xml": "XML",
        ".md": "Markdown",
        ".graphql": "GraphQL",
        ".gql": "GraphQL",
    }

    IGNORE_DIRS = {
        ".git", "node_modules", "__pycache__", ".venv", "venv",
        "env", ".env", "dist", "build", ".next", ".nuxt",
        "coverage", ".cache", "vendor", "packages",
    }

    def analyze(self, repo_path: str) -> List[Dict]:
        file_counts = {}
        total_files = 0

        for root, dirs, files in os.walk(repo_path):
            dirs[:] = [d for d in dirs if d not in self.IGNORE_DIRS]

            for filename in files:
                ext = Path(filename).suffix.lower()
                if ext in self.EXTENSION_MAP:
                    lang = self.EXTENSION_MAP[ext]
                    file_counts[lang] = file_counts.get(lang, 0) + 1
                    total_files += 1

        if total_files == 0:
            return []

        languages = []
        for lang, count in sorted(file_counts.items(), key=lambda x: x[1], reverse=True):
            percentage = round((count / total_files) * 100, 1)
            languages.append({
                "language": lang,
                "files": count,
                "percentage": percentage,
            })

        return languages