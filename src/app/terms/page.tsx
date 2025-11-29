import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use - Calculator Lab",
  description: "Calculator Lab terms of use. Please read these terms carefully before using our calculator services.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Terms of Use</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms of Use</h1>
      <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>

      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing and using Calculator Lab, you accept and agree to be bound by these Terms of Use.
            If you do not agree to these terms, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Use of Calculators</h2>
          <p className="text-gray-600 mb-4">
            Calculator Lab provides free online calculators for informational and educational purposes only.
            While we strive for accuracy, you acknowledge that:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Calculator results are estimates and should not be considered professional advice</li>
            <li>Financial calculators do not constitute financial, tax, or investment advice</li>
            <li>Health calculators are for general information only and do not replace medical advice</li>
            <li>You should consult qualified professionals for important decisions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Disclaimer of Warranties</h2>
          <p className="text-gray-600">
            Calculator Lab is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express
            or implied. We do not warrant that the calculators will be error-free, uninterrupted, or
            that results will be accurate or reliable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Limitation of Liability</h2>
          <p className="text-gray-600">
            To the fullest extent permitted by law, Calculator Lab shall not be liable for any direct, indirect,
            incidental, special, consequential, or punitive damages arising from your use of our calculators
            or reliance on any results obtained.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Accuracy of Information</h2>
          <p className="text-gray-600">
            We make reasonable efforts to ensure the accuracy of our calculators and the information provided.
            However, tax rates, interest rates, formulas, and other data may change. We are not responsible
            for any errors or outdated information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Intellectual Property</h2>
          <p className="text-gray-600">
            All content on Calculator Lab, including but not limited to text, graphics, logos, and software,
            is the property of Calculator Lab and is protected by intellectual property laws. You may not
            reproduce, distribute, or create derivative works without our permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Acceptable Use</h2>
          <p className="text-gray-600 mb-4">You agree not to:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Use our website for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with or disrupt the website&apos;s operation</li>
            <li>Use automated systems to access the website excessively</li>
            <li>Copy or scrape content without permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Third-Party Links</h2>
          <p className="text-gray-600">
            Our website may contain links to third-party websites. We are not responsible for the content,
            privacy practices, or terms of use of these external sites.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Modifications</h2>
          <p className="text-gray-600">
            We reserve the right to modify these Terms of Use at any time. Changes will be effective
            immediately upon posting. Your continued use of Calculator Lab after changes constitutes acceptance
            of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Termination</h2>
          <p className="text-gray-600">
            We may terminate or suspend access to our website immediately, without prior notice, for any
            reason, including breach of these Terms of Use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Governing Law</h2>
          <p className="text-gray-600">
            These Terms of Use shall be governed by and construed in accordance with applicable laws,
            without regard to conflict of law principles.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Questions?</h2>
          <p className="text-gray-600">
            If you have questions about these Terms of Use, please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
