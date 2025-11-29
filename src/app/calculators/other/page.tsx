import Link from "next/link";
import { Metadata } from "next";
import { getCalculatorsByCategory } from "@/lib/calculators";
import { ResponsiveAdUnit } from "@/components/AdUnit";
import { FAQSchema, BreadcrumbSchema } from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Utility Calculators - Date, Time, GPA & Converter Tools | Calculator Lab",
  description:
    "Free online utility calculators: age calculator, date calculator, time duration, GPA calculator, grade calculator, unit converters, tip calculator, random number generator, and more everyday tools.",
  keywords: [
    "age calculator",
    "date calculator",
    "time duration calculator",
    "days between dates calculator",
    "GPA calculator",
    "grade calculator",
    "tip calculator",
    "random number generator",
    "password generator",
    "unit converter",
    "length converter",
    "weight converter",
    "temperature converter",
    "countdown calculator",
  ],
  openGraph: {
    title: "Utility Calculators - Date, Time, GPA & Converter Tools | Calculator Lab",
    description: "Free online utility calculators for everyday tasks. Age, date, time, GPA, conversions, and more useful tools.",
    url: "https://calculatorlab.org/calculators/other",
  },
};

export default function OtherCalculatorsPage() {
  const calculators = getCalculatorsByCategory("other");

  const popularCalculators = [
    "age-calculator",
    "date-calculator",
    "gpa-calculator",
    "tip-calculator",
    "random-number-generator",
    "unit-converter",
  ];

  const popular = calculators.filter(c => popularCalculators.includes(c.slug));
  const others = calculators.filter(c => !popularCalculators.includes(c.slug));

  const faqs = [
    {
      question: "How do I calculate my exact age?",
      answer: "Use our age calculator by entering your birth date. It will show your exact age in years, months, days, hours, and even seconds, plus how many days until your next birthday."
    },
    {
      question: "How do I calculate days between two dates?",
      answer: "Our date calculator lets you find the exact number of days, weeks, and months between any two dates. You can also add or subtract days from a specific date."
    },
    {
      question: "How is GPA calculated?",
      answer: "GPA is calculated by multiplying each course grade by its credit hours, summing the results, and dividing by total credit hours. Our GPA calculator supports both standard (4.0) and weighted GPA scales."
    },
    {
      question: "What's a good tip percentage?",
      answer: "Standard tipping in the US is 15-20% for good service, with 18% being common. Use our tip calculator to quickly calculate tips and split bills among friends."
    }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://calculatorlab.org" },
    { name: "Utility Calculators", url: "https://calculatorlab.org/calculators/other" }
  ];

  return (
    <>
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb with Schema */}
      <nav className="text-sm text-gray-600 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800">Utility Calculators</span>
      </nav>

      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Free Online Utility Calculators & Converters
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Everyday tools for dates, times, grades, conversions, and more.
          Simple, fast, and free calculators for all your daily needs.
        </p>
      </div>

      {/* Popular Calculators */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-yellow-500">★</span> Most Popular Utility Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/other/${calc.slug}`}
              className="block p-5 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:shadow-lg transition-all bg-gradient-to-br from-purple-50 to-white"
            >
              <h3 className="font-semibold text-lg text-purple-700 mb-2">
                {calc.name}
              </h3>
              <p className="text-sm text-gray-600">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Ad Unit */}
      <div className="my-8 flex justify-center">
        <ResponsiveAdUnit />
      </div>

      {/* All Other Calculators */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          All Utility Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/other/${calc.slug}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-purple-400 hover:shadow-md transition-all bg-white"
            >
              <h3 className="font-semibold text-purple-700 mb-1">{calc.name}</h3>
              <p className="text-sm text-gray-600">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          About Our Utility Calculators
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Date & Time Tools</h3>
            <p className="text-sm mb-3">
              Calculate your exact age with our <Link href="/calculators/other/age-calculator" className="text-blue-600 hover:underline">age calculator</Link>,
              find the days between two dates with the <Link href="/calculators/other/date-calculator" className="text-blue-600 hover:underline">date calculator</Link>,
              or compute time durations for any purpose.
            </p>
            <h3 className="font-semibold text-gray-800 mb-2">Academic Tools</h3>
            <p className="text-sm">
              Track your academic performance with our <Link href="/calculators/other/gpa-calculator" className="text-blue-600 hover:underline">GPA calculator</Link> for
              cumulative GPA, or use the grade calculator to determine what scores you need on finals.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Tool Categories</h3>
            <ul className="text-sm space-y-1">
              <li>• <strong>Date & Time:</strong> Age, date difference, countdown, duration</li>
              <li>• <strong>Academic:</strong> GPA, grade, final exam, test score</li>
              <li>• <strong>Converters:</strong> Length, weight, temperature, volume</li>
              <li>• <strong>Everyday:</strong> Tip calculator, split bill, fuel cost</li>
              <li>• <strong>Generators:</strong> Random numbers, passwords, UUIDs</li>
              <li>• <strong>Text Tools:</strong> Word count, character count, text analysis</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              How do I calculate my exact age?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Use our <Link href="/calculators/other/age-calculator" className="text-blue-600 hover:underline">age calculator</Link> by
              entering your birth date. It will show your exact age in years, months, days, hours, and even seconds,
              plus how many days until your next birthday.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              How do I calculate days between two dates?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Our <Link href="/calculators/other/date-calculator" className="text-blue-600 hover:underline">date calculator</Link> lets
              you find the exact number of days, weeks, and months between any two dates. You can also add or subtract
              days from a specific date.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              How is GPA calculated?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              GPA is calculated by multiplying each course grade by its credit hours, summing the results, and dividing
              by total credit hours. Our <Link href="/calculators/other/gpa-calculator" className="text-blue-600 hover:underline">GPA calculator</Link> supports
              both standard (4.0) and weighted GPA scales.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              What's a good tip percentage?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Standard tipping in the US is 15-20% for good service, with 18% being common. Use our <Link href="/calculators/other/tip-calculator" className="text-blue-600 hover:underline">tip calculator</Link> to
              quickly calculate tips and split bills among friends.
            </p>
          </details>
        </div>
      </section>

      {/* Related Categories */}
      <section className="border-t pt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Explore Other Calculator Categories
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculators/math" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors">
            📐 Math Calculators
          </Link>
          <Link href="/calculators/financial" className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors">
            💰 Financial Calculators
          </Link>
          <Link href="/calculators/health" className="px-4 py-2 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors">
            ❤️ Health Calculators
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
