import Link from "next/link";
import { calculators, categories } from "@/lib/calculators";
import HomeCalculator from "@/components/HomeCalculator";
import { OrganizationSchema, WebsiteSchema } from "@/components/CalculatorSchema";
import { ResponsiveAdUnit } from "@/components/AdUnit";

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <WebsiteSchema />
      <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Calculator section */}
      <div className="mb-8">
        <HomeCalculator />
      </div>

      {/* Category boxes - 4 columns side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => {
          const categoryCalculators = calculators.filter(
            (calc) => calc.category === category.id
          );

          return (
            <div
              key={category.id}
              className="border border-gray-200 rounded bg-white"
            >
              {/* Category header */}
              <div className="border-b border-gray-200 p-3">
                <Link
                  href={`/calculators/${category.id}`}
                  className="font-bold text-sm flex items-center gap-2"
                  style={{ color: "#15803d" }}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              </div>

              {/* Calculator links - stacked vertically */}
              <div className="p-2">
                <ul className="space-y-1">
                  {categoryCalculators.map((calc) => (
                    <li key={calc.slug}>
                      <Link
                        href={`/calculators/${calc.category}/${calc.slug}`}
                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline py-1 px-2 rounded hover:bg-gray-50"
                      >
                        {calc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ad banner */}
      <div className="mb-8 flex justify-center print:hidden">
        <ResponsiveAdUnit />
      </div>

      {/* Info section at the bottom */}
      <section className="bg-gray-50 rounded-lg p-5 text-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Free Online Calculators
        </h2>
        <p className="text-gray-600 mb-3">
          Calculator Lab provides free online calculators for math, finance, fitness,
          health, and more. Fast, comprehensive, and convenient - our
          calculators help you make quick calculations for everyday needs.
        </p>
        <p className="text-gray-600 mb-3">
          We have <strong>{calculators.length}+ calculators</strong> covering various
          categories including financial calculators (mortgage, loan, interest),
          health calculators (BMI, calorie, body fat), math calculators
          (scientific, percentage, fraction), and other useful tools (age, date,
          unit converter).
        </p>
        <p className="text-gray-600">
          All our calculators are completely free, require no registration, and
          work seamlessly on desktop, tablet, and mobile devices. Bookmark your
          favorite calculators for quick access anytime!
        </p>
      </section>
      </div>
    </>
  );
}
