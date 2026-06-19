import { Analysis, Report } from "../types";

const API_BASE_URL = "/api";

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return response;
  } catch (err: any) {
    clearTimeout(timer);
    if (err.name === "AbortError") {
      throw new Error("Request timed out. Make sure the backend server is running on port 5000.");
    }
    throw new Error("Cannot connect to server. Make sure the backend is running (flask run).");
  }
}

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem("repomap_token");
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}

export async function register(email: string, username: string, password: string, provider: string = "email") {
  const response = await fetchWithTimeout(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password, provider }),
  });

  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid response. Is Flask running?"); }
  if (!response.ok) throw new Error(data.error || "Registration failed");
  return data;
}

export async function login(email: string, password: string) {
  const response = await fetchWithTimeout(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid response. Is Flask running?"); }
  if (!response.ok) throw new Error(data.error || "Login failed");
  return data;
}

export async function oauthLogin(provider: string, email: string, username: string) {
  const response = await fetchWithTimeout(`${API_BASE_URL}/auth/oauth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ provider, email, username }),
  });

  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid response. Is Flask running?"); }
  if (!response.ok) throw new Error(data.error || "OAuth login failed");
  return data;
}

export async function startAnalysis(githubUrl: string): Promise<{ analysis_id: string; status: string }> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ github_url: githubUrl }),
  });

  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid response. Is Flask running?"); }
  if (!response.ok) throw new Error(data.error || "Failed to start analysis");
  return data;
}

export async function getAnalysisStatus(analysisId: string): Promise<Analysis> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/analysis/${analysisId}`);
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid response. Is Flask running?"); }
  if (!response.ok) throw new Error(data.error || "Failed to get analysis status");
  return data;
}

export async function getReport(analysisId: string): Promise<Report> {
  const response = await fetchWithTimeout(`${API_BASE_URL}/report/${analysisId}`);
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch { throw new Error("Server returned invalid response. Is Flask running?"); }
  if (!response.ok) throw new Error(data.error || "Failed to get report");
  return data;
}