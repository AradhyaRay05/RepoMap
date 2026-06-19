import json
import os
from pathlib import Path
from typing import Dict, List, Optional


class TechDetector:
    def __init__(self):
        self.frontend_frameworks = self._load_frontend_patterns()
        self.backend_frameworks = self._load_backend_patterns()
        self.database_patterns = self._load_database_patterns()
        self.devops_patterns = self._load_devops_patterns()

    def detect(self, repo_path: str) -> Dict:
        frontend = self._detect_frontend(repo_path)
        backend = self._detect_backend(repo_path)
        database = self._detect_database(repo_path)
        devops = self._detect_devops(repo_path)
        project_type = self._determine_project_type(frontend, backend)

        return {
            "project_type": project_type,
            "frontend": frontend,
            "backend": backend,
            "database": database,
            "devops": devops,
        }

    def _load_frontend_patterns(self) -> Dict:
        return {
            "React": {
                "files": ["package.json"],
                "content_patterns": ['"react"', '"react-dom"'],
                "config_files": ["next.config.js", "next.config.mjs", "vite.config.js", "vite.config.ts"],
            },
            "Next.js": {
                "files": ["next.config.js", "next.config.mjs", "next.config.ts"],
                "content_patterns": ['"next"'],
                "config_files": [],
            },
            "Vue": {
                "files": ["vue.config.js", "vite.config.js"],
                "content_patterns": ['"vue"', '"@vue/cli"'],
                "config_files": [],
            },
            "Angular": {
                "files": ["angular.json", ".angular-cli.json"],
                "content_patterns": ['"@angular/core"'],
                "config_files": [],
            },
            "Svelte": {
                "files": ["svelte.config.js"],
                "content_patterns": ['"svelte"', '"@sveltejs/kit"'],
                "config_files": [],
            },
            "Nuxt": {
                "files": ["nuxt.config.js", "nuxt.config.ts"],
                "content_patterns": ['"nuxt"'],
                "config_files": [],
            },
            "Remix": {
                "files": ["remix.config.js"],
                "content_patterns": ['"@remix-run/react"'],
                "config_files": [],
            },
            "Astro": {
                "files": ["astro.config.mjs", "astro.config.js"],
                "content_patterns": ['"astro"'],
                "config_files": [],
            },
        }

    def _load_backend_patterns(self) -> Dict:
        return {
            "Express": {
                "files": ["package.json"],
                "content_patterns": ['"express"'],
            },
            "NestJS": {
                "files": ["nest-cli.json"],
                "content_patterns": ['"@nestjs/core"'],
            },
            "Flask": {
                "files": ["requirements.txt", "Pipfile", "pyproject.toml"],
                "content_patterns": ["flask", "Flask"],
            },
            "Django": {
                "files": ["manage.py", "requirements.txt"],
                "content_patterns": ["django", "Django"],
            },
            "FastAPI": {
                "files": ["requirements.txt", "pyproject.toml"],
                "content_patterns": ["fastapi", "FastAPI"],
            },
            "Spring Boot": {
                "files": ["pom.xml", "build.gradle"],
                "content_patterns": ["spring-boot", "org.springframework.boot"],
            },
            "Laravel": {
                "files": ["composer.json", "artisan"],
                "content_patterns": ['"laravel/framework"'],
            },
            "ASP.NET": {
                "files": ["*.csproj", "Startup.cs", "Program.cs"],
                "content_patterns": ["Microsoft.AspNetCore"],
            },
        }

    def _load_database_patterns(self) -> Dict:
        return {
            "PostgreSQL": ["psycopg2", "postgresql", "pg_", "postgres"],
            "MySQL": ["mysqlclient", "pymysql", "mysql-connector"],
            "MongoDB": ["pymongo", "mongoose", "mongodb"],
            "SQLite": ["sqlite3", "sqlite"],
            "Redis": ["redis", "fakeredis"],
            "Supabase": ["supabase", "@supabase"],
            "Firebase": ["firebase", "firebase-admin"],
        }

    def _load_devops_patterns(self) -> Dict:
        return {
            "Docker": ["Dockerfile", "docker-compose.yml", "docker-compose.yaml"],
            "Kubernetes": ["k8s/", "kubernetes/", "*.yaml"],
            "GitHub Actions": [".github/workflows/"],
            "Terraform": ["*.tf", "terraform/"],
            "Nginx": ["nginx.conf", "nginx/"],
        }

    def _detect_frontend(self, repo_path: str) -> Optional[str]:
        detected = []

        for framework, patterns in self.frontend_frameworks.items():
            for file_pattern in patterns["files"]:
                if self._file_exists(repo_path, file_pattern):
                    if self._check_content_patterns(repo_path, file_pattern, patterns.get("content_patterns", [])):
                        detected.append(framework)
                        break

        if not detected:
            return None

        if "Next.js" in detected:
            return "Next.js"
        if "Nuxt" in detected:
            return "Nuxt"
        if "Remix" in detected:
            return "Remix"

        return detected[0]

    def _detect_backend(self, repo_path: str) -> Optional[str]:
        for framework, patterns in self.backend_frameworks.items():
            for file_pattern in patterns["files"]:
                if self._file_exists(repo_path, file_pattern):
                    if self._check_content_patterns(repo_path, file_pattern, patterns["content_patterns"]):
                        return framework
        return None

    def _detect_database(self, repo_path: str) -> Optional[str]:
        detected = []

        for db_name, patterns in self.database_patterns.items():
            for pattern in patterns:
                if self._search_in_files(repo_path, pattern):
                    detected.append(db_name)
                    break

        return detected[0] if detected else None

    def _detect_devops(self, repo_path: str) -> List[str]:
        detected = []

        for tool, patterns in self.devops_patterns.items():
            for pattern in patterns:
                if self._file_exists(repo_path, pattern):
                    detected.append(tool)
                    break

        return detected

    def _determine_project_type(self, frontend: Optional[str], backend: Optional[str]) -> str:
        if frontend and backend:
            return "Full Stack"
        elif frontend:
            return "Frontend"
        elif backend:
            return "Backend"
        return "Unknown"

    def _file_exists(self, repo_path: str, filename: str) -> bool:
        if "*" in filename:
            import glob
            return bool(glob.glob(os.path.join(repo_path, "**", filename), recursive=True))

        for root, dirs, files in os.walk(repo_path):
            if ".git" in root or "node_modules" in root:
                continue
            if filename.endswith("/"):
                if os.path.isdir(os.path.join(root, filename.rstrip("/"))):
                    return True
            else:
                if filename in files:
                    return True
        return False

    def _check_content_patterns(self, repo_path: str, filename: str, patterns: List[str]) -> bool:
        try:
            filepath = os.path.join(repo_path, filename)
            if os.path.exists(filepath):
                with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                    return any(pattern in content for pattern in patterns)
        except Exception:
            pass
        return False

    def _search_in_files(self, repo_path: str, pattern: str) -> bool:
        search_files = [
            "requirements.txt", "Pipfile", "pyproject.toml",
            "package.json", "composer.json", "Gemfile",
            "go.mod", "pom.xml", "build.gradle",
        ]

        for filename in search_files:
            filepath = os.path.join(repo_path, filename)
            if os.path.exists(filepath):
                try:
                    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
                        if pattern in f.read():
                            return True
                except Exception:
                    pass
        return False