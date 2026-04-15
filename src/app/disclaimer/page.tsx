import { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Disclaimer - Calculator Lab",
  description:
    "Important disclaimer for Calculator Lab. Our calculators provide estimates for informational and educational purposes only and do not constitute professional advice.",
  alternates: {
    canonical: "https://calculatorlab.org/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Disclaimer</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Disclaimer</h1>
      <p className="text-gray-500 mb-8">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            General Disclaimer
          </h2>
          <p className="text-gray-600">
            The calculators and content provided on Calculator Lab
            (calculatorlab.org) are for{" "}
            <strong>informational and educational purposes only</strong>. While
            we strive for accuracy in all our tools and content, the results
            produced by our calculators are estimates and should not be relied
            upon as the sole basis for making important financial, medical,
            legal, or other professional decisions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Not Professional Advice
          </h2>
          <p className="text-gray-600 mb-4">
            Calculator Lab does not provide professional advice of any kind. The
            information and tools on this website do not constitute:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              <strong>Financial advice</strong> — Our financial calculators
              (mortgage, loan, investment, retirement, tax, etc.) provide
              estimates based on the inputs you provide. Actual results may vary
              depending on factors not captured by the calculator. Always consult
              a qualified financial advisor, accountant, or tax professional
              before making financial decisions.
            </li>
            <li>
              <strong>Medical or health advice</strong> — Our health calculators
              (BMI, calorie, body fat, TDEE, etc.) provide general estimates
              based on standard formulas. They are not a substitute for
              professional medical advice, diagnosis, or treatment. Always seek
              the guidance of a qualified healthcare provider with questions
              about your health or a medical condition.
            </li>
            <li>
              <strong>Legal advice</strong> — Any legal or tax-related
              information on this website is general in nature and should not be
              treated as legal counsel. Consult a qualified attorney or legal
              professional for advice specific to your situation.
            </li>
            <li>
              <strong>Engineering or construction advice</strong> — Our
              construction calculators (concrete, roofing, tile, paint, etc.)
              provide material estimates only. Actual project requirements may
              differ. Always consult qualified contractors or engineers for
              construction projects.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Accuracy of Calculations
          </h2>
          <p className="text-gray-600 mb-4">
            We make every reasonable effort to ensure our calculators produce
            accurate results by using established, industry-standard formulas.
            However, we cannot guarantee that all results are error-free.
            Calculations may be affected by:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Rounding differences and floating-point arithmetic limitations
            </li>
            <li>
              Changes in external data (tax rates, interest rates, health
              guidelines) that have not yet been reflected in our tools
            </li>
            <li>
              Simplifications in formulas that may not account for every variable
              in a real-world scenario
            </li>
            <li>
              User input errors or misinterpretation of input fields
            </li>
          </ul>
          <p className="text-gray-600 mt-4">
            If you believe a calculator is producing incorrect results, please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>{" "}
            so we can investigate and correct it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            No Warranty
          </h2>
          <p className="text-gray-600">
            Calculator Lab is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis without warranties of any kind, either express
            or implied. We do not warrant that the website will be
            uninterrupted, error-free, or free of viruses or other harmful
            components. We disclaim all warranties, including but not limited to
            implied warranties of merchantability, fitness for a particular
            purpose, and non-infringement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Limitation of Liability
          </h2>
          <p className="text-gray-600">
            To the maximum extent permitted by applicable law, Calculator Lab
            and its team shall not be liable for any direct, indirect,
            incidental, special, consequential, or punitive damages arising out
            of or relating to your use of, or inability to use, the calculators
            or content on this website. This includes, without limitation,
            damages for loss of profits, data, goodwill, or other intangible
            losses, even if we have been advised of the possibility of such
            damages.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Third-Party Content and Links
          </h2>
          <p className="text-gray-600">
            This website may contain links to third-party websites, services, or
            advertisements. These links are provided for convenience and
            informational purposes only. Calculator Lab does not endorse or
            assume responsibility for the content, privacy policies, or
            practices of any third-party websites. Visiting external links is at
            your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Updates to This Disclaimer
          </h2>
          <p className="text-gray-600">
            We may update this Disclaimer from time to time to reflect changes
            in our tools, content, or legal requirements. Any changes will be
            posted on this page with an updated date. We encourage you to review
            this page periodically.
          </p>
        </section>

        <div className="my-8 print:hidden">
          <AdUnit />
        </div>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Questions?
          </h2>
          <p className="text-gray-600">
            If you have questions about this Disclaimer, please{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              contact us
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
