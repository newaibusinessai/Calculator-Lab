import Link from "next/link";
import { calculators, categories } from "@/lib/calculators";
import HomeCalculator from "@/components/HomeCalculator";
import { OrganizationSchema, WebsiteSchema } from "@/components/CalculatorSchema";

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

      {/* Info section */}
      <section className="bg-gray-50 rounded-lg p-5 text-sm mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Free Online Calculators for Every Need
        </h2>
        <p className="text-gray-600 mb-3">
          Calculator Lab provides <strong>{calculators.length}+ free online calculators</strong> for
          math, finance, health, and everyday use. Every tool is designed to be
          fast, accurate, and easy to use, with no registration and no downloads
          required. Just open a calculator and get instant results.
        </p>
        <p className="text-gray-600 mb-3">
          Our calculators use industry-standard formulas and are regularly
          updated to reflect the latest data, including current tax rates,
          interest benchmarks, and health guidelines. Whether you are a student,
          professional, or simply someone who needs a quick answer, Calculator
          Lab has you covered.
        </p>
      </section>

      {/* Detailed category descriptions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Math Calculators</h3>
          <p className="text-gray-600">
            From basic arithmetic to advanced algebra, our math tools help
            students and professionals solve problems quickly. Use the scientific
            calculator for trigonometry and logarithms, the percentage calculator
            for discounts and tips, or the quadratic formula solver for algebra
            homework. We also offer statistics tools for mean, median, mode, and
            standard deviation, plus geometry calculators for area, volume, and
            perimeter.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Financial Calculators</h3>
          <p className="text-gray-600">
            Make informed financial decisions with our comprehensive suite of
            money tools. Calculate monthly mortgage payments, compare loan
            options, estimate compound interest growth, plan for retirement with
            401k and IRA calculators, or figure out your tax liability. Our
            financial calculators use standard amortization and present-value
            formulas trusted by financial professionals.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Health &amp; Fitness Calculators</h3>
          <p className="text-gray-600">
            Track your health and fitness goals with evidence-based tools.
            Calculate your BMI using the formula recognized by the WHO, find
            your daily calorie needs with our TDEE calculator, estimate body fat
            percentage, or plan your macros for specific dietary goals. We also
            offer pregnancy calculators, heart rate zone tools, and hydration
            calculators.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Everyday Utility Tools</h3>
          <p className="text-gray-600">
            Practical tools for daily life. Find your exact age in years, months,
            and days. Convert between units of length, weight, temperature, and
            volume. Calculate your GPA, estimate concrete or paint for a home
            project, or generate a secure password. These are the tools you
            reach for when you need a quick, reliable answer.
          </p>
        </div>
      </section>

      {/* Why Calculator Lab */}
      <section className="text-sm mb-4">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          Why Use Calculator Lab?
        </h2>
        <p className="text-gray-600 mb-3">
          There are many calculator websites on the internet, but Calculator Lab
          stands out by combining accuracy, speed, and simplicity. All
          calculations happen instantly in your browser. No data is sent to any
          server, so your inputs stay private. Every calculator works on desktop,
          tablet, and mobile with a responsive design that adapts to your
          screen.
        </p>
        <p className="text-gray-600 mb-3">
          Beyond just calculators, we publish{" "}
          <Link href="/blog" className="text-blue-600 hover:underline">educational guides and articles</Link>{" "}
          that explain the formulas and concepts behind the math. Our{" "}
          <Link href="/guides" className="text-blue-600 hover:underline">reference guides</Link>{" "}
          cover financial formulas, math reference sheets, health metrics,
          construction estimating, and statistics — all free to bookmark and
          use anytime.
        </p>
        <p className="text-gray-600">
          All our calculators are completely free, require no registration, and
          work seamlessly across devices. Bookmark your favorites for quick
          access anytime!
        </p>
      </section>
      </div>
    </>
  );
}
