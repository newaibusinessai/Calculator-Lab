"use client";

import Link from "next/link";
import { Calculator, getCalculatorsByCategory } from "@/lib/calculators";
import AdUnit from "./AdUnit";
import ShareButtons from "./ShareButtons";
import CalculatorSchema, { BreadcrumbSchema } from "./CalculatorSchema";
import ErrorBoundary from "./ErrorBoundary";

interface CalculatorLayoutProps {
  calculator: Calculator;
  children: React.ReactNode;
  formula?: string;
  faqs?: { question: string; answer: string }[];
  howTo?: string[];
}

export default function CalculatorLayout({
  calculator,
  children,
  formula,
  faqs,
  howTo,
}: CalculatorLayoutProps) {
  const relatedCalculators = getCalculatorsByCategory(calculator.category)
    .filter((c) => c.slug !== calculator.slug)
    .slice(0, 8);

  const categoryNames: Record<string, string> = {
    math: "Math Calculators",
    financial: "Financial Calculators",
    health: "Fitness & Health Calculators",
    other: "Other Calculators",
  };

  const breadcrumbItems = [
    { name: "Home", url: "https://calculatorlab.org" },
    {
      name: categoryNames[calculator.category],
      url: `https://calculatorlab.org/calculators/${calculator.category}`,
    },
    {
      name: calculator.name,
      url: `https://calculatorlab.org/calculators/${calculator.category}/${calculator.slug}`,
    },
  ];

  return (
    <>
      <CalculatorSchema calculator={calculator} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link
            href={`/calculators/${calculator.category}`}
            className="hover:text-blue-600"
          >
            {categoryNames[calculator.category]}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800">{calculator.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main content */}
          <div className="flex-grow lg:max-w-3xl">
            {/* Calculator title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {calculator.name}
            </h1>
            <p className="text-gray-600 mb-4">{calculator.description}</p>

            {/* Share buttons */}
            <div className="mb-4">
              <ShareButtons title={calculator.name} />
            </div>

            {/* Calculator component with error boundary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>

            {/* In-content ad */}
            <div className="my-6 flex justify-center print:hidden">
              <AdUnit slot="in-content" />
            </div>

            {/* How to use section */}
            {howTo && howTo.length > 0 && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h2 className="text-lg font-semibold text-blue-800 mb-3">
                  How to Use This Calculator
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-blue-700">
                  {howTo.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Formula section */}
            {formula && (
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">
                  Formula
                </h2>
                <div className="bg-white p-4 rounded border border-gray-200 font-mono text-sm overflow-x-auto">
                  {formula}
                </div>
              </div>
            )}

            {/* FAQ section */}
            {faqs && faqs.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="bg-gray-50 rounded-lg border border-gray-200 group"
                    >
                      <summary className="flex justify-between items-center cursor-pointer p-4 font-medium text-gray-800">
                        {faq.question}
                        <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">
                          ▼
                        </span>
                      </summary>
                      <div className="px-4 pb-4 text-gray-600">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0 print:hidden">
            {/* Sidebar ad */}
            <div className="mb-6">
              <AdUnit slot="sidebar" />
            </div>

            {/* Related calculators */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">
                Related Calculators
              </h3>
              <ul className="space-y-2">
                {relatedCalculators.map((calc) => (
                  <li key={calc.slug}>
                    <Link
                      href={`/calculators/${calc.category}/${calc.slug}`}
                      className="text-sm text-blue-600 hover:underline block py-1"
                    >
                      {calc.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/calculators/${calculator.category}`}
                className="block mt-4 text-sm text-gray-500 hover:text-gray-700"
              >
                View all {categoryNames[calculator.category]} →
              </Link>
            </div>

            {/* Second sidebar ad */}
            <div className="mt-6">
              <AdUnit slot="sidebar" />
            </div>
          </aside>
        </div>

        {/* Bottom banner ad */}
        <div className="mt-8 flex justify-center print:hidden">
          <AdUnit slot="banner" />
        </div>
      </div>
    </>
  );
}
