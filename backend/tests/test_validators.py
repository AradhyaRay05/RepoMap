import pytest
from app.utils.validators import validate_github_url


class TestValidateGithubUrl:
    def test_valid_url(self):
        assert validate_github_url("https://github.com/user/repo") is None

    def test_valid_url_with_git_suffix(self):
        assert validate_github_url("https://github.com/user/repo.git") is None

    def test_empty_url(self):
        assert validate_github_url("") == "URL is required"

    def test_none_url(self):
        assert validate_github_url(None) == "URL is required"

    def test_invalid_protocol(self):
        assert validate_github_url("ftp://github.com/user/repo") is not None

    def test_not_github(self):
        assert validate_github_url("https://gitlab.com/user/repo") == "URL must be a GitHub repository"

    def test_missing_repo_name(self):
        assert validate_github_url("https://github.com/user") == "URL must contain owner and repository name"

    def test_invalid_owner(self):
        assert validate_github_url("https://github.com/invalid-owner!/repo") is not None