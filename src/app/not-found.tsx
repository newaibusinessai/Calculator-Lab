import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - Calculator Lab",
  description: "The page you're looking for doesn't exist. Browse our free online calculators for math, finance, health, and more.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the page you're looking for.
        It may have been moved or doesn't exist.
      </p>

      <div className="space-y-4">
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Homepage
        </Link>

        <div className="pt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Popular Calculators
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/math/percentage-calculator"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 text-sm"
            >
              Percentage Calculator
            </Link>
            <Link
              href="/calculators/financial/mortgage-calculator"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 text-sm"
            >
              Mortgage Calculator
            </Link>
            <Link
              href="/calculators/health/bmi-calculator"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 text-sm"
            >
              BMI Calculator
            </Link>
            <Link
              href="/calculators/other/age-calculator"
              className="px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 text-sm"
            >
              Age Calculator
            </Link>
          </div>
        </div>

        <div className="pt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Browse by Category
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/calculators/math"
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
            >
              📐 Math
            </Link>
            <Link
              href="/calculators/financial"
              className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200"
            >
              💰 Financial
            </Link>
            <Link
              href="/calculators/health"
              className="px-4 py-2 bg-red-100 text-red-800 rounded-full hover:bg-red-200"
            >
              ❤️ Health
            </Link>
            <Link
              href="/calculators/other"
              className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200"
            >
              🔧 Other
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
