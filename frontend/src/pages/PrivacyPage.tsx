import Layout from "../components/Layout";

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="pt-32 pb-20 px-6 lg:px-[120px]">
        <div className="max-w-[800px] mx-auto">
          <h1 className="font-instrument text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">Privacy Policy</h1>
          <p className="font-inter text-gray-400 dark:text-white/40 text-sm mb-10">Last updated: June 2026</p>

          <div className="space-y-8 font-inter text-gray-500 dark:text-white/60 text-[15px] leading-relaxed">
            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
              <p>When you use RepoMap, we collect the following information:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong className="text-gray-700 dark:text-white/80">GitHub URLs:</strong> The repository URLs you submit for analysis. These are processed in real-time and not permanently stored after analysis completion.</li>
                <li><strong className="text-gray-700 dark:text-white/80">Usage Data:</strong> Anonymous analytics such as pages visited, features used, and session duration to improve our service.</li>
                <li><strong className="text-gray-700 dark:text-white/80">Account Information:</strong> If you sign in, we collect your email address and basic profile information from your authentication provider.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
              <p>We use collected information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Perform repository analysis and generate onboarding reports</li>
                <li>Improve our analysis algorithms and accuracy</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send service-related communications (opt-in only)</li>
              </ul>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">3. Repository Analysis</h2>
              <p>When you submit a GitHub URL for analysis:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>The repository is cloned to a temporary, sandboxed environment</li>
                <li>Only static analysis is performed — we never execute any code from the repository</li>
                <li>Cloned data is deleted immediately after analysis completes</li>
                <li>Analysis reports are stored in our database and linked to your session</li>
              </ul>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">4. Data Storage and Security</h2>
              <p>All data is stored in secure databases with encryption at rest. We implement industry-standard security measures including encrypted connections (HTTPS), access controls, and regular security audits. Repository analysis is performed in isolated containers that are destroyed after each analysis.</p>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">5. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li><strong className="text-gray-700 dark:text-white/80">GitHub API:</strong> To fetch repository metadata (for public repositories only)</li>
                <li><strong className="text-gray-700 dark:text-white/80">Analytics:</strong> Anonymous usage analytics to improve our product</li>
              </ul>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">6. Data Retention</h2>
              <p>Analysis reports are retained for 30 days unless you have an account, in which case they are retained as long as your account is active. You can request deletion of your data at any time by contacting us.</p>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">7. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of non-essential communications</li>
              </ul>
            </section>

            <section>
              <h2 className="font-manrope font-semibold text-xl text-gray-900 dark:text-white mb-3">8. Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please open an issue on our <a href="https://github.com/aradhyax1/repository-onboarding-assistant" className="text-brand-purple hover:underline" target="_blank" rel="noopener noreferrer">GitHub repository</a>.</p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}