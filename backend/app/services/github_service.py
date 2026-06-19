import os
import shutil
import tempfile
from typing import Dict, Optional
from urllib.parse import urlparse
import git
from github import Github


class GitHubService:
    def __init__(self, token: str = ""):
        self.token = token
        self.github = Github(token) if token else Github()

    def parse_url(self, url: str) -> Dict[str, str]:
        url = url.rstrip("/").replace(".git", "")

        parsed = urlparse(url)
        path_parts = parsed.path.strip("/").split("/")

        if len(path_parts) < 2:
            raise ValueError("Invalid GitHub URL format")

        return {
            "owner": path_parts[0],
            "repo": path_parts[1],
            "full_name": f"{path_parts[0]}/{path_parts[1]}",
        }

    def validate_repository(self, url: str) -> Dict:
        repo_info = self.parse_url(url)

        try:
            repo = self.github.get_repo(repo_info["full_name"])
            return {
                "valid": True,
                "owner": repo.owner.login,
                "name": repo.name,
                "description": repo.description,
                "default_branch": repo.default_branch,
                "private": repo.private,
                "size_kb": repo.size,
            }
        except Exception as e:
            return {
                "valid": False,
                "error": str(e),
            }

    def clone_repository(self, url: str, target_dir: str) -> str:
        repo_info = self.parse_url(url)

        clone_url = url
        if self.token:
            clone_url = f"https://{self.token}@github.com/{repo_info['full_name']}.git"

        git.Repo.clone_from(clone_url, target_dir, depth=1)

        return target_dir

    def cleanup(self, directory: str) -> None:
        try:
            if os.path.exists(directory):
                shutil.rmtree(directory)
        except Exception:
            pass