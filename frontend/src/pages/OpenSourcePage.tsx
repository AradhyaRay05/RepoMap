import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Heart, Code2, Users, Star, GitBranch, ArrowRight, ExternalLink } from "lucide-react";
import Layout from "../components/Layout";

const techStack = [
  { name: "React 18", category: "Frontend", color: "#61dafb" },
  { name: "TypeScript", category: "Frontend", color: "#3178c6" },
  { name: "Tailwind CSS", category: "Frontend", color: "#06b6d4" },
  { name: "Vite", category: "Build", color: "#646cff" },
  { name: "Flask", category: "Backend", color: "#3ddc84" },
  { name: "SQLAlchemy", category: "Backend", color: "#f59e0b" },
  { name: "NetworkX", category: "Analysis", color: "#7b39fc" },
  { name: "GitPython", category: "Analysis", color: "#f97316" },
  { name: "PyGithub", category: "API", color: "#24292e" },
  { name: "MySQL 8", category: "Database", color: "#00758f" },
  { name: "Framer Motion", category: "Frontend", color: "#e44dff" },
  { name: "React Flow", category: "Viz", color: "#ff0072" },
];

const highlights = [
  { icon: <Code2 size={24} />, title: "Clean Architecture", description: "Modular backend with separate analyzers, services, models, and API layers. Easy to extend with new analysis engines." },
  { icon: <Users size={24} />, title: "Built for Recruiters", description: "This project demonstrates full-stack proficiency, API design, database modeling, static analysis, and modern UI development." },
  { icon: <Star size={24} />, title: "Production Patterns", description: "Factory pattern, service layer, repository pattern, input validation, error handling, and proper project structure." },
  { icon: <GitBranch size={24} />, title: "Extensible Design", description: "Add new analyzers by implementing a single class. Add new frameworks to detect by updating pattern dictionaries." },
];

export default function OpenSourcePage() {
  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <span className="font-cabin font-medium text-[14px] text-brand-purple">Open Source</span>
            <h1 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white mt-3">Free & <em className="font-instrument italic">Open Source</em></h1>
            <p className="font-inter text-gray-500 dark:text-white/60 text-lg mt-4 max-w-[600px] mx-auto">
              Repository Onboarding Assistant is a portfolio project demonstrating full-stack engineering, AI-powered analysis, and modern developer tooling. Completely free to use.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github size={28} className="text-gray-900 dark:text-white" />
              <Heart size={20} className="text-red-400" />
            </div>
            <h3 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-2">No Pricing. No Limits. No Catch.</h3>
            <p className="font-inter text-gray-500 dark:text-white/50 max-w-[500px] mx-auto mb-6">
              This is a developer productivity tool built as a portfolio project. Analyze as many repositories as you want. No API keys required for basic usage.
            </p>
            <a
              href="https://github.com/aradhyax1/repository-onboarding-assistant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-white/10 border border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-lg font-manrope font-semibold text-[14px] text-gray-900 dark:text-white hover:bg-white/15 transition-colors"
            >
              <Github size={18} />
              View Source on GitHub
              <ExternalLink size={14} className="text-gray-400 dark:text-white/40" />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mb-16">
            <h2 className="font-manrope font-semibold text-2xl text-gray-900 dark:text-white mb-6 text-center">Tech Stack Used</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech, i) => (
                <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.05 }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-white/10">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: tech.color }} />
                  <span className="font-manrope font-medium text-[14px] text-gray-900 dark:text-white">{tech.name}</span>
                  <span className="font-inter text-[11px] text-gray-400 dark:text-white/30">{tech.category}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {highlights.map((h, i) => (
              <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }} className="bg-white dark:bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-lg bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-4">{h.icon}</div>
                <h3 className="font-manrope font-semibold text-[18px] text-gray-900 dark:text-white mb-2">{h.title}</h3>
                <p className="font-inter text-[14px] text-gray-500 dark:text-white/50 leading-relaxed">{h.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="text-center">
            <Link to="/analyze" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-gray-900 dark:text-white rounded-[10px] font-cabin font-medium text-[16px] shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all">
              Try It Free <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}