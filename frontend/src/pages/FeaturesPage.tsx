import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  GitBranch, Layers, Search, Network, FileCode2,
  BookOpen, Cpu, FolderTree, Shield,
} from "lucide-react";
import Layout from "../components/Layout";

const features = [
  { icon: <FolderTree size={28} />, title: "Repository Structure Analysis", description: "Automatically maps directory hierarchy, identifies module boundaries, and detects architectural layers like controllers, services, and models." },
  { icon: <Cpu size={28} />, title: "Technology Detection", description: "Identifies frontend frameworks (React, Vue, Angular, Next.js), backend frameworks (Flask, Django, Express, Spring Boot), databases, and DevOps tools." },
  { icon: <Layers size={28} />, title: "Architecture Discovery", description: "Detects MVC, Layered, Clean, Hexagonal, Microservices, and Modular Monolith patterns by analyzing folder structure and code organization." },
  { icon: <Network size={28} />, title: "Dependency Graph Generation", description: "Builds interactive dependency relationships between modules using AST parsing and import analysis. Visualize how components connect." },
  { icon: <Search size={28} />, title: "Entry Point Detection", description: "Finds application starting files for frontend (main.tsx, index.js) and backend (app.py, server.js) so you know exactly where to begin reading." },
  { icon: <FileCode2 size={28} />, title: "Important File Ranking", description: "Scores files by importance based on import frequency, dependency centrality, entry point proximity, and configuration significance." },
  { icon: <BookOpen size={28} />, title: "Suggested Reading Order", description: "Generates a guided onboarding roadmap that takes you from README to core modules in the optimal learning sequence." },
  { icon: <GitBranch size={28} />, title: "Language Analysis", description: "Detects programming languages across the codebase with file counts and percentages. Supports JavaScript, TypeScript, Python, Java, Go, Rust, and more." },
  { icon: <Shield size={28} />, title: "Static Analysis Only", description: "Never executes repository code. Performs only static analysis, AST parsing, and metadata inspection. Safe and secure by design." },
];

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function FeaturesPage() {
  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="font-cabin font-medium text-[14px] text-brand-purple">Features</span>
            <h1 className="font-instrument text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white mt-3">
              Everything You Need to<br /><em className="font-instrument italic">Understand</em> a Codebase
            </h1>
            <p className="font-inter text-gray-500 dark:text-white/60 text-lg mt-4 max-w-[600px] mx-auto">
              Nine powerful analysis engines working together to give you a complete picture of any GitHub repository.
            </p>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <motion.div key={feature.title} variants={item} className="group bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:bg-gray-100 dark:bg-white/[0.06] hover:border-brand-purple/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple mb-4 group-hover:bg-brand-purple/20 transition-colors">{feature.icon}</div>
                <h3 className="font-manrope font-semibold text-[18px] text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="font-inter text-[14px] text-gray-500 dark:text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-center mt-16">
            <Link to="/analyze" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-purple text-gray-900 dark:text-white rounded-[10px] font-cabin font-medium text-[16px] shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all">
              Try It Now
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}