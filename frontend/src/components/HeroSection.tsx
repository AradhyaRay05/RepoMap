import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnnouncementPill from "./AnnouncementPill";
import DemoCard from "./DemoCard";
import { ArrowUpRight, Play } from "lucide-react";

const techBadges = [
  "React", "Next.js", "Vue", "Angular", "Svelte",
  "Flask", "Django", "FastAPI", "Express", "NestJS",
  "Spring Boot", "Laravel", "PostgreSQL", "MongoDB",
  "Docker", "Kubernetes", "TypeScript", "Python",
  "Go", "Rust", "Java", "C#", "Firebase", "Supabase",
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 flex flex-col items-center px-6 pt-32 pb-20 w-full max-w-[1200px] mx-auto">
        <AnnouncementPill />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-instrument text-white text-center leading-[1.05] mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[80px] max-w-[1100px]"
        >
          Understand Any GitHub Repository in{" "}
          <em className="font-instrument italic">Minutes</em>, Not Days
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-inter text-[18px] font-normal text-white/80 text-center max-w-[720px] mt-6 leading-relaxed"
        >
          Automatically analyze repository structure, detect frameworks, map
          dependencies, identify architecture patterns, and generate developer
          onboarding guides for any GitHub project.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
        >
          <Link
            to="/analyze"
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-brand-purple text-white rounded-[10px] font-cabin font-medium text-[16px] shadow-lg shadow-purple-500/30 hover:brightness-110 hover:gap-3.5 transition-all"
          >
            Analyze Repository
            <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <Link
            to="/demo-report"
            className="group flex items-center gap-2.5 px-7 py-3.5 bg-white/15 backdrop-blur-sm text-white rounded-[10px] font-cabin font-medium text-[16px] hover:bg-white/25 hover:gap-3.5 transition-all border border-white/20"
          >
            <Play size={18} className="fill-current" />
            View Demo Report
          </Link>
        </motion.div>

        <div className="mt-8 w-full">
          <DemoCard />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full mt-12 overflow-hidden"
        >
          <p className="font-inter text-[13px] text-white/40 text-center mb-4">
            Supports all major frameworks and languages
          </p>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#09090b] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#09090b] to-transparent z-10" />

            <div className="flex animate-marquee whitespace-nowrap">
              {[...techBadges, ...techBadges].map((tech, i) => (
                <span
                  key={`${tech}-${i}`}
                  className="inline-flex items-center px-4 py-2 mx-2 rounded-full text-[13px] font-inter text-white/60 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white/80 transition-colors flex-shrink-0"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}