import re
from urllib.parse import urlparse
from typing import Optional


def validate_github_url(url: str) -> Optional[str]:
    if not url:
        return "URL is required"

    url = url.strip()

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    try:
        parsed = urlparse(url)
    except Exception:
        return "Invalid URL format"

    if parsed.scheme not in ("http", "https"):
        return "URL must use http or https protocol"

    if parsed.hostname != "github.com":
        return "URL must be a GitHub repository"

    path_parts = parsed.path.strip("/").split("/")
    if len(path_parts) < 2:
        return "URL must contain owner and repository name"

    owner, repo = path_parts[0], path_parts[1]

    if not re.match(r"^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$", owner):
        return "Invalid repository owner"

    if not re.match(r"^[a-zA-Z0-9._-]+$", repo):
        return "Invalid repository name"

    repo = repo.replace(".git", "")

    return None