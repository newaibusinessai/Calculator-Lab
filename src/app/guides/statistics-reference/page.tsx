import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Statistics Quick Reference - Formulas & Concepts Guide",
  description:
    "Essential statistics formulas and concepts: mean, median, mode, standard deviation, variance, probability, and more. Free reference guide with examples and calculator links.",
  alternates: {
    canonical: "https://calculatorlab.org/guides/statistics-reference",
    languages: {
      "en-US": "https://calculatorlab.org/guides/statistics-reference",
      "x-default": "https://calculatorlab.org/guides/statistics-reference",
    },
  },
  openGraph: {
    title: "Statistics Quick Reference - Formulas & Concepts Guide",
    description:
      "Essential statistics formulas and concepts with clear explanations and examples.",
    url: "https://calculatorlab.org/guides/statistics-reference",
  },
  twitter: {
    card: "summary_large_image",
    title: "Statistics Quick Reference - Formulas & Concepts Guide",
    description:
      "Essential statistics formulas and concepts with clear explanations and examples.",
    images: ["/og-image.png"],
  },
};

export default function StatisticsReferencePage() {
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
        <span className="text-gray-800">Statistics Reference</span>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Statistics Quick Reference
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A practical reference guide for essential statistics formulas and
          concepts. Bookmark this page for quick access during homework, research,
          or data analysis.
        </p>

        <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <strong className="text-blue-800">Quick Navigation:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            <a href="#central-tendency" className="text-blue-600 hover:underline text-sm">Central Tendency</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#spread" className="text-blue-600 hover:underline text-sm">Spread &amp; Variability</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#probability" className="text-blue-600 hover:underline text-sm">Probability</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#distributions" className="text-blue-600 hover:underline text-sm">Distributions</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#regression" className="text-blue-600 hover:underline text-sm">Regression</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#quick-ref" className="text-blue-600 hover:underline text-sm">Quick Reference</a>
          </div>
        </div>

        {/* Central Tendency */}
        <section id="central-tendency" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Measures of Central Tendency
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Mean (Average)</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-3">
                Mean = &Sigma;x / n
              </div>
              <p className="text-gray-600">
                Sum all values and divide by the count. The mean is sensitive to outliers.
              </p>
              <div className="bg-white p-4 rounded border mt-3">
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> Data: 4, 8, 6, 5, 7
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Mean = (4 + 8 + 6 + 5 + 7) / 5 = 30 / 5 = <strong>6</strong>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Median</h3>
              <p className="text-gray-600">
                The middle value when data is sorted in order. For an even number of values,
                take the average of the two middle values. The median is resistant to outliers.
              </p>
              <div className="bg-white p-4 rounded border mt-3">
                <p className="text-sm text-gray-600">
                  <strong>Odd count:</strong> 3, 5, <strong>7</strong>, 9, 11 &rarr; Median = 7
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Even count:</strong> 3, 5, 7, 9 &rarr; Median = (5 + 7) / 2 = <strong>6</strong>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Mode</h3>
              <p className="text-gray-600">
                The most frequently occurring value. A dataset can have no mode, one mode
                (unimodal), or multiple modes (bimodal, multimodal).
              </p>
              <div className="bg-white p-4 rounded border mt-3">
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> 2, 3, 3, 5, 7 &rarr; Mode = <strong>3</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="not-prose mt-4">
            <Link
              href="/calculators/math/average-calculator"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              Try our Mean/Median/Mode Calculator &rarr;
            </Link>
          </div>
        </section>

        {/* Spread & Variability */}
        <section id="spread" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Measures of Spread &amp; Variability
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Range</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-3">
                Range = Maximum - Minimum
              </div>
              <p className="text-gray-600">
                The simplest measure of spread. Easy to calculate but sensitive to outliers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Variance</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-3">
                <span>Population: &sigma;&sup2; = &Sigma;(x - &mu;)&sup2; / N</span>
                <br />
                <span>Sample: s&sup2; = &Sigma;(x - x&#772;)&sup2; / (n - 1)</span>
              </div>
              <p className="text-gray-600">
                The average of the squared differences from the mean. Sample variance
                uses n-1 (Bessel&apos;s correction) to provide an unbiased estimate.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Standard Deviation</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-3">
                &sigma; = &radic;Variance
              </div>
              <p className="text-gray-600">
                The square root of variance. Standard deviation is in the same units as your
                data, making it more interpretable than variance.
              </p>
              <div className="bg-white p-4 rounded border mt-3">
                <p className="text-sm text-gray-600">
                  <strong>Example:</strong> Data: 4, 8, 6, 5, 7 (Mean = 6)
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Differences: -2, 2, 0, -1, 1
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Squared: 4, 4, 0, 1, 1 &rarr; Sum = 10
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Sample variance = 10 / 4 = 2.5
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Standard deviation = &radic;2.5 &asymp; <strong>1.58</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="not-prose mt-4">
            <Link
              href="/calculators/math/standard-deviation-calculator"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              Try our Standard Deviation Calculator &rarr;
            </Link>
          </div>
        </section>

        {/* Probability */}
        <section id="probability" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Probability Basics
          </h2>

          <div className="space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-3">
              P(A) = Favorable Outcomes / Total Outcomes
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-3 py-2 text-left">Rule</th>
                    <th className="border px-3 py-2 text-left">Formula</th>
                    <th className="border px-3 py-2 text-left">Use When</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-3 py-2">Addition (OR)</td>
                    <td className="border px-3 py-2 font-mono text-xs">P(A or B) = P(A) + P(B) - P(A and B)</td>
                    <td className="border px-3 py-2">Either event can occur</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Multiplication (AND)</td>
                    <td className="border px-3 py-2 font-mono text-xs">P(A and B) = P(A) &times; P(B|A)</td>
                    <td className="border px-3 py-2">Both events must occur</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Complement</td>
                    <td className="border px-3 py-2 font-mono text-xs">P(not A) = 1 - P(A)</td>
                    <td className="border px-3 py-2">Event does not occur</td>
                  </tr>
                  <tr>
                    <td className="border px-3 py-2">Independent events</td>
                    <td className="border px-3 py-2 font-mono text-xs">P(A and B) = P(A) &times; P(B)</td>
                    <td className="border px-3 py-2">Events don&apos;t affect each other</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Permutations &amp; Combinations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-700">Permutations (order matters)</h4>
                  <p className="font-mono text-center my-2">P(n,r) = n! / (n-r)!</p>
                  <p className="text-sm text-gray-600">
                    How many ways to arrange r items from n items.
                  </p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-semibold text-gray-700">Combinations (order irrelevant)</h4>
                  <p className="font-mono text-center my-2">C(n,r) = n! / (r!(n-r)!)</p>
                  <p className="text-sm text-gray-600">
                    How many ways to choose r items from n items.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="not-prose mt-4">
            <Link
              href="/calculators/math/probability-calculator"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              Try our Probability Calculator &rarr;
            </Link>
          </div>
        </section>

        {/* Distributions */}
        <section id="distributions" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Common Distributions
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Normal Distribution (Bell Curve)</h3>
              <p className="text-gray-600 mb-3">
                The most important distribution in statistics. Many natural phenomena follow
                a normal distribution. It is defined by its mean (&mu;) and standard deviation (&sigma;).
              </p>
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold text-gray-700">The 68-95-99.7 Rule:</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li><strong>68%</strong> of data falls within 1 standard deviation of the mean</li>
                  <li><strong>95%</strong> of data falls within 2 standard deviations of the mean</li>
                  <li><strong>99.7%</strong> of data falls within 3 standard deviations of the mean</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Z-Score</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-3">
                z = (x - &mu;) / &sigma;
              </div>
              <p className="text-gray-600">
                Tells you how many standard deviations a value is from the mean.
                A z-score of 2 means the value is 2 standard deviations above the mean.
              </p>
            </div>
          </div>
        </section>

        {/* Regression */}
        <section id="regression" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Linear Regression
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            y = mx + b
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Variables:</h4>
              <ul className="text-gray-600 space-y-1 mt-2">
                <li><strong>y</strong> = predicted value</li>
                <li><strong>m</strong> = slope (rate of change)</li>
                <li><strong>x</strong> = independent variable</li>
                <li><strong>b</strong> = y-intercept</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700">R-squared (R&sup2;):</h4>
              <p className="text-gray-600 mt-2">
                Measures how well the line fits your data. Ranges from 0 to 1.
                An R&sup2; of 0.85 means 85% of the variation in y is explained by x.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Reference Table */}
        <section id="quick-ref" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Quick Reference Table
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left">Measure</th>
                  <th className="border px-3 py-2 text-left">Formula</th>
                  <th className="border px-3 py-2 text-left">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">Mean</td>
                  <td className="border px-3 py-2 font-mono text-xs">&Sigma;x / n</td>
                  <td className="border px-3 py-2">Symmetric data, no outliers</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Median</td>
                  <td className="border px-3 py-2 font-mono text-xs">Middle value</td>
                  <td className="border px-3 py-2">Skewed data, has outliers</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Mode</td>
                  <td className="border px-3 py-2 font-mono text-xs">Most frequent</td>
                  <td className="border px-3 py-2">Categorical data</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Std Dev</td>
                  <td className="border px-3 py-2 font-mono text-xs">&radic;(&Sigma;(x-x&#772;)&sup2;/(n-1))</td>
                  <td className="border px-3 py-2">Measuring spread</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Z-Score</td>
                  <td className="border px-3 py-2 font-mono text-xs">(x - &mu;) / &sigma;</td>
                  <td className="border px-3 py-2">Comparing across datasets</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Correlation</td>
                  <td className="border px-3 py-2 font-mono text-xs">r = -1 to +1</td>
                  <td className="border px-3 py-2">Relationship strength</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Calculators */}
        <section className="not-prose border-t pt-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Related Calculators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Average Calculator", slug: "average-calculator", icon: "📊" },
              { name: "Std Dev Calculator", slug: "standard-deviation-calculator", icon: "📈" },
              { name: "Probability Calculator", slug: "probability-calculator", icon: "🎲" },
              { name: "Percentage Calculator", slug: "percentage-calculator", icon: "%" },
            ].map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/math/${calc.slug}`}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow text-center"
              >
                <span className="text-2xl">{calc.icon}</span>
                <span className="block text-sm font-medium text-blue-600 mt-2">
                  {calc.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <div className="mt-8">
        <Link href="/guides" className="text-blue-600 hover:underline">
          &larr; Back to all guides
        </Link>
      </div>
    </div>
  );
}
