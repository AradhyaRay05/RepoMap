import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./hooks/useTheme";
import ScrollToTop from "./components/ScrollToTop";
import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import FeaturesPage from "./pages/FeaturesPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import ArchitecturePage from "./pages/ArchitecturePage";
import OpenSourcePage from "./pages/OpenSourcePage";
import SignInPage from "./pages/SignInPage";
import OAuthCallbackPage from "./pages/OAuthCallbackPage";
import AnalyzePage from "./pages/AnalyzePage";
import DemoReportPage from "./pages/DemoReportPage";
import ReportPage from "./pages/ReportPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-gray-50 dark:bg-brand-surface text-gray-900 dark:text-white font-inter">
            <Routes>
              <Route path="/" element={<Layout><HeroSection /></Layout>} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/architecture" element={<ArchitecturePage />} />
              <Route path="/open-source" element={<OpenSourcePage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/auth/callback/github" element={<OAuthCallbackPage />} />
              <Route path="/auth/callback/google" element={<OAuthCallbackPage />} />
              <Route path="/analyze" element={<AnalyzePage />} />
              <Route path="/demo-report" element={<DemoReportPage />} />
              <Route path="/report/:analysisId" element={<ReportPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;