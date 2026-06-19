import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Github } from "lucide-react";
import { startAnalysis, getAnalysisStatus } from "../services/api";
import Layout from "../components/Layout";

export default function AnalyzePage() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("");

  const pollStatus = useCallback(async (id: string) => {
    try {
      const data = await getAnalysisStatus(id);
      setProgress(data.progress);
      setStatus(data.status);
      if (data.status === "completed") navigate(`/report/${id}`);
      else if (data.status === "failed") { setError(data.error_message || "Analysis failed"); setIsLoading(false); }
      else setTimeout(() => pollStatus(id), 1500);
    } catch { setError("Failed to check analysis status"); setIsLoading(false); }
  }, [navigate]);

  useEffect(() => { if (analysisId) pollStatus(analysisId); }, [analysisId, pollStatus]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) { setError("Please enter a GitHub URL"); return; }
    setIsLoading(true); setError(""); setProgress(0); setStatus("pending");
    try {
      const result = await startAnalysis(url.startsWith("http") ? url : `https://${url}`);
      setAnalysisId(result.analysis_id);
    } catch (err: any) { setError(err.message || "Failed to start analysis"); setIsLoading(false); }
  };

  const statusMessages: Record<string, string> = { pending: "Preparing analysis...", cloning: "Cloning repository...", analyzing: "Running 7 analysis engines...", completed: "Redirecting to report..." };

  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[700px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center mx-auto mb-6"><Github size={32} className="text-brand-purple" /></div>
            <h1 className="font-instrument text-4xl md:text-5xl text-gray-900 dark:text-white">Analyze a <em className="font-instrument italic">Repository</em></h1>
            <p className="font-inter text-gray-500 dark:text-white/50 mt-3">Paste any public GitHub repository URL to get a comprehensive onboarding guide.</p>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
                <input type="text" value={url} onChange={(e) => { setUrl(e.target.value); if (error) setError(""); }} placeholder="https://github.com/owner/repository" disabled={isLoading} className="w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-white/[0.05] border border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-xl font-mono text-[14px] text-gray-900 dark:text-white placeholder-white/30 focus:outline-none focus:border-brand-purple/50 transition-colors disabled:opacity-50" />
              </div>
              <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-purple text-gray-900 dark:text-white rounded-xl font-cabin font-medium text-[16px] shadow-lg shadow-purple-500/25 hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Analyzing...</> : <><Analyze size={18} />Analyze</>}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-2 font-inter">{error}</p>}
          </motion.form>

          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6 mb-8">
              <div className="flex justify-between mb-2">
                <span className="font-inter text-sm text-gray-500 dark:text-white/60">{statusMessages[status] || "Processing..."}</span>
                <span className="font-inter text-sm text-gray-400 dark:text-white/40">{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2"><motion.div className="h-2 rounded-full bg-brand-purple" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} /></div>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: "Public Repos", desc: "Any public GitHub repository" },
              { title: "Fast Analysis", desc: "Results in under 5 minutes" },
              { title: "Secure", desc: "Static analysis only, no code execution" },
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-xl p-4 text-center">
                <h3 className="font-manrope font-semibold text-[14px] text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="font-inter text-[12px] text-gray-400 dark:text-white/40">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

function Analyze({ size }: { size: number }) {
  return <ArrowRight size={size} />;
}