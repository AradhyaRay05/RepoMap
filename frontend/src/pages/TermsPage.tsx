import Layout from "../components/Layout";

export default function TermsPage() {
  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-instrument text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">Terms of Service</h1>
          <p className="font-inter text-gray-400 dark:text-white/40 text-sm mb-10">Last updated: June 2026</p>

          <div className="space-y-8 font-inter text-gray-500 dark:text-white/60 text-[15px] leading-relaxed">
            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p>By accessing or using RepoMap ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Service. This is a portfolio/demonstration project provided as-is.</p>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">2. Description of Service</h2>
              <p>RepoMap is a developer productivity tool that performs static analysis of GitHub repositories to generate onboarding guides. The Service includes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Repository structure analysis</li>
                <li>Technology and framework detection</li>
                <li>Dependency graph generation</li>
                <li>Architecture pattern recognition</li>
                <li>Onboarding guide generation</li>
              </ul>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">3. Acceptable Use</h2>
              <p>You agree to use the Service only for lawful purposes. You must not:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Submit URLs to private repositories you do not own or have permission to analyze</li>
                <li>Attempt to reverse-engineer, decompile, or disassemble the Service</li>
                <li>Use automated scripts to overload or abuse the Service</li>
                <li>Use the Service to violate any applicable laws or regulations</li>
                <li>Attempt to gain unauthorized access to our systems or other users' data</li>
              </ul>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">4. Repository Analysis</h2>
              <p>When you submit a repository URL for analysis:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You confirm you have the right to request analysis of that repository</li>
                <li>We only analyze publicly accessible repositories</li>
                <li>Analysis is performed using static methods only — no code is executed</li>
                <li>Results are provided as-is and should not be considered exhaustive or guaranteed accurate</li>
              </ul>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">5. Intellectual Property</h2>
              <p>The Service and its original content, features, and functionality are owned by the project contributors and are protected by international copyright, trademark, and other intellectual property laws. Repository analysis reports are generated for your personal use only.</p>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">6. Disclaimer of Warranties</h2>
              <p>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. We do not warrant that:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>The Service will be uninterrupted, timely, secure, or error-free</li>
                <li>Analysis results will be accurate, complete, or reliable</li>
                <li>The Service will meet your specific requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">7. Limitation of Liability</h2>
              <p>In no event shall the project contributors be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">8. Changes to Terms</h2>
              <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.</p>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">9. Contact</h2>
              <p>For questions about these Terms, please open an issue on our <a href="https://github.com/aradhyax1/repository-onboarding-assistant" className="text-brand-purple hover:underline" target="_blank" rel="noopener noreferrer">GitHub repository</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}