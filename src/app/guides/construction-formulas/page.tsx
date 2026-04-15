import { Metadata } from "next";
import Link from "next/link";
import AdUnit from "@/components/AdUnit";

export const metadata: Metadata = {
  title: "Construction & Home Improvement Formulas - Reference Guide",
  description:
    "Essential construction and home improvement formulas for concrete, tile, paint, flooring, roofing, and more. Free reference guide with examples and calculator links.",
  alternates: {
    canonical: "https://calculatorlab.org/guides/construction-formulas",
    languages: {
      "en-US": "https://calculatorlab.org/guides/construction-formulas",
      "x-default": "https://calculatorlab.org/guides/construction-formulas",
    },
  },
  openGraph: {
    title: "Construction & Home Improvement Formulas - Reference Guide",
    description:
      "Essential construction and home improvement formulas with clear explanations and examples.",
    url: "https://calculatorlab.org/guides/construction-formulas",
  },
  twitter: {
    card: "summary_large_image",
    title: "Construction & Home Improvement Formulas - Reference Guide",
    description:
      "Essential construction and home improvement formulas with clear explanations and examples.",
    images: ["/og-image.png"],
  },
};

export default function ConstructionFormulasPage() {
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
        <span className="text-gray-800">Construction Formulas</span>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Construction &amp; Home Improvement Formulas
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A practical reference guide for estimating materials and costs on
          construction and home improvement projects. Bookmark this page for quick access.
        </p>

        <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <strong className="text-blue-800">Quick Navigation:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            <a href="#concrete" className="text-blue-600 hover:underline text-sm">Concrete</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#tile" className="text-blue-600 hover:underline text-sm">Tile &amp; Flooring</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#paint" className="text-blue-600 hover:underline text-sm">Paint</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#roofing" className="text-blue-600 hover:underline text-sm">Roofing</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#lumber" className="text-blue-600 hover:underline text-sm">Lumber</a>
            <span className="text-gray-400">&bull;</span>
            <a href="#area-volume" className="text-blue-600 hover:underline text-sm">Area &amp; Volume</a>
          </div>
        </div>

        {/* Concrete */}
        <section id="concrete" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Concrete Estimation
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            Volume (cubic yards) = (Length &times; Width &times; Depth in feet) / 27
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Steps:</h4>
              <ol className="text-gray-600 space-y-1 mt-2 list-decimal pl-5">
                <li>Measure area in feet (length &times; width)</li>
                <li>Convert depth to feet (inches / 12)</li>
                <li>Multiply: length &times; width &times; depth = cubic feet</li>
                <li>Divide by 27 to get cubic yards</li>
                <li>Add 5-10% for waste</li>
              </ol>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-gray-700">Example:</h4>
              <p className="text-sm text-gray-600 mt-2">
                A 20ft &times; 10ft patio, 4 inches deep:
              </p>
              <p className="text-sm text-gray-600 mt-1">
                20 &times; 10 &times; (4/12) = 66.67 cubic feet
              </p>
              <p className="text-sm text-gray-600 mt-1">
                66.67 / 27 = <strong>2.47 cubic yards</strong>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                With 10% waste: ~2.7 cubic yards
              </p>
            </div>
          </div>
          <div className="not-prose mt-4">
            <Link
              href="/calculators/other/concrete-calculator"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              Try our Concrete Calculator &rarr;
            </Link>
          </div>
        </section>

        {/* Tile & Flooring */}
        <section id="tile" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Tile &amp; Flooring
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            Tiles Needed = Floor Area / Tile Area + Waste (10-15%)
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Common Tile Sizes:</h4>
              <ul className="text-gray-600 space-y-1 mt-2">
                <li><strong>12&quot; &times; 12&quot;</strong> = 1 sq ft per tile</li>
                <li><strong>12&quot; &times; 24&quot;</strong> = 2 sq ft per tile</li>
                <li><strong>18&quot; &times; 18&quot;</strong> = 2.25 sq ft per tile</li>
                <li><strong>24&quot; &times; 24&quot;</strong> = 4 sq ft per tile</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-gray-700">Example:</h4>
              <p className="text-sm text-gray-600 mt-2">
                200 sq ft room with 12&quot; &times; 12&quot; tiles:
              </p>
              <p className="text-sm text-gray-600 mt-1">
                200 / 1 = 200 tiles
              </p>
              <p className="text-sm text-gray-600 mt-1">
                With 10% waste: <strong>220 tiles</strong>
              </p>
            </div>
          </div>
          <div className="not-prose mt-4">
            <Link
              href="/calculators/other/tile-calculator"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              Try our Tile Calculator &rarr;
            </Link>
          </div>
        </section>

        {/* Paint */}
        <section id="paint" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Paint Coverage
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            Gallons Needed = Total Wall Area / Coverage per Gallon
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Coverage Rates:</h4>
              <ul className="text-gray-600 space-y-1 mt-2">
                <li><strong>Interior paint</strong>: ~350 sq ft per gallon</li>
                <li><strong>Exterior paint</strong>: ~300 sq ft per gallon</li>
                <li><strong>Primer</strong>: ~300 sq ft per gallon</li>
                <li><strong>Most projects</strong>: 2 coats recommended</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-gray-700">Example:</h4>
              <p className="text-sm text-gray-600 mt-2">
                Room: 12ft &times; 14ft, 8ft ceilings, 2 coats:
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Wall area: 2(12 + 14) &times; 8 = 416 sq ft
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Minus doors/windows: ~380 sq ft
              </p>
              <p className="text-sm text-gray-600 mt-1">
                2 coats: 760 sq ft / 350 = <strong>2.2 gallons</strong>
              </p>
            </div>
          </div>
          <div className="not-prose mt-4">
            <Link
              href="/calculators/other/paint-calculator"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              Try our Paint Calculator &rarr;
            </Link>
          </div>
        </section>

        {/* Roofing */}
        <section id="roofing" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Roofing Materials
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            Squares Needed = Roof Area (sq ft) / 100
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700">Key Facts:</h4>
              <ul className="text-gray-600 space-y-1 mt-2">
                <li><strong>1 roofing square</strong> = 100 sq ft</li>
                <li><strong>3 bundles</strong> = 1 square (standard shingles)</li>
                <li>Add 10-15% for waste, hips, and valleys</li>
                <li>Steeper roofs need more material</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-gray-700">Pitch Multiplier:</h4>
              <ul className="text-sm text-gray-600 mt-2 space-y-1">
                <li>4/12 pitch: multiply area by 1.054</li>
                <li>6/12 pitch: multiply area by 1.118</li>
                <li>8/12 pitch: multiply area by 1.202</li>
                <li>10/12 pitch: multiply area by 1.302</li>
                <li>12/12 pitch: multiply area by 1.414</li>
              </ul>
            </div>
          </div>
          <div className="not-prose mt-4">
            <Link
              href="/calculators/other/roofing-calculator"
              className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm"
            >
              Try our Roofing Calculator &rarr;
            </Link>
          </div>
        </section>

        {/* Lumber */}
        <section id="lumber" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Lumber &amp; Board Feet
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            Board Feet = (Thickness &times; Width &times; Length) / 144
          </div>
          <p className="text-gray-600 mb-4">
            All measurements in inches. One board foot equals a piece of wood 12 inches
            long, 12 inches wide, and 1 inch thick (144 cubic inches).
          </p>
          <div className="bg-white p-4 rounded border mb-4">
            <h4 className="font-semibold text-gray-700">Common Nominal vs Actual Sizes:</h4>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-3 py-2 text-left">Nominal</th>
                    <th className="border px-3 py-2 text-left">Actual</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-3 py-2">2 &times; 4</td><td className="border px-3 py-2">1.5&quot; &times; 3.5&quot;</td></tr>
                  <tr><td className="border px-3 py-2">2 &times; 6</td><td className="border px-3 py-2">1.5&quot; &times; 5.5&quot;</td></tr>
                  <tr><td className="border px-3 py-2">2 &times; 8</td><td className="border px-3 py-2">1.5&quot; &times; 7.25&quot;</td></tr>
                  <tr><td className="border px-3 py-2">2 &times; 10</td><td className="border px-3 py-2">1.5&quot; &times; 9.25&quot;</td></tr>
                  <tr><td className="border px-3 py-2">2 &times; 12</td><td className="border px-3 py-2">1.5&quot; &times; 11.25&quot;</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Area & Volume */}
        <section id="area-volume" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Area &amp; Volume Quick Reference
          </h2>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-3 py-2 text-left">Shape</th>
                  <th className="border px-3 py-2 text-left">Area Formula</th>
                  <th className="border px-3 py-2 text-left">Volume Formula</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-3 py-2">Rectangle</td>
                  <td className="border px-3 py-2">L &times; W</td>
                  <td className="border px-3 py-2">L &times; W &times; H</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Triangle</td>
                  <td className="border px-3 py-2">&frac12; &times; B &times; H</td>
                  <td className="border px-3 py-2">&mdash;</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Circle</td>
                  <td className="border px-3 py-2">&pi; &times; r&sup2;</td>
                  <td className="border px-3 py-2">&mdash;</td>
                </tr>
                <tr>
                  <td className="border px-3 py-2">Cylinder</td>
                  <td className="border px-3 py-2">&pi; &times; r&sup2; (end)</td>
                  <td className="border px-3 py-2">&pi; &times; r&sup2; &times; H</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Ad unit */}
        <div className="not-prose mt-8 print:hidden">
          <AdUnit />
        </div>

        {/* Related Calculators */}
        <section className="not-prose border-t pt-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Related Calculators
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Concrete Calculator", slug: "concrete-calculator", icon: "🏗️" },
              { name: "Tile Calculator", slug: "tile-calculator", icon: "🔲" },
              { name: "Paint Calculator", slug: "paint-calculator", icon: "🎨" },
              { name: "Roofing Calculator", slug: "roofing-calculator", icon: "🏠" },
            ].map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/other/${calc.slug}`}
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
