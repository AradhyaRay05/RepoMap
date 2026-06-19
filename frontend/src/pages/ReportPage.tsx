import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getReport } from "../services/api";
import { Report as ReportType } from "../types";
import Layout from "../components/Layout";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function ReportPage() {
  const { analysisId } = useParams<{ analysisId: string }>();
  const [report, setReport] = useState<ReportType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReport = async () => {
      if (!analysisId) return;
      try {
        const data = await getReport(analysisId);
        if ("status" in data && (data as any).status !== "completed") {
          setError("Analysis is not yet complete");
        } else {
          setReport(data as unknown as ReportType);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load report");
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [analysisId]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-brand-purple border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 dark:text-white/60 font-inter">Loading report...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 text-xl mb-4">{error}</p>
            <Link to="/" className="text-brand-purple hover:underline">Back to Home</Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (!report) return null;

  const topFiles = report.important_files?.slice(0, 10) || [];
  const topReading = report.reading_order?.slice(0, 10) || [];

  return (
    <Layout>
      <div className="pt-28 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <Link to="/analyze" className="text-brand-purple hover:underline text-sm font-inter">Analyze another repository</Link>
            <h1 className="font-instrument text-4xl md:text-5xl text-gray-900 dark:text-white mt-2">Repository <em className="font-instrument italic">Analysis Report</em></h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { label: "Project Type", value: report.project_type },
              { label: "Architecture", value: report.architecture },
              { label: "Frontend", value: report.frontend },
              { label: "Backend", value: report.backend },
              { label: "Database", value: report.database },
            ].filter((item) => item.value).map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-5">
                <span className="font-inter text-[13px] text-gray-400 dark:text-white/40 block mb-1">{item.label}</span>
                <span className="font-manrope font-semibold text-xl text-gray-900 dark:text-white">{item.value}</span>
              </motion.div>
            ))}
            {report.devops && report.devops.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-5">
                <span className="font-inter text-[13px] text-gray-400 dark:text-white/40 block mb-1">DevOps</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {report.devops.map((d) => <span key={d} className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-md text-[13px] font-inter">{d}</span>)}
                </div>
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {report.languages && report.languages.length > 0 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6">
                <h3 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-5">Languages</h3>
                {report.languages.slice(0, 7).map((lang) => (
                  <div key={lang.language} className="mb-4">
                    <div className="flex justify-between mb-1.5">
                      <span className="font-inter text-[15px] text-gray-700 dark:text-white/80 font-medium">{lang.language}</span>
                      <span className="font-inter text-[14px] text-gray-400 dark:text-white/40">{lang.percentage}% ({lang.files} files)</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2"><div className="h-2 rounded-full bg-brand-purple" style={{ width: `${lang.percentage}%` }} /></div>
                  </div>
                ))}
              </motion.div>
            )}

            {report.entry_points && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6">
                <h3 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-5">Entry Points</h3>
                {Object.entries(report.entry_points).map(([cat, files]) => (
                  files && files.length > 0 && (
                    <div key={cat} className="mb-6 last:mb-0">
                      <span className="font-inter text-[13px] text-gray-400 dark:text-white/40 uppercase tracking-wider font-semibold">{cat}</span>
                      <div className="mt-2.5 space-y-2">
                        {files.slice(0, 3).map((f) => (
                          <div key={f} className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-white/[0.04] rounded-xl border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:bg-white/[0.06] transition-colors">
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
                            <code className="font-mono text-[15px] text-green-300">{f}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6">
              <h3 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-5">Important Files</h3>
              {topFiles.map((f, i) => (
                <div key={f.file} className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-gray-50 dark:bg-white/[0.04] transition-colors border-b border-gray-200 dark:border-white/[0.06] last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-brand-purple/15 text-brand-purple rounded-lg flex items-center justify-center text-[13px] font-manrope font-bold">{i + 1}</span>
                    <code className="font-mono text-[15px] text-gray-900 dark:text-white">{f.file}</code>
                  </div>
                  <span className="font-inter text-[13px] text-gray-400 dark:text-white/40 bg-gray-100 dark:bg-white/[0.06] px-2.5 py-1 rounded-md">{f.score.toFixed(2)}</span>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6">
              <h3 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-5">Recommended Reading Order</h3>
              {topReading.map((file, i) => (
                <div key={file} className="flex items-center gap-3.5 py-3 px-3 rounded-xl hover:bg-gray-50 dark:bg-white/[0.04] transition-colors border-b border-gray-200 dark:border-white/[0.06] last:border-0">
                  <span className="w-9 h-9 bg-brand-purple/20 text-brand-purple rounded-full flex items-center justify-center text-[14px] font-manrope font-bold flex-shrink-0">{i + 1}</span>
                  <code className="font-mono text-[15px] text-gray-900 dark:text-white">{file}</code>
                </div>
              ))}
            </motion.div>
          </div>

          {report.onboarding_guide && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-6">Onboarding Guide</h3>
              <MarkdownRenderer content={report.onboarding_guide} />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="bg-gradient-to-br from-brand-purple/20 to-brand-dark-purple/20 border border-brand-purple/20 rounded-2xl p-8 text-center">
            <h3 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white mb-3">Analyze Another Repository</h3>
            <p className="font-inter text-gray-500 dark:text-white/50 mb-6">Paste another GitHub URL to generate a new report.</p>
            <Link to="/analyze" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-gray-900 dark:text-white rounded-[10px] font-cabin font-medium text-[16px] shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all">
              Analyze Repository <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}