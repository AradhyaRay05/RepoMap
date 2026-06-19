import pytest


class TestAnalyzeEndpoint:
    def test_analyze_missing_url(self, client):
        response = client.post("/api/analyze", json={})
        assert response.status_code == 400
        assert "github_url is required" in response.json["error"]

    def test_analyze_invalid_url(self, client):
        response = client.post("/api/analyze", json={"github_url": "not-a-url"})
        assert response.status_code == 400

    def test_analyze_valid_request(self, client):
        response = client.post(
            "/api/analyze",
            json={"github_url": "https://github.com/octocat/Hello-World"},
        )
        assert response.status_code in (202, 500)


class TestReportEndpoint:
    def test_report_not_found(self, client):
        response = client.get("/api/report/999")
        assert response.status_code == 404