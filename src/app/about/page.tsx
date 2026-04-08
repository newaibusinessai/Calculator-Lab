import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Calculator Lab - Free Online Calculators",
  description:
    "Learn about Calculator Lab, your trusted source for 225+ free online calculators. Built by a team of math, finance, and health professionals committed to accuracy and ease of use.",
  alternates: {
    canonical: "https://calculatorlab.org/about",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">About</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        About Calculator Lab
      </h1>

      <div className="prose prose-gray max-w-none">
        {/* Mission */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-4">
            Calculator Lab was founded with a clear purpose: to make accurate,
            reliable calculation tools accessible to everyone at no cost. We
            believe that whether you are a student working through a math
            problem, a homeowner comparing mortgage options, or someone tracking
            their fitness goals, you deserve tools that are easy to use, fast,
            and trustworthy.
          </p>
          <p className="text-gray-600 mb-4">
            Today, Calculator Lab offers over 225 free calculators across math,
            finance, health, and everyday utility categories. Every calculator is
            built to work instantly in your browser with no downloads, no
            registration, and no hidden fees.
          </p>
        </section>

        {/* Who We Are */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Who We Are
          </h2>
          <p className="text-gray-600 mb-4">
            Calculator Lab is built and maintained by a small team of developers,
            mathematicians, and subject-matter enthusiasts who are passionate
            about making complex calculations simple. Our team brings together
            experience in software engineering, financial analysis, data science,
            and health sciences to ensure that every calculator we build is both
            technically sound and genuinely useful.
          </p>
          <p className="text-gray-600 mb-4">
            We are not a faceless corporation. We are a group of people who use
            calculators every day ourselves and got tired of ad-heavy,
            hard-to-use tools scattered across the internet. So we built
            something better.
          </p>
        </section>

        {/* Our Approach */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Our Approach to Accuracy
          </h2>
          <p className="text-gray-600 mb-4">
            Accuracy is not optional when it comes to calculations. A small
            error in a mortgage calculation can mean thousands of dollars. An
            incorrect BMI reading can lead to misguided health decisions. That
            is why we take accuracy seriously:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-0.5">1.</span>
              <div>
                <strong className="text-gray-800">
                  Industry-standard formulas
                </strong>
                <p className="text-gray-600 text-sm">
                  Every calculator uses established, peer-reviewed formulas. Our
                  financial calculators follow standard amortization and compound
                  interest formulas. Our health calculators use formulas
                  recognized by organizations like the WHO and the American
                  Council on Exercise.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-0.5">2.</span>
              <div>
                <strong className="text-gray-800">Regular updates</strong>
                <p className="text-gray-600 text-sm">
                  Tax rates change. Interest rate benchmarks shift. Health
                  guidelines evolve. We regularly review and update our
                  calculators to reflect the latest available data and standards.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-0.5">3.</span>
              <div>
                <strong className="text-gray-800">
                  Transparency in methodology
                </strong>
                <p className="text-gray-600 text-sm">
                  Many of our calculators display the formula being used so you
                  can understand and verify the math yourself. We also provide
                  step-by-step guides and educational content through our blog
                  and reference guides.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold mt-0.5">4.</span>
              <div>
                <strong className="text-gray-800">Testing and validation</strong>
                <p className="text-gray-600 text-sm">
                  Each calculator is tested against known values and
                  cross-referenced with established sources before going live.
                  When users report discrepancies, we investigate and correct
                  them promptly.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* What We Offer */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            What We Offer
          </h2>
          <p className="text-gray-600 mb-4">
            Our library of 225+ calculators spans four major categories, each
            designed to address real-world needs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">
                Math Calculators
              </h3>
              <p className="text-sm text-blue-700">
                Over 50 math tools including scientific calculator, percentage
                calculator, fraction operations, quadratic formula solver,
                statistics tools, geometry calculators, and number theory
                utilities. Used by students, teachers, and professionals daily.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">
                Financial Calculators
              </h3>
              <p className="text-sm text-green-700">
                Over 70 financial tools including mortgage calculator, loan
                payment estimator, compound interest calculator, retirement
                planners (401k, IRA, Social Security), tax calculators, and
                investment analysis tools to help you make informed money
                decisions.
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">
                Health &amp; Fitness Calculators
              </h3>
              <p className="text-sm text-red-700">
                Over 35 health tools including BMI calculator, calorie counter,
                TDEE calculator, body fat estimator, macro calculator, pregnancy
                due date calculator, and heart rate zone tools. Designed to
                support your wellness journey with accurate, evidence-based
                metrics.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">
                Utility &amp; Everyday Tools
              </h3>
              <p className="text-sm text-purple-700">
                Over 60 everyday utilities including age calculator, date and
                time tools, unit converters, GPA calculator, construction
                estimators (concrete, tile, paint), and engineering tools. The
                practical tools you reach for in daily life.
              </p>
            </div>
          </div>
        </section>

        {/* Beyond Calculators */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Beyond Calculators: Guides &amp; Education
          </h2>
          <p className="text-gray-600 mb-4">
            Calculator Lab is more than just a collection of tools. We publish
            in-depth{" "}
            <Link href="/blog" className="text-blue-600 hover:underline">
              blog articles
            </Link>{" "}
            and{" "}
            <Link href="/guides" className="text-blue-600 hover:underline">
              reference guides
            </Link>{" "}
            that explain the concepts and formulas behind the calculations. Our
            goal is not just to give you a number, but to help you understand
            what that number means and how to use it.
          </p>
          <p className="text-gray-600 mb-4">
            Topics we cover include step-by-step calculation guides, formula
            reference sheets for finance, math, health, and construction, and
            practical articles on topics like understanding compound interest,
            choosing the right loan calculator, and interpreting health metrics.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Why Choose Calculator Lab?
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">100% Free, Always</strong>
                <p className="text-gray-600 text-sm">
                  Every calculator is free to use with no registration, no
                  paywalls, and no premium tiers. We believe basic calculation
                  tools should be accessible to everyone.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">
                  No Downloads Required
                </strong>
                <p className="text-gray-600 text-sm">
                  All calculators run directly in your web browser. No apps to
                  install, no software to update. Works on any device with a
                  browser.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">
                  Accurate &amp; Up-to-Date
                </strong>
                <p className="text-gray-600 text-sm">
                  We use established formulas, regularly update data like tax
                  rates and health benchmarks, and test every calculator against
                  known values before publishing.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">
                  Works on Every Device
                </strong>
                <p className="text-gray-600 text-sm">
                  Fully responsive design ensures a great experience on desktop,
                  tablet, and mobile. Calculate on the go or at your desk.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">Your Privacy Matters</strong>
                <p className="text-gray-600 text-sm">
                  We do not store your calculations or personal data. All
                  calculations happen locally in your browser. Read our{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for full details.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">
                  Educational Content
                </strong>
                <p className="text-gray-600 text-sm">
                  Beyond just giving answers, our calculators include formula
                  explanations, how-to guides, and FAQs so you learn the
                  concepts behind the math.
                </p>
              </div>
            </li>
          </ul>
        </section>

        {/* Our Commitment */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Our Commitment
          </h2>
          <p className="text-gray-600 mb-4">
            Calculator Lab is a continuously evolving project. We are committed
            to expanding our calculator library, improving existing tools,
            publishing more educational content, and listening to user feedback.
            If a formula changes, a tax rate updates, or a health guideline is
            revised, we update our tools to reflect it.
          </p>
          <p className="text-gray-600 mb-4">
            We also take our responsibility seriously when it comes to financial
            and health content. While our calculators provide useful estimates
            and educational information, we always recommend consulting qualified
            professionals for important financial, medical, or legal decisions.
            Please review our{" "}
            <Link
              href="/disclaimer"
              className="text-blue-600 hover:underline"
            >
              Disclaimer
            </Link>{" "}
            for more details.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-4">
            Have suggestions for new calculators? Found an error in a
            calculation? Want to report a bug or request a feature? We genuinely
            want to hear from you. Your feedback directly shapes what we build
            next.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
}
