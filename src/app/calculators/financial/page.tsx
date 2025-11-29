import Link from "next/link";
import { Metadata } from "next";
import { getCalculatorsByCategory } from "@/lib/calculators";
import { ResponsiveAdUnit } from "@/components/AdUnit";
import { FAQSchema, BreadcrumbSchema } from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Financial Calculators - Free Loan, Mortgage & Investment Tools | Calculator Lab",
  description:
    "Free online financial calculators: mortgage calculator, loan calculator, compound interest, retirement planner, investment calculator, salary converter, and more. Plan your finances with accurate tools.",
  keywords: [
    "mortgage calculator",
    "loan calculator",
    "compound interest calculator",
    "simple interest calculator",
    "investment calculator",
    "retirement calculator",
    "401k calculator",
    "savings calculator",
    "amortization calculator",
    "APR calculator",
    "credit card payoff calculator",
    "salary calculator",
    "paycheck calculator",
    "inflation calculator",
  ],
  openGraph: {
    title: "Financial Calculators - Free Loan, Mortgage & Investment Tools | Calculator Lab",
    description: "Free online financial calculators for mortgages, loans, investments, retirement planning, and more. Make smarter financial decisions.",
    url: "https://calculatorlab.org/calculators/financial",
  },
};

export default function FinancialCalculatorsPage() {
  const calculators = getCalculatorsByCategory("financial");

  const popularCalculators = [
    "mortgage-calculator",
    "loan-calculator",
    "compound-interest-calculator",
    "retirement-calculator",
    "salary-calculator",
    "investment-calculator",
  ];

  const popular = calculators.filter(c => popularCalculators.includes(c.slug));
  const others = calculators.filter(c => !popularCalculators.includes(c.slug));

  const faqs = [
    {
      question: "How do I calculate my mortgage payment?",
      answer: "Use our Mortgage Calculator by entering your home price, down payment, loan term, and interest rate. The calculator will show your monthly payment, total interest paid, and a complete amortization schedule."
    },
    {
      question: "What's the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus accumulated interest. Use our compound interest calculator to see how your money grows faster with compounding."
    },
    {
      question: "How much should I save for retirement?",
      answer: "Financial experts recommend saving 10-15% of your income for retirement. Our retirement calculator can help you determine how much you need based on your desired retirement age, lifestyle, and current savings."
    },
    {
      question: "Are these financial calculators accurate?",
      answer: "Yes, our calculators use industry-standard formulas and are regularly updated to reflect current rates and regulations. However, results are estimates - consult a financial advisor for personalized advice."
    }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://calculatorlab.org" },
    { name: "Financial Calculators", url: "https://calculatorlab.org/calculators/financial" }
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
          <span className="text-gray-800">Financial Calculators</span>
        </nav>

      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Free Online Financial Calculators
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Plan your financial future with our comprehensive suite of free calculators.
          From mortgages and loans to retirement planning and investments - make informed financial decisions.
        </p>
      </div>

      {/* Popular Calculators */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-yellow-500">★</span> Most Popular Financial Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/financial/${calc.slug}`}
              className="block p-5 border-2 border-green-200 rounded-lg hover:border-green-400 hover:shadow-lg transition-all bg-gradient-to-br from-green-50 to-white"
            >
              <h3 className="font-semibold text-lg text-green-700 mb-2">
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

      {/* All Financial Calculators */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          All Financial Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/financial/${calc.slug}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-green-400 hover:shadow-md transition-all bg-white"
            >
              <h3 className="font-semibold text-green-700 mb-1">{calc.name}</h3>
              <p className="text-sm text-gray-600">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          About Our Financial Calculators
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Loan & Mortgage Tools</h3>
            <p className="text-sm mb-3">
              Our <Link href="/calculators/financial/mortgage-calculator" className="text-blue-600 hover:underline">mortgage calculator</Link> helps
              you estimate monthly payments, total interest, and amortization schedules. Use the <Link href="/calculators/financial/loan-calculator" className="text-blue-600 hover:underline">loan calculator</Link> for
              auto loans, personal loans, and other financing options.
            </p>
            <h3 className="font-semibold text-gray-800 mb-2">Investment & Retirement</h3>
            <p className="text-sm">
              Plan for your future with our <Link href="/calculators/financial/retirement-calculator" className="text-blue-600 hover:underline">retirement calculator</Link> and
              see how your savings grow with the <Link href="/calculators/financial/compound-interest-calculator" className="text-blue-600 hover:underline">compound interest calculator</Link>.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Calculator Categories</h3>
            <ul className="text-sm space-y-1">
              <li>• <strong>Loans:</strong> Mortgage, auto loan, personal loan, student loan</li>
              <li>• <strong>Interest:</strong> Compound interest, simple interest, APR/APY</li>
              <li>• <strong>Retirement:</strong> 401(k), IRA, pension, Social Security</li>
              <li>• <strong>Income:</strong> Salary, paycheck, hourly wage, tax withholding</li>
              <li>• <strong>Savings:</strong> Emergency fund, down payment, education savings</li>
              <li>• <strong>Debt:</strong> Credit card payoff, debt consolidation, refinance</li>
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
              How do I calculate my mortgage payment?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Use our <Link href="/calculators/financial/mortgage-calculator" className="text-blue-600 hover:underline">Mortgage Calculator</Link> by
              entering your home price, down payment, loan term, and interest rate. The calculator will show your
              monthly payment, total interest paid, and a complete amortization schedule.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              What's the difference between simple and compound interest?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Simple interest is calculated only on the principal amount, while compound interest is calculated on
              the principal plus accumulated interest. Use our <Link href="/calculators/financial/compound-interest-calculator" className="text-blue-600 hover:underline">compound interest calculator</Link> to
              see how your money grows faster with compounding.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              How much should I save for retirement?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Financial experts recommend saving 10-15% of your income for retirement. Our <Link href="/calculators/financial/retirement-calculator" className="text-blue-600 hover:underline">retirement calculator</Link> can
              help you determine how much you need based on your desired retirement age, lifestyle, and current savings.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              Are these financial calculators accurate?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Yes, our calculators use industry-standard formulas and are regularly updated to reflect current rates
              and regulations. However, results are estimates - consult a financial advisor for personalized advice.
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
