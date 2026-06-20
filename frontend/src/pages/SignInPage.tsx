import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  Github,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { API_BASE_URL, register, login } from "../services/api";
import Layout from "../components/Layout";

export default function SignInPage() {
  const navigate = useNavigate();
  const { setAuth, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [oauthConfig, setOauthConfig] = useState<{
    google_client_id: string;
    github_client_id: string;
  } | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/auth/config`)
      .then((r) => r.json())
      .then((data) => setOauthConfig(data))
      .catch(() => {});
  }, []);

  const handleGitHubLogin = async () => {
    setOauthLoading("github");
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/github/login`);
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "GitHub OAuth not configured");
        setOauthLoading(null);
      }
    } catch {
      setError(
        "Cannot connect to the backend API. Make sure Flask is running locally.",
      );
      setOauthLoading(null);
    }
  };

  const handleGoogleLogin = async () => {
    setOauthLoading("google");
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/google/login`);
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(data.error || "Google OAuth not configured");
        setOauthLoading(null);
      }
    } catch {
      setError(
        "Cannot connect to the backend API. Make sure Flask is running locally.",
      );
      setOauthLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let data;
      if (isSignUp) {
        data = await register(email, username, password);
      } else {
        data = await login(email, password);
      }
      setAuth(data.token, data.user);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const isProcessing = loading || oauthLoading !== null;

  return (
    <Layout noFooter>
      <div className="min-h-[80vh] flex items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px]"
        >
          <div className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-8">
            <h1 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white text-center mb-2">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="font-inter text-[14px] text-gray-500 dark:text-white/50 text-center mb-8">
              {isSignUp
                ? "Sign up to save your analysis history"
                : "Sign in to save your analysis history"}
            </p>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-start gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg mb-6"
                >
                  <AlertCircle
                    size={16}
                    className="text-red-400 mt-0.5 flex-shrink-0"
                  />
                  <span className="font-inter text-[13px] text-red-400">
                    {error}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={handleGitHubLogin}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#24292e] border border-[#444] rounded-lg font-manrope font-medium text-[14px] text-gray-900 dark:text-white hover:bg-[#333] transition-all mb-3 disabled:opacity-50 cursor-pointer"
            >
              {oauthLoading === "github" ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Github size={20} />
              )}
              Continue with GitHub
            </button>

            <button
              onClick={handleGoogleLogin}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-[#dadce0] rounded-lg font-manrope font-medium text-[14px] text-[#3c4043] hover:bg-[#f7f8f8] transition-all mb-6 disabled:opacity-50 cursor-pointer"
            >
              {oauthLoading === "google" ? (
                <Loader2 size={20} className="animate-spin text-gray-500" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Continue with Google
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
              <span className="font-inter text-[12px] text-gray-400 dark:text-white/30">
                or continue with email
              </span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                {isSignUp && (
                  <div>
                    <label className="font-manrope font-medium text-[13px] text-gray-500 dark:text-white/60 block mb-1.5">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="your_username"
                      disabled={isProcessing}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-lg font-inter text-[14px] text-gray-900 dark:text-white placeholder-white/30 focus:outline-none focus:border-brand-purple/50 transition-colors disabled:opacity-50"
                    />
                  </div>
                )}

                <div>
                  <label className="font-manrope font-medium text-[13px] text-gray-500 dark:text-white/60 block mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={isProcessing}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-lg font-inter text-[14px] text-gray-900 dark:text-white placeholder-white/30 focus:outline-none focus:border-brand-purple/50 transition-colors disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="font-manrope font-medium text-[13px] text-gray-500 dark:text-white/60 block mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        isSignUp
                          ? "8+ chars, uppercase, number, special"
                          : "Enter your password"
                      }
                      disabled={isProcessing}
                      className="w-full pl-4 pr-12 py-3 bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-lg font-inter text-[14px] text-gray-900 dark:text-white placeholder-white/30 focus:outline-none focus:border-brand-purple/50 transition-colors disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isProcessing}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 hover:text-gray-500 dark:text-white/60 transition-colors disabled:opacity-50"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-brand-purple text-gray-900 dark:text-white rounded-lg font-cabin font-medium text-[15px] hover:brightness-110 transition-all shadow-lg shadow-purple-500/25 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />{" "}
                      Processing...
                    </>
                  ) : isSignUp ? (
                    "Create Account"
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>

            <p className="font-inter text-[13px] text-gray-400 dark:text-white/40 text-center mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError("");
                }}
                disabled={isProcessing}
                className="text-brand-purple hover:underline cursor-pointer disabled:opacity-50"
              >
                {isSignUp ? "Sign in" : "Sign up for free"}
              </button>
            </p>
          </div>

          <p className="font-inter text-[12px] text-gray-400 dark:text-white/30 text-center mt-6">
            By signing in, you agree to our{" "}
            <Link
              to="/terms"
              className="text-gray-500 dark:text-white/50 hover:text-gray-600 dark:text-white/70 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/privacy"
              className="text-gray-500 dark:text-white/50 hover:text-gray-600 dark:text-white/70 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </Layout>
  );
}
