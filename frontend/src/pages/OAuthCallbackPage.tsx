import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, Check, AlertCircle } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { API_BASE_URL } from "../services/api";
import Layout from "../components/Layout";

export default function OAuthCallbackPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setAuth } = useAuth();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Completing sign in...");

  const provider = window.location.pathname.includes("/github/") ? "github" : "google";

  useEffect(() => {
    const code = searchParams.get("code");

    if (!code) {
      setStatus("error");
      setMessage("No authorization code received.");
      return;
    }

    const exchangeCode = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/${provider}/callback`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const text = await response.text();
        let data;
        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Server returned invalid response. Is Flask running?");
        }

        if (!response.ok) {
          throw new Error(data.error || "Authentication failed");
        }

        setAuth(data.token, data.user);
        setStatus("success");
        setMessage(`Signed in as ${data.user.username}`);

        setTimeout(() => navigate("/"), 1500);
      } catch (err: any) {
        setStatus("error");
        setMessage(err.message);
      }
    };

    exchangeCode();
  }, [searchParams, provider, setAuth, navigate]);

  return (
    <Layout noFooter>
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="w-full max-w-[400px] text-center">
          <div className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-8">
            {status === "loading" && (
              <>
                <Loader2 size={48} className="animate-spin text-brand-purple mx-auto mb-4" />
                <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-2">Signing you in...</h2>
                <p className="font-inter text-[14px] text-gray-500 dark:text-white/50">Authenticating with {provider === "github" ? "GitHub" : "Google"}</p>
              </>
            )}

            {status === "success" && (
              <>
                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-green-400" />
                </div>
                <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-2">{message}</h2>
                <p className="font-inter text-[14px] text-gray-500 dark:text-white/50">Redirecting to home...</p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={32} className="text-red-400" />
                </div>
                <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-2">Authentication Failed</h2>
                <p className="font-inter text-[14px] text-red-400 mb-6">{message}</p>
                <button
                  onClick={() => navigate("/sign-in")}
                  className="px-6 py-3 bg-brand-purple text-gray-900 dark:text-white rounded-lg font-manrope font-semibold text-[14px] hover:brightness-110 transition-all"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}