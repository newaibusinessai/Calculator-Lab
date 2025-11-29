import Link from "next/link";
import { Metadata } from "next";
import { getCalculatorsByCategory } from "@/lib/calculators";
import { ResponsiveAdUnit } from "@/components/AdUnit";
import { FAQSchema, BreadcrumbSchema } from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Math Calculators - Free Online Math Tools | Calculator Lab",
  description:
    "Free online math calculators: scientific calculator, percentage calculator, fraction calculator, square root, exponent, quadratic formula, and more. Fast, accurate, and easy to use.",
  keywords: [
    "math calculator",
    "scientific calculator online",
    "percentage calculator",
    "fraction calculator",
    "square root calculator",
    "exponent calculator",
    "quadratic equation calculator",
    "average calculator",
    "mean median mode calculator",
    "ratio calculator",
  ],
  openGraph: {
    title: "Math Calculators - Free Online Math Tools | Calculator Lab",
    description: "Free online math calculators for students, teachers, and professionals. Scientific, percentage, fraction, and algebra calculators.",
    url: "https://calculatorlab.org/calculators/math",
  },
};

export default function MathCalculatorsPage() {
  const calculators = getCalculatorsByCategory("math");

  const popularCalculators = [
    "percentage-calculator",
    "scientific-calculator",
    "fraction-calculator",
    "square-root-calculator",
    "average-calculator",
    "quadratic-formula-calculator",
  ];

  const popular = calculators.filter(c => popularCalculators.includes(c.slug));
  const others = calculators.filter(c => !popularCalculators.includes(c.slug));

  const faqs = [
    {
      question: "What math calculators are available on Calculator Lab?",
      answer: `Calculator Lab offers ${calculators.length}+ free math calculators including percentage calculators, fraction calculators, scientific calculator, quadratic formula solver, statistics calculators, geometry tools, and more. All calculators work on desktop, tablet, and mobile devices.`
    },
    {
      question: "Are these math calculators free to use?",
      answer: "Yes, all Calculator Lab math calculators are completely free. No registration, no downloads, no hidden fees. Just open the calculator and start calculating instantly."
    },
    {
      question: "Can I use these calculators for homework?",
      answer: "Absolutely! Our calculators are designed to help students learn and verify their work. Each calculator shows the formula used and step-by-step explanations to help you understand the math, not just get the answer."
    },
    {
      question: "Which calculator should I use for percentage problems?",
      answer: "Use our Percentage Calculator which handles three types of problems: finding X% of Y, finding what percent X is of Y, and calculating percentage change between two values."
    }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://calculatorlab.org" },
    { name: "Math Calculators", url: "https://calculatorlab.org/calculators/math" }
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
          <span className="text-gray-800">Math Calculators</span>
        </nav>

      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Free Online Math Calculators
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Powerful math calculators for students, teachers, engineers, and professionals.
          From basic arithmetic to advanced algebra and statistics - all free, no registration required.
        </p>
      </div>

      {/* Popular Calculators */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-yellow-500">★</span> Most Popular Math Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/math/${calc.slug}`}
              className="block p-5 border-2 border-blue-200 rounded-lg hover:border-blue-400 hover:shadow-lg transition-all bg-gradient-to-br from-blue-50 to-white"
            >
              <h3 className="font-semibold text-lg text-blue-700 mb-2">
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

      {/* All Math Calculators */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          All Math Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/math/${calc.slug}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:shadow-md transition-all bg-white"
            >
              <h3 className="font-semibold text-blue-700 mb-1">{calc.name}</h3>
              <p className="text-sm text-gray-600">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          About Our Math Calculators
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">For Students</h3>
            <p className="text-sm mb-3">
              Our math calculators help students with homework, exam preparation, and understanding
              mathematical concepts. Use the <Link href="/calculators/math/percentage-calculator" className="text-blue-600 hover:underline">percentage calculator</Link> for
              quick calculations, or the <Link href="/calculators/math/quadratic-formula-calculator" className="text-blue-600 hover:underline">quadratic formula calculator</Link> for
              solving equations.
            </p>
            <h3 className="font-semibold text-gray-800 mb-2">For Professionals</h3>
            <p className="text-sm">
              Engineers, scientists, and business professionals rely on our <Link href="/calculators/math/scientific-calculator" className="text-blue-600 hover:underline">scientific calculator</Link> for
              complex calculations, statistical analysis, and data processing.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Calculator Categories</h3>
            <ul className="text-sm space-y-1">
              <li>• <strong>Basic Math:</strong> Addition, subtraction, multiplication, division</li>
              <li>• <strong>Percentages:</strong> Percent change, increase, decrease, tip calculations</li>
              <li>• <strong>Fractions:</strong> Add, subtract, multiply, divide fractions</li>
              <li>• <strong>Algebra:</strong> Quadratic equations, slope, linear equations</li>
              <li>• <strong>Geometry:</strong> Area, volume, perimeter, triangle calculations</li>
              <li>• <strong>Statistics:</strong> Mean, median, mode, standard deviation</li>
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
              What math calculators are available on Calculator Lab?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Calculator Lab offers {calculators.length}+ free math calculators including percentage calculators,
              fraction calculators, scientific calculator, quadratic formula solver, statistics calculators,
              geometry tools, and more. All calculators work on desktop, tablet, and mobile devices.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              Are these math calculators free to use?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Yes, all Calculator Lab math calculators are completely free. No registration, no downloads,
              no hidden fees. Just open the calculator and start calculating instantly.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              Can I use these calculators for homework?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Absolutely! Our calculators are designed to help students learn and verify their work.
              Each calculator shows the formula used and step-by-step explanations to help you
              understand the math, not just get the answer.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              Which calculator should I use for percentage problems?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Use our <Link href="/calculators/math/percentage-calculator" className="text-blue-600 hover:underline">Percentage Calculator</Link> which
              handles three types of problems: finding X% of Y, finding what percent X is of Y,
              and calculating percentage change between two values.
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
          <Link href="/calculators/financial" className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors">
            💰 Financial Calculators
          </Link>
          <Link href="/calculators/health" className="px-4 py-2 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors">
            ❤️ Health Calculators
          </Link>
          <Link href="/calculators/other" className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors">
            🔧 Other Tools
          </Link>
        </div>
      </section>
      </div>
    </>
  );
}
