import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Calculator Lab - Free Online Calculators",
  description: "Learn about Calculator Lab, your trusted source for free online calculators covering math, finance, health, and everyday calculations.",
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">About</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Calculator Lab</h1>

      <div className="prose prose-gray max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            Calculator Lab was created with a simple goal: to provide free, easy-to-use calculators for everyone.
            Whether you&apos;re a student solving math problems, a professional planning finances, or someone
            tracking their health goals, we have the tools you need.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Math Calculators</h3>
              <p className="text-sm text-blue-700">
                From basic arithmetic to advanced scientific calculations, statistics, and algebra.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Financial Calculators</h3>
              <p className="text-sm text-green-700">
                Mortgage, loans, investments, retirement planning, tax calculators, and more.
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Health Calculators</h3>
              <p className="text-sm text-red-700">
                BMI, calorie counters, body fat percentage, ideal weight, and fitness tools.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-2">Other Tools</h3>
              <p className="text-sm text-purple-700">
                Age calculator, date tools, unit converters, GPA calculator, and everyday utilities.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Why Choose Calculator Lab?</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">100% Free</strong>
                <p className="text-gray-600 text-sm">All our calculators are completely free to use, no registration required.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">No Downloads</strong>
                <p className="text-gray-600 text-sm">Access all calculators directly in your browser on any device.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">Accurate Results</strong>
                <p className="text-gray-600 text-sm">Our calculators use up-to-date formulas and data for reliable results.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">Mobile Friendly</strong>
                <p className="text-gray-600 text-sm">Works perfectly on desktop, tablet, and mobile devices.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-1">&#10003;</span>
              <div>
                <strong className="text-gray-800">Privacy Focused</strong>
                <p className="text-gray-600 text-sm">We don&apos;t store your calculations. Your data stays on your device.</p>
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Our Commitment</h2>
          <p className="text-gray-600 mb-4">
            We are committed to continuously improving Calculator Lab by adding new calculators,
            updating existing ones with the latest data (such as tax rates and interest rates),
            and enhancing the user experience based on feedback.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Get in Touch</h2>
          <p className="text-gray-600 mb-4">
            Have suggestions for new calculators? Found an error? We&apos;d love to hear from you!
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
