import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AnnouncementPill() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2.5 px-4 h-[38px] rounded-xl"
      style={{
        background: "rgba(85,80,110,0.4)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(164,132,215,0.5)",
      }}
    >
      <span className="px-2 py-0.5 bg-brand-purple rounded-md font-cabin font-medium text-[12px] text-gray-900 dark:text-white">
        New
      </span>
      <span className="font-cabin font-medium text-[14px] text-gray-900 dark:text-white flex items-center gap-1.5">
        <Sparkles size={14} />
        AI-Powered Repository Intelligence
      </span>
    </motion.div>
  );
}