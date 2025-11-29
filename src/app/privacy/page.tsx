import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy - Calculator Lab",
  description: "Calculator Lab privacy policy. Learn how we handle your data and protect your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Introduction</h2>
          <p className="text-gray-600">
            Calculator Lab (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and safeguard your information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Information We Collect</h2>

          <h3 className="text-lg font-medium text-gray-700 mb-2">Information You Provide</h3>
          <p className="text-gray-600 mb-4">
            When you use our contact form, you may provide us with your name, email address, and message content.
            This information is used solely to respond to your inquiry.
          </p>

          <h3 className="text-lg font-medium text-gray-700 mb-2">Automatically Collected Information</h3>
          <p className="text-gray-600 mb-2">When you visit Calculator Lab, we may automatically collect:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
            <li>IP address (anonymized)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Calculator Data</h2>
          <p className="text-gray-600">
            <strong>Your calculations are private.</strong> All calculations performed on Calculator Lab are processed
            locally in your browser. We do not store, transmit, or have access to the numbers or values you
            enter into our calculators.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Cookies and Tracking</h2>
          <p className="text-gray-600 mb-4">We use cookies for:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Essential cookies:</strong> Required for the website to function properly</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Preference cookies:</strong> Remember your settings (like dark mode)</li>
          </ul>
          <p className="text-gray-600 mt-4">
            You can control cookies through your browser settings. Disabling cookies may affect some features.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Services</h2>
          <p className="text-gray-600 mb-4">We may use third-party services that collect information:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Google Analytics:</strong> For website traffic analysis</li>
            <li><strong>Google AdSense:</strong> For displaying advertisements</li>
          </ul>
          <p className="text-gray-600 mt-4">
            These services have their own privacy policies. We encourage you to review them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Advertising</h2>
          <p className="text-gray-600">
            We display advertisements to support our free service. Third-party ad networks may use cookies
            to serve ads based on your interests. You can opt out of personalized advertising through your
            browser settings or by visiting the{" "}
            <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Network Advertising Initiative opt-out page
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate security measures to protect your information. However, no method of
            transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Children&apos;s Privacy</h2>
          <p className="text-gray-600">
            Calculator Lab is not directed at children under 13. We do not knowingly collect personal information
            from children. If you believe we have collected information from a child, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Your Rights</h2>
          <p className="text-gray-600 mb-2">Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of marketing communications</li>
            <li>Withdraw consent for data processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Changes to This Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting
            the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Contact Us</h2>
          <p className="text-gray-600">
            If you have questions about this Privacy Policy, please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
