import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import RepoMapLogo from "./RepoMapLogo";

const navLinks = [
  { label: "Features", to: "/features" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Architecture", to: "/architecture" },
  { label: "Open Source", to: "/open-source" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHeroPage = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = () => {
    logout();
    setMobileOpen(false);
    navigate("/");
  };

  const isOpaque = !isHeroPage || scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 py-4 lg:px-[120px] lg:py-[16px] transition-all duration-300 ${
          isOpaque
            ? "bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl border-b border-gray-200 dark:border-white/10 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between max-w-[1400px] mx-auto">
          <Link to="/" className="flex items-center gap-2.5">
            <RepoMapLogo className="h-8 w-8" />
            <span className={`font-manrope font-semibold text-[18px] transition-colors ${isOpaque ? "text-gray-900 dark:text-white" : "text-white"}`}>
              RepoMap
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-manrope font-medium text-[14px] transition-colors ${
                  isOpaque
                    ? "text-gray-600 dark:text-white/80 hover:text-gray-900 dark:hover:text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
                isOpaque
                  ? "bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-white/15"
                  : "bg-white/15 text-white hover:bg-white/25"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            {isAuthenticated ? (
              <>
                <span className={`font-inter text-[13px] mr-1 ${isOpaque ? "text-gray-500 dark:text-white/50" : "text-white/60"}`}>
                  Hi, {user?.username}
                </span>
                <button
                  onClick={handleSignOut}
                  className={`px-4 py-2 rounded-lg font-manrope font-semibold text-[14px] transition-colors cursor-pointer ${
                    isOpaque
                      ? "bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-white/15"
                      : "bg-white/15 border border-white/20 text-white hover:bg-white/25"
                  }`}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/sign-in"
                className={`px-4 py-2 rounded-lg font-manrope font-semibold text-[14px] transition-colors ${
                  isOpaque
                    ? "bg-white border border-gray-300 text-gray-900 hover:bg-gray-50 dark:bg-white dark:text-gray-900"
                    : "bg-white border border-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                Sign In
              </Link>
            )}
            <Link
              to="/analyze"
              className="px-4 py-2 bg-brand-purple text-white rounded-lg font-manrope font-semibold text-[14px] shadow-lg shadow-purple-500/25 hover:brightness-110 transition-all"
            >
              Analyze Repository
            </Link>
          </div>

          <button
            className={`md:hidden transition-colors ${isOpaque ? "text-gray-900 dark:text-white" : "text-white"}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white dark:bg-black z-[60] flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-6 right-6 text-gray-900 dark:text-white" onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X size={28} />
            </button>
            {navLinks.map((link, i) => (
              <motion.div key={link.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={link.to} className="font-manrope font-medium text-2xl text-gray-900 dark:text-white" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <button onClick={toggleTheme} className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-white/10 rounded-lg font-manrope font-medium text-lg text-gray-700 dark:text-white cursor-pointer">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col gap-3 mt-4">
              {isAuthenticated ? (
                <>
                  <span className="font-inter text-[14px] text-gray-500 dark:text-white/50 text-center">Hi, {user?.username}</span>
                  <button onClick={handleSignOut} className="px-8 py-3 bg-gray-200 dark:bg-white/10 border border-gray-300 dark:border-white/10 text-gray-700 dark:text-white rounded-lg font-manrope font-semibold text-lg text-center cursor-pointer">Sign Out</button>
                </>
              ) : (
                <Link to="/sign-in" className="px-8 py-3 bg-white dark:bg-white text-gray-900 dark:text-black rounded-lg font-manrope font-semibold text-lg text-center" onClick={() => setMobileOpen(false)}>Sign In</Link>
              )}
              <Link to="/analyze" className="px-8 py-3 bg-brand-purple text-white rounded-lg font-manrope font-semibold text-lg text-center" onClick={() => setMobileOpen(false)}>Analyze Repository</Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}