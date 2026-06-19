import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "../components/Layout";

const demoReport = {
  project_type: "Full Stack",
  architecture: "Modular Monolith",
  frontend: "React + Next.js",
  backend: "Node.js (Express)",
  database: "PostgreSQL",
  devops: ["Docker", "GitHub Actions", "Vercel"],
  languages: [
    { language: "TypeScript", files: 847, percentage: 62 },
    { language: "JavaScript", files: 213, percentage: 16 },
    { language: "CSS", files: 124, percentage: 9 },
    { language: "MDX", files: 89, percentage: 6 },
    { language: "Python", files: 45, percentage: 3 },
  ],
  entry_points: {
    frontend: ["app/layout.tsx", "app/page.tsx", "pages/_app.tsx"],
    backend: ["packages/server/src/index.ts", "packages/api/router.ts"],
    config: ["package.json", "tsconfig.json", "next.config.js"],
  },
  important_files: [
    { file: "app/layout.tsx", score: 0.95 },
    { file: "packages/core/database.ts", score: 0.91 },
    { file: "packages/api/router.ts", score: 0.88 },
    { file: "middleware.ts", score: 0.85 },
    { file: "packages/auth/session.ts", score: 0.82 },
    { file: "app/(dashboard)/layout.tsx", score: 0.79 },
    { file: "packages/ui/components/index.ts", score: 0.76 },
    { file: "lib/utils.ts", score: 0.73 },
  ],
  reading_order: [
    "README.md",
    "package.json",
    "app/layout.tsx",
    "app/page.tsx",
    "middleware.ts",
    "packages/api/router.ts",
    "packages/core/database.ts",
    "packages/auth/session.ts",
  ],
};

export default function DemoReportPage() {
  return (
    <Layout>
      <div className="pt-28 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-md font-cabin text-[13px] font-medium">DEMO</span>
              <span className="font-inter text-[14px] text-gray-400 dark:text-white/40">Sample analysis of vercel/next.js</span>
            </div>
            <h1 className="font-instrument text-4xl md:text-5xl text-gray-900 dark:text-white">Repository <em className="font-instrument italic">Analysis Report</em></h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { label: "Project Type", value: demoReport.project_type },
              { label: "Architecture", value: demoReport.architecture },
              { label: "Frontend", value: demoReport.frontend },
              { label: "Backend", value: demoReport.backend },
              { label: "Database", value: demoReport.database },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-5">
                <span className="font-inter text-[13px] text-gray-400 dark:text-white/40 block mb-1">{item.label}</span>
                <span className="font-manrope font-semibold text-xl text-gray-900 dark:text-white">{item.value}</span>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-5">
              <span className="font-inter text-[13px] text-gray-400 dark:text-white/40 block mb-1">DevOps</span>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {demoReport.devops.map((d) => <span key={d} className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-md text-[13px] font-inter">{d}</span>)}
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6">
              <h3 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-5">Languages</h3>
              {demoReport.languages.map((lang) => (
                <div key={lang.language} className="mb-4">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-inter text-[15px] text-gray-700 dark:text-white/80 font-medium">{lang.language}</span>
                    <span className="font-inter text-[14px] text-gray-400 dark:text-white/40">{lang.percentage}% ({lang.files} files)</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2"><div className="h-2 rounded-full bg-brand-purple" style={{ width: `${lang.percentage}%` }} /></div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6">
              <h3 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-5">Entry Points</h3>
              {Object.entries(demoReport.entry_points).map(([cat, files]) => (
                <div key={cat} className="mb-6 last:mb-0">
                  <span className="font-inter text-[13px] text-gray-400 dark:text-white/40 uppercase tracking-wider font-semibold">{cat}</span>
                  <div className="mt-2.5 space-y-2">
                    {files.map((f) => (
                      <div key={f} className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-white/[0.04] rounded-xl border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:bg-white/[0.06] transition-colors">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0" />
                        <code className="font-mono text-[15px] text-green-300">{f}</code>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6">
              <h3 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-5">Important Files</h3>
              {demoReport.important_files.map((f, i) => (
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
              {demoReport.reading_order.map((file, i) => (
                <div key={file} className="flex items-center gap-3.5 py-3 px-3 rounded-xl hover:bg-gray-50 dark:bg-white/[0.04] transition-colors border-b border-gray-200 dark:border-white/[0.06] last:border-0">
                  <span className="w-9 h-9 bg-brand-purple/20 text-brand-purple rounded-full flex items-center justify-center text-[14px] font-manrope font-bold flex-shrink-0">{i + 1}</span>
                  <code className="font-mono text-[15px] text-gray-900 dark:text-white">{file}</code>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-gradient-to-br from-brand-purple/20 to-brand-dark-purple/20 border border-brand-purple/20 rounded-2xl p-8 text-center">
            <h3 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white mb-3">Ready to Analyze Your Own Repository?</h3>
            <p className="font-inter text-gray-500 dark:text-white/50 mb-6">Paste any GitHub URL and get a report like this in minutes.</p>
            <Link to="/analyze" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-gray-900 dark:text-white rounded-[10px] font-cabin font-medium text-[16px] shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all">
              Analyze Repository <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}