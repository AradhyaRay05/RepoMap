import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "../components/Layout";

const layers = [
  { name: "React + Tailwind", role: "Frontend UI", color: "#61dafb" },
  { name: "Vite + TypeScript", role: "Build Tooling", color: "#646cff" },
  { name: "Flask REST API", role: "API Server", color: "#3ddc84" },
  { name: "Analysis Engine", role: "7 Analyzers", color: "#7b39fc" },
  { name: "SQLAlchemy ORM", role: "Data Layer", color: "#f59e0b" },
  { name: "MySQL 8.0", role: "Database", color: "#00758f" },
];

const analyzers = [
  { name: "StructureAnalyzer", desc: "Directory tree, modules, layers" },
  { name: "TechDetector", desc: "Frontend, backend, DB, DevOps" },
  { name: "LanguageAnalyzer", desc: "File counts per language" },
  { name: "EntryPointDetector", desc: "App entry files" },
  { name: "DependencyAnalyzer", desc: "Import graph via NetworkX" },
  { name: "ArchitectureDetector", desc: "MVC, Clean, Hex, etc." },
  { name: "FileRanker", desc: "Importance scoring" },
];

const apiEndpoints = [
  { method: "POST", path: "/api/analyze", desc: "Start analysis" },
  { method: "GET", path: "/api/analysis/:id", desc: "Check status" },
  { method: "GET", path: "/api/report/:id", desc: "Get full report" },
  { method: "GET", path: "/api/report/:id/guide", desc: "Get guide" },
];

export default function ArchitecturePage() {
  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="font-cabin font-medium text-[14px] text-brand-purple">Architecture</span>
            <h1 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white mt-3">Built for <em className="font-instrument italic">Scale</em></h1>
            <p className="font-inter text-gray-500 dark:text-white/60 text-lg mt-4 max-w-[600px] mx-auto">A modular full-stack architecture designed for fast analysis and extensibility.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-16">
            <h2 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white mb-6 text-center">System Stack</h2>
            <div className="flex flex-col items-center gap-3">
              {layers.map((layer, i) => (
                <motion.div key={layer.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }} className="w-full max-w-[500px] flex items-center justify-between px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-200 dark:border-white/10 bg-white dark:bg-white/[0.03]" style={{ borderLeftColor: layer.color, borderLeftWidth: "3px" }}>
                  <span className="font-manrope font-medium text-gray-900 dark:text-white text-[15px]">{layer.name}</span>
                  <span className="font-inter text-gray-400 dark:text-white/40 text-[13px]">{layer.role}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
              <h2 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white mb-6">Analysis Engines</h2>
              <div className="space-y-3">
                {analyzers.map((a) => (
                  <div key={a.name} className="flex items-start gap-3 p-3 rounded-lg bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-white/10">
                    <div className="w-2 h-2 rounded-full bg-brand-purple mt-2 flex-shrink-0" />
                    <div><span className="font-mono text-[13px] text-brand-purple">{a.name}</span><p className="font-inter text-[13px] text-gray-400 dark:text-white/40">{a.desc}</p></div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
              <h2 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white mb-6">API Endpoints</h2>
              <div className="space-y-3">
                {apiEndpoints.map((ep) => (
                  <div key={ep.path} className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-white/10">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold" style={{ background: ep.method === "POST" ? "rgba(123,57,252,0.2)" : "rgba(34,197,94,0.2)", color: ep.method === "POST" ? "#a78bfa" : "#4ade80" }}>{ep.method}</span>
                    <code className="font-mono text-[13px] text-gray-600 dark:text-white/70">{ep.path}</code>
                    <span className="font-inter text-[12px] text-gray-400 dark:text-white/30 ml-auto">{ep.desc}</span>
                  </div>
                ))}
              </div>

              <h2 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white mb-6 mt-10">Database Schema</h2>
              <div className="space-y-3">
                {["repositories (id, github_url, owner, name)", "analyses (id, repository_id, status, progress)", "reports (id, analysis_id, project_type, architecture, ...)"].map((table) => (
                  <div key={table} className="p-3 rounded-lg bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-white/10"><code className="font-mono text-[13px] text-yellow-400/80">{table}</code></div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center">
            <Link to="/analyze" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-gray-900 dark:text-white rounded-[10px] font-cabin font-medium text-[16px] shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all">
              Analyze a Repository <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}