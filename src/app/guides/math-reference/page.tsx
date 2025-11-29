import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Math Reference Sheet - Formulas, Conversions & Quick Reference",
  description:
    "Complete math reference guide with common formulas, unit conversions, percentage tricks, and calculation shortcuts. Free printable reference sheet.",
  openGraph: {
    title: "Math Reference Sheet - Formulas & Conversions",
    description:
      "Complete math reference guide with formulas, conversions, and shortcuts.",
    url: "https://calculatorlab.org/guides/math-reference",
  },
};

export default function MathReferencePage() {
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
        <span className="text-gray-800">Math Reference</span>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Math Reference Sheet
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Quick reference for common formulas, conversions, and calculations.
          Bookmark this page or print for offline use.
        </p>

        <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <strong className="text-blue-800">Quick Navigation:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            <a href="#percentages" className="text-blue-600 hover:underline text-sm">Percentages</a>
            <span className="text-gray-400">•</span>
            <a href="#fractions" className="text-blue-600 hover:underline text-sm">Fractions</a>
            <span className="text-gray-400">•</span>
            <a href="#geometry" className="text-blue-600 hover:underline text-sm">Geometry</a>
            <span className="text-gray-400">•</span>
            <a href="#conversions" className="text-blue-600 hover:underline text-sm">Conversions</a>
            <span className="text-gray-400">•</span>
            <a href="#algebra" className="text-blue-600 hover:underline text-sm">Algebra</a>
            <span className="text-gray-400">•</span>
            <a href="#statistics" className="text-blue-600 hover:underline text-sm">Statistics</a>
          </div>
        </div>

        {/* Percentages */}
        <section id="percentages" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Percentage Quick Reference
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Percentage ↔ Decimal ↔ Fraction</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Percentage</th>
                  <th className="border border-gray-300 px-4 py-2">Decimal</th>
                  <th className="border border-gray-300 px-4 py-2">Fraction</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">10%</td><td className="border border-gray-300 px-4 py-2 text-center">0.10</td><td className="border border-gray-300 px-4 py-2 text-center">1/10</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">20%</td><td className="border border-gray-300 px-4 py-2 text-center">0.20</td><td className="border border-gray-300 px-4 py-2 text-center">1/5</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">25%</td><td className="border border-gray-300 px-4 py-2 text-center">0.25</td><td className="border border-gray-300 px-4 py-2 text-center">1/4</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">33.33%</td><td className="border border-gray-300 px-4 py-2 text-center">0.333</td><td className="border border-gray-300 px-4 py-2 text-center">1/3</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">50%</td><td className="border border-gray-300 px-4 py-2 text-center">0.50</td><td className="border border-gray-300 px-4 py-2 text-center">1/2</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">66.67%</td><td className="border border-gray-300 px-4 py-2 text-center">0.667</td><td className="border border-gray-300 px-4 py-2 text-center">2/3</td></tr>
                <tr><td className="border border-gray-300 px-4 py-2 text-center">75%</td><td className="border border-gray-300 px-4 py-2 text-center">0.75</td><td className="border border-gray-300 px-4 py-2 text-center">3/4</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Percentage Formulas</h3>
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <p><strong>What is X% of Y?</strong> → Y × (X/100)</p>
            <p><strong>X is what % of Y?</strong> → (X/Y) × 100</p>
            <p><strong>X is Y% of what?</strong> → X / (Y/100)</p>
            <p><strong>Percent Change:</strong> → [(New - Old) / Old] × 100</p>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            <Link href="/calculators/math/percentage-calculator" className="text-blue-600 hover:underline">
              Try our Percentage Calculator →
            </Link>
          </p>
        </section>

        {/* Fractions */}
        <section id="fractions" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Fraction Operations
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg space-y-3">
            <p><strong>Addition:</strong> a/b + c/d = (ad + bc) / bd</p>
            <p><strong>Subtraction:</strong> a/b - c/d = (ad - bc) / bd</p>
            <p><strong>Multiplication:</strong> a/b × c/d = ac / bd</p>
            <p><strong>Division:</strong> a/b ÷ c/d = ad / bc</p>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <Link href="/calculators/math/fraction-calculator" className="text-blue-600 hover:underline">
              Try our Fraction Calculator →
            </Link>
          </p>
        </section>

        {/* Geometry */}
        <section id="geometry" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Geometry Formulas
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">2D Shapes</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Shape</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Area</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Perimeter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rectangle</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">l × w</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">2(l + w)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Square</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">s²</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">4s</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Triangle</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">½ × b × h</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">a + b + c</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Circle</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">πr²</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">2πr</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Trapezoid</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">½(a + b) × h</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">a + b + c + d</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">3D Shapes</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Shape</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Volume</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Surface Area</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cube</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">s³</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">6s²</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Rectangular Prism</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">l × w × h</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">2(lw + lh + wh)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Sphere</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">(4/3)πr³</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">4πr²</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cylinder</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">πr²h</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">2πr² + 2πrh</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Cone</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">(1/3)πr²h</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">πr² + πrl</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Pythagorean Theorem</h3>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center">
            a² + b² = c²
          </div>
          <p className="text-gray-600 mt-2 text-sm">
            For right triangles: the sum of squares of the two legs equals the square of the hypotenuse.
          </p>
        </section>

        {/* Unit Conversions */}
        <section id="conversions" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Common Unit Conversions
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Length</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg space-y-1 text-sm">
              <p>1 inch = 2.54 cm</p>
              <p>1 foot = 12 inches = 30.48 cm</p>
              <p>1 yard = 3 feet = 0.9144 m</p>
              <p>1 mile = 5,280 feet = 1.609 km</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg space-y-1 text-sm">
              <p>1 meter = 100 cm = 3.281 feet</p>
              <p>1 kilometer = 1,000 m = 0.621 miles</p>
              <p>1 cm = 10 mm = 0.394 inches</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Weight/Mass</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg space-y-1 text-sm">
              <p>1 ounce = 28.35 grams</p>
              <p>1 pound = 16 ounces = 453.6 g</p>
              <p>1 ton (US) = 2,000 pounds</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg space-y-1 text-sm">
              <p>1 gram = 0.035 ounces</p>
              <p>1 kilogram = 2.205 pounds</p>
              <p>1 metric ton = 1,000 kg</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Volume</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg space-y-1 text-sm">
              <p>1 cup = 8 fl oz = 236.6 mL</p>
              <p>1 pint = 2 cups = 473 mL</p>
              <p>1 quart = 2 pints = 946 mL</p>
              <p>1 gallon = 4 quarts = 3.785 L</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg space-y-1 text-sm">
              <p>1 liter = 1,000 mL = 1.057 quarts</p>
              <p>1 mL = 0.034 fl oz</p>
              <p>1 cubic foot = 7.48 gallons</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Temperature</h3>
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <p><strong>Fahrenheit to Celsius:</strong> C = (F - 32) × 5/9</p>
            <p><strong>Celsius to Fahrenheit:</strong> F = C × 9/5 + 32</p>
            <p><strong>Celsius to Kelvin:</strong> K = C + 273.15</p>
          </div>
        </section>

        {/* Algebra */}
        <section id="algebra" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Algebra Essentials
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Quadratic Formula</h3>
          <div className="bg-gray-100 p-4 rounded-lg text-center mb-4">
            <p className="text-lg">For ax² + bx + c = 0:</p>
            <p className="font-mono text-xl mt-2">x = (-b ± √(b² - 4ac)) / 2a</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Exponent Rules</h3>
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <p>x<sup>a</sup> × x<sup>b</sup> = x<sup>a+b</sup></p>
            <p>x<sup>a</sup> / x<sup>b</sup> = x<sup>a-b</sup></p>
            <p>(x<sup>a</sup>)<sup>b</sup> = x<sup>ab</sup></p>
            <p>x<sup>0</sup> = 1 (for x ≠ 0)</p>
            <p>x<sup>-a</sup> = 1/x<sup>a</sup></p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Logarithm Rules</h3>
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <p>log(xy) = log(x) + log(y)</p>
            <p>log(x/y) = log(x) - log(y)</p>
            <p>log(x<sup>n</sup>) = n × log(x)</p>
            <p>log<sub>b</sub>(x) = log(x) / log(b)</p>
          </div>
        </section>

        {/* Statistics */}
        <section id="statistics" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Basic Statistics
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg space-y-3">
            <p><strong>Mean (Average):</strong> Sum of all values ÷ Number of values</p>
            <p><strong>Median:</strong> Middle value when sorted (or average of two middle values)</p>
            <p><strong>Mode:</strong> Most frequently occurring value</p>
            <p><strong>Range:</strong> Maximum value - Minimum value</p>
            <p><strong>Standard Deviation:</strong> √[Σ(x - mean)² / n]</p>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            <Link href="/calculators/math/average-calculator" className="text-blue-600 hover:underline">
              Try our Average Calculator →
            </Link>
          </p>
        </section>

        {/* Constants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Mathematical Constants
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Constant</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Symbol</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Pi</td>
                  <td className="border border-gray-300 px-4 py-2">π</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">3.14159265359...</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Euler&apos;s Number</td>
                  <td className="border border-gray-300 px-4 py-2">e</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">2.71828182846...</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Golden Ratio</td>
                  <td className="border border-gray-300 px-4 py-2">φ</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">1.61803398875...</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Square Root of 2</td>
                  <td className="border border-gray-300 px-4 py-2">√2</td>
                  <td className="border border-gray-300 px-4 py-2 font-mono">1.41421356237...</td>
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
          <Link href="/calculators/math/percentage-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">%</span>
            <span className="block text-sm text-gray-700 mt-2">Percentage</span>
          </Link>
          <Link href="/calculators/math/fraction-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">½</span>
            <span className="block text-sm text-gray-700 mt-2">Fraction</span>
          </Link>
          <Link href="/calculators/math/scientific-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">🔬</span>
            <span className="block text-sm text-gray-700 mt-2">Scientific</span>
          </Link>
          <Link href="/calculators/other/unit-converter" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">🔄</span>
            <span className="block text-sm text-gray-700 mt-2">Unit Converter</span>
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
