import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const analysisSteps = [
  { label: "Cloning repository...", done: true },
  { label: "Analyzing structure...", done: true },
  { label: "Detecting technologies...", done: true },
  { label: "Mapping dependencies...", done: true },
  { label: "Generating report...", done: true },
];

const resultData = [
  { label: "Project Type", value: "Full Stack" },
  { label: "Frontend", value: "React + Next.js" },
  { label: "Backend", value: "Node.js" },
  { label: "Database", value: "PostgreSQL" },
  { label: "Architecture", value: "Modular Monolith" },
];

const startFiles = ["app/layout.tsx", "app/page.tsx", "middleware.ts"];

export default function DemoCard() {
  const [phase, setPhase] = useState<"loading" | "result">("loading");

  useEffect(() => {
    const timer = setTimeout(() => setPhase("result"), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "result") {
      const timer = setTimeout(() => setPhase("loading"), 6000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full max-w-[680px] mx-auto rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.15)",
      }}
    >
      <div className="px-5 py-3 flex items-center gap-3 border-b border-white/10">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="font-inter text-[13px] text-white/50">
          github.com/vercel/next.js
        </span>
      </div>

      <div className="p-5 min-h-[280px]">
        {phase === "loading" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {analysisSteps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.4 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.4 + 0.2 }}
                  className="w-5 h-5 rounded-full bg-brand-purple/30 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.4 + 0.4 }}
                    className="w-2 h-2 rounded-full bg-brand-purple"
                  />
                </motion.div>
                <span className="font-inter text-[14px] text-white/70">
                  {step.label}
                </span>
              </motion.div>
            ))}
            <div className="mt-4 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-brand-purple border-t-transparent rounded-full animate-spin" />
              <span className="font-inter text-[13px] text-white/50">
                Analyzing...
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {resultData.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="font-inter text-[12px] text-white/40 block">
                    {item.label}
                  </span>
                  <span className="font-manrope font-semibold text-[15px] text-white">
                    {item.value}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="font-inter text-[12px] text-white/40 block mb-2">
                Suggested Starting Files
              </span>
              <div className="space-y-1.5">
                {startFiles.map((file, i) => (
                  <motion.div
                    key={file}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <code className="font-inter text-[13px] text-green-300/80">
                      {file}
                    </code>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}