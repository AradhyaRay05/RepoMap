import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Link2, Download, Cpu, FileText, ArrowRight } from "lucide-react";
import Layout from "../components/Layout";

const steps = [
  { number: "01", icon: <Link2 size={32} />, title: "Paste a GitHub URL", description: "Submit any public GitHub repository URL. We support all major repository formats including direct links and .git URLs.", detail: "https://github.com/owner/repository", detailType: "input" },
  { number: "02", icon: <Download size={32} />, title: "Repository Cloned Securely", description: "The repository is shallow-cloned into a sandboxed temporary workspace. Size limits (500MB, 20K files) ensure fast processing.", detail: "Cloning via GitPython with depth=1...", detailType: "status" },
  { number: "03", icon: <Cpu size={32} />, title: "Deep Static Analysis", description: "Seven analysis engines run in sequence: structure mapping, technology detection, language analysis, entry point detection, dependency graph building, architecture discovery, and file ranking.", detail: "Running 7 analyzers...", detailType: "status" },
  { number: "04", icon: <FileText size={32} />, title: "Onboarding Guide Generated", description: "A comprehensive report is generated with technology stack, architecture pattern, dependency graph, important files, and a guided reading order.", detail: "Report ready in under 5 minutes", detailType: "output" },
];

export default function HowItWorksPage() {
  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[1000px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
            <span className="font-cabin font-medium text-[14px] text-brand-purple">How It Works</span>
            <h1 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white mt-3">Four Steps to <em className="font-instrument italic">Understanding</em></h1>
            <p className="font-inter text-gray-500 dark:text-white/60 text-lg mt-4 max-w-[550px] mx-auto">From URL to comprehensive onboarding guide in under five minutes.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-brand-purple/50 via-brand-purple/20 to-transparent hidden md:block" />
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div key={step.number} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }} className="flex gap-6 md:gap-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple relative z-10">{step.icon}</div>
                  <div className="flex-1">
                    <span className="font-cabin text-[12px] text-brand-purple font-medium">STEP {step.number}</span>
                    <h3 className="font-manrope font-semibold text-[24px] text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="font-inter text-[15px] text-gray-500 dark:text-white/50 leading-relaxed mb-4 max-w-[600px]">{step.description}</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-[13px]" style={{ background: step.detailType === "input" ? "rgba(123,57,252,0.1)" : step.detailType === "output" ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.05)", border: `1px solid ${step.detailType === "input" ? "rgba(123,57,252,0.3)" : step.detailType === "output" ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.1)"}`, color: step.detailType === "input" ? "#a78bfa" : step.detailType === "output" ? "#4ade80" : "rgba(255,255,255,0.5)" }}>
                      {step.detail}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="text-center mt-20">
            <Link to="/analyze" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-gray-900 dark:text-white rounded-[10px] font-cabin font-medium text-[16px] shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all">
              Start Analyzing <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}