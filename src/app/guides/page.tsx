import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Calculator Guides & Resources - Calculator Lab",
  description:
    "Comprehensive guides on financial formulas, math concepts, health metrics, and more. Free educational resources to help you understand the calculations behind our tools.",
  openGraph: {
    title: "Free Calculator Guides & Resources - Calculator Lab",
    description:
      "Comprehensive guides on financial formulas, math concepts, health metrics, and more.",
    url: "https://calculatorlab.org/guides",
  },
};

const guides = [
  {
    slug: "financial-formulas",
    title: "Essential Financial Formulas",
    description:
      "Complete reference guide to the most important financial formulas including compound interest, loan payments, ROI, and more.",
    category: "Finance",
    icon: "💰",
  },
  {
    slug: "math-reference",
    title: "Math Reference Sheet",
    description:
      "Quick reference for common math formulas, conversions, and calculations used in everyday life.",
    category: "Math",
    icon: "📐",
  },
  {
    slug: "health-metrics",
    title: "Health Metrics Explained",
    description:
      "Understanding BMI, body fat percentage, calorie needs, and other important health measurements.",
    category: "Health",
    icon: "❤️",
  },
];

export default function GuidesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Guides</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Calculator Guides & Resources
        </h1>
        <p className="text-lg text-gray-600">
          Free comprehensive reference guides to help you understand the formulas
          and concepts behind our calculators. Bookmark these pages for quick access.
        </p>
      </div>

      <div className="grid gap-6">
        {guides.map((guide) => (
          <Link
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            className="block border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{guide.icon}</span>
              <div>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                  {guide.category}
                </span>
                <h2 className="text-xl font-semibold text-gray-800 mt-2">
                  {guide.title}
                </h2>
                <p className="text-gray-600 mt-1">{guide.description}</p>
                <span className="text-blue-600 text-sm font-medium mt-2 inline-block">
                  View guide →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Why These Guides?
        </h2>
        <p className="text-gray-600 mb-4">
          Our guides are designed to be comprehensive reference resources that you
          can bookmark and return to whenever you need them. Each guide includes:
        </p>
        <ul className="text-gray-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Clear explanations of formulas and concepts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Real-world examples and use cases</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Links to relevant calculators for hands-on practice</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600">✓</span>
            <span>Printable format for offline reference</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
