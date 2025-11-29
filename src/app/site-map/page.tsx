import { Metadata } from "next";
import Link from "next/link";
import { calculators, categories } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Sitemap - Calculator Lab",
  description: "Browse all calculators available on Calculator Lab. Find math, financial, health, and other calculators.",
};

export default function SitemapPage() {
  const calculatorsByCategory = categories.map((category) => ({
    ...category,
    calculators: calculators.filter((calc) => calc.category === category.id),
  }));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">Sitemap</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">Sitemap</h1>
      <p className="text-gray-600 mb-8">
        Browse all {calculators.length}+ calculators available on Calculator Lab.
      </p>

      {/* Main Pages */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
          Main Pages
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <li>
            <Link href="/" className="text-blue-600 hover:underline">Home</Link>
          </li>
          <li>
            <Link href="/about" className="text-blue-600 hover:underline">About</Link>
          </li>
          <li>
            <Link href="/contact" className="text-blue-600 hover:underline">Contact</Link>
          </li>
          <li>
            <Link href="/search" className="text-blue-600 hover:underline">Search</Link>
          </li>
          <li>
            <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms" className="text-blue-600 hover:underline">Terms of Use</Link>
          </li>
        </ul>
      </section>

      {/* Calculators by Category */}
      {calculatorsByCategory.map((category) => (
        <section key={category.id} className="mb-10">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
            <span>{category.icon}</span>
            <Link
              href={`/calculators/${category.id}`}
              className="hover:text-blue-600"
            >
              {category.name}
            </Link>
            <span className="text-sm font-normal text-gray-500">
              ({category.calculators.length} calculators)
            </span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {category.calculators.map((calc) => (
              <li key={calc.slug}>
                <Link
                  href={`/calculators/${calc.category}/${calc.slug}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {calc.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Stats */}
      <section className="bg-gray-50 rounded-lg p-6 mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Calculator Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{calculators.length}</div>
            <div className="text-sm text-gray-600">Total Calculators</div>
          </div>
          {calculatorsByCategory.map((category) => (
            <div key={category.id} className="text-center">
              <div className="text-3xl font-bold text-gray-700">{category.calculators.length}</div>
              <div className="text-sm text-gray-600">{category.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
