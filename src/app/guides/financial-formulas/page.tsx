import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Essential Financial Formulas - Complete Reference Guide",
  description:
    "Master the most important financial formulas: compound interest, loan payments, ROI, NPV, and more. Free reference guide with examples and calculator links.",
  openGraph: {
    title: "Essential Financial Formulas - Complete Reference Guide",
    description:
      "Master the most important financial formulas with clear explanations and examples.",
    url: "https://calculatorlab.org/guides/financial-formulas",
  },
};

export default function FinancialFormulasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/guides" className="hover:text-blue-600">
          Guides
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Financial Formulas</span>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Essential Financial Formulas
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A comprehensive reference guide to the most important financial formulas.
          Bookmark this page for quick access.
        </p>

        <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <strong className="text-blue-800">Quick Navigation:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            <a href="#compound-interest" className="text-blue-600 hover:underline text-sm">Compound Interest</a>
            <span className="text-gray-400">•</span>
            <a href="#loan-payment" className="text-blue-600 hover:underline text-sm">Loan Payment</a>
            <span className="text-gray-400">•</span>
            <a href="#roi" className="text-blue-600 hover:underline text-sm">ROI</a>
            <span className="text-gray-400">•</span>
            <a href="#npv" className="text-blue-600 hover:underline text-sm">NPV</a>
            <span className="text-gray-400">•</span>
            <a href="#irr" className="text-blue-600 hover:underline text-sm">IRR</a>
            <span className="text-gray-400">•</span>
            <a href="#break-even" className="text-blue-600 hover:underline text-sm">Break-Even</a>
            <span className="text-gray-400">•</span>
            <a href="#rule-of-72" className="text-blue-600 hover:underline text-sm">Rule of 72</a>
          </div>
        </div>

        {/* Compound Interest */}
        <section id="compound-interest" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Compound Interest
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            A = P(1 + r/n)<sup>nt</sup>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Variables:</h4>
              <ul className="text-gray-600 space-y-1 mt-2">
                <li><strong>A</strong> = Final amount</li>
                <li><strong>P</strong> = Principal (initial amount)</li>
                <li><strong>r</strong> = Annual interest rate (decimal)</li>
                <li><strong>n</strong> = Compounding frequency per year</li>
                <li><strong>t</strong> = Time in years</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-gray-700">Example:</h4>
              <p className="text-sm text-gray-600 mt-2">
                $10,000 at 5% annual interest, compounded monthly for 10 years:
              </p>
              <p className="text-sm font-mono mt-2">
                A = 10,000(1 + 0.05/12)<sup>12×10</sup>
              </p>
              <p className="text-lg font-semibold text-blue-600 mt-2">
                = $16,470.09
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            <Link href="/calculators/financial/compound-interest-calculator" className="text-blue-600 hover:underline">
              Try our Compound Interest Calculator →
            </Link>
          </p>
        </section>

        {/* Loan Payment */}
        <section id="loan-payment" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Loan Payment (Amortization)
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            M = P × [r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1]
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Variables:</h4>
              <ul className="text-gray-600 space-y-1 mt-2">
                <li><strong>M</strong> = Monthly payment</li>
                <li><strong>P</strong> = Principal (loan amount)</li>
                <li><strong>r</strong> = Monthly interest rate (annual ÷ 12)</li>
                <li><strong>n</strong> = Total number of payments</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-gray-700">Example:</h4>
              <p className="text-sm text-gray-600 mt-2">
                $250,000 mortgage at 6% for 30 years:
              </p>
              <p className="text-sm text-gray-600 mt-1">
                r = 0.06/12 = 0.005, n = 360
              </p>
              <p className="text-lg font-semibold text-blue-600 mt-2">
                M = $1,498.88/month
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            <Link href="/calculators/financial/mortgage-calculator" className="text-blue-600 hover:underline">
              Try our Mortgage Calculator →
            </Link>
          </p>
        </section>

        {/* ROI */}
        <section id="roi" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Return on Investment (ROI)
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            ROI = [(Final Value - Initial Investment) / Initial Investment] × 100
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Simple ROI:</h4>
              <p className="text-gray-600 mt-2">
                Measures the percentage gain or loss on an investment relative to its cost.
              </p>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-gray-700">Example:</h4>
              <p className="text-sm text-gray-600 mt-2">
                Invested $5,000, now worth $7,500:
              </p>
              <p className="text-sm font-mono mt-2">
                ROI = [(7,500 - 5,000) / 5,000] × 100
              </p>
              <p className="text-lg font-semibold text-blue-600 mt-2">
                = 50% return
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            <Link href="/calculators/financial/roi-calculator" className="text-blue-600 hover:underline">
              Try our ROI Calculator →
            </Link>
          </p>
        </section>

        {/* NPV */}
        <section id="npv" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Net Present Value (NPV)
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            NPV = Σ [C<sub>t</sub> / (1+r)<sup>t</sup>] - C<sub>0</sub>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Variables:</h4>
              <ul className="text-gray-600 space-y-1 mt-2">
                <li><strong>C<sub>t</sub></strong> = Cash flow at time t</li>
                <li><strong>r</strong> = Discount rate</li>
                <li><strong>t</strong> = Time period</li>
                <li><strong>C<sub>0</sub></strong> = Initial investment</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-gray-700">Decision Rule:</h4>
              <p className="text-sm text-gray-600 mt-2">
                <strong>NPV &gt; 0:</strong> Investment adds value (accept)
              </p>
              <p className="text-sm text-gray-600">
                <strong>NPV &lt; 0:</strong> Investment destroys value (reject)
              </p>
              <p className="text-sm text-gray-600">
                <strong>NPV = 0:</strong> Investment breaks even
              </p>
            </div>
          </div>
        </section>

        {/* IRR */}
        <section id="irr" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Internal Rate of Return (IRR)
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
            <p className="font-mono">NPV = 0 = Σ [C<sub>t</sub> / (1+IRR)<sup>t</sup>] - C<sub>0</sub></p>
            <p className="text-sm text-gray-600 mt-2">Solve for IRR (usually requires iteration)</p>
          </div>
          <p className="text-gray-600 mb-4">
            IRR is the discount rate that makes the NPV of all cash flows equal to zero.
            It represents the expected annual growth rate of an investment.
          </p>
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-gray-700">Decision Rule:</h4>
            <p className="text-sm text-gray-600 mt-2">
              If IRR exceeds your required rate of return (hurdle rate), the investment is attractive.
            </p>
          </div>
        </section>

        {/* Break-Even */}
        <section id="break-even" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Break-Even Analysis
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            Break-Even Units = Fixed Costs / (Price per Unit - Variable Cost per Unit)
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Components:</h4>
              <ul className="text-gray-600 space-y-1 mt-2">
                <li><strong>Fixed Costs:</strong> Rent, salaries, insurance</li>
                <li><strong>Variable Costs:</strong> Materials, commission</li>
                <li><strong>Contribution Margin:</strong> Price - Variable Cost</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-gray-700">Example:</h4>
              <p className="text-sm text-gray-600 mt-2">
                Fixed costs: $50,000<br />
                Price: $100, Variable cost: $60
              </p>
              <p className="text-sm font-mono mt-2">
                = $50,000 / ($100 - $60)
              </p>
              <p className="text-lg font-semibold text-blue-600 mt-2">
                = 1,250 units to break even
              </p>
            </div>
          </div>
        </section>

        {/* Rule of 72 */}
        <section id="rule-of-72" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Rule of 72
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            Years to Double = 72 / Interest Rate
          </div>
          <p className="text-gray-600 mb-4">
            A quick mental math shortcut to estimate how long it takes for an investment to double at a given interest rate.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Interest Rate</th>
                  <th className="border border-gray-300 px-4 py-2">Years to Double</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">4%</td><td className="border border-gray-300 px-4 py-2 text-center">18 years</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">6%</td><td className="border border-gray-300 px-4 py-2 text-center">12 years</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">8%</td><td className="border border-gray-300 px-4 py-2 text-center">9 years</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">10%</td><td className="border border-gray-300 px-4 py-2 text-center">7.2 years</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">12%</td><td className="border border-gray-300 px-4 py-2 text-center">6 years</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Additional Formulas */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Quick Reference Table
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Formula</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Use Case</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Simple Interest = P × r × t</td>
                  <td className="border border-gray-300 px-4 py-2">Short-term loans, treasury bills</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Future Value = PV × (1 + r)<sup>n</sup></td>
                  <td className="border border-gray-300 px-4 py-2">Investment projections</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Present Value = FV / (1 + r)<sup>n</sup></td>
                  <td className="border border-gray-300 px-4 py-2">Discounting future cash flows</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Debt-to-Income = Monthly Debt / Monthly Income</td>
                  <td className="border border-gray-300 px-4 py-2">Loan qualification</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-mono text-sm">Profit Margin = (Revenue - Costs) / Revenue × 100</td>
                  <td className="border border-gray-300 px-4 py-2">Business profitability</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </article>

      {/* Related Calculators */}
      <section className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Related Calculators
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/calculators/financial/compound-interest-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">📈</span>
            <span className="block text-sm text-gray-700 mt-2">Compound Interest</span>
          </Link>
          <Link href="/calculators/financial/mortgage-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">🏠</span>
            <span className="block text-sm text-gray-700 mt-2">Mortgage</span>
          </Link>
          <Link href="/calculators/financial/roi-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">💹</span>
            <span className="block text-sm text-gray-700 mt-2">ROI</span>
          </Link>
          <Link href="/calculators/financial/loan-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">💵</span>
            <span className="block text-sm text-gray-700 mt-2">Loan</span>
          </Link>
        </div>
      </section>

      <div className="mt-8">
        <Link href="/guides" className="text-blue-600 hover:underline">
          ← Back to all guides
        </Link>
      </div>
    </div>
  );
}
