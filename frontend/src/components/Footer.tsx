import { Link } from "react-router-dom";
import { Github, Linkedin } from "lucide-react";
import RepoMapLogo from "./RepoMapLogo";

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerLinks = [
  { title: "Product", links: [{ label: "Features", to: "/features" }, { label: "How It Works", to: "/how-it-works" }, { label: "Architecture", to: "/architecture" }, { label: "Demo Report", to: "/demo-report" }] },
  { title: "Resources", links: [{ label: "Analyze Repository", to: "/analyze" }, { label: "Open Source", to: "/open-source" }, { label: "Sign In", to: "/sign-in" }] },
  { title: "Legal", links: [{ label: "Privacy Policy", to: "/privacy" }, { label: "Terms of Service", to: "/terms" }] },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0d0d0f] border-t border-gray-200 dark:border-white/10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-[120px] py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <RepoMapLogo className="h-7 w-7" />
              <span className="font-manrope font-semibold text-gray-900 dark:text-white text-[16px]">RepoMap</span>
            </Link>
            <p className="font-inter text-[13px] text-gray-500 dark:text-white/40 leading-relaxed mb-4">
              AI-powered repository intelligence. Understand any GitHub project in minutes.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://github.com/aradhyax1/repository-onboarding-assistant" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                <Github size={16} />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                <XIcon size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-all">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-manrope font-semibold text-[13px] text-gray-400 dark:text-white/60 uppercase tracking-wider mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="font-inter text-[14px] text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-[13px] text-gray-400 dark:text-white/30">2026 RepoMap. Built as a portfolio project demonstrating full-stack engineering.</p>
          <p className="font-inter text-[12px] text-gray-300 dark:text-white/20">React + Flask + MySQL + NetworkX</p>
        </div>
      </div>
    </footer>
  );
}