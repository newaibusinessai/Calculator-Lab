import Link from "next/link";
import { Metadata } from "next";
import { getCalculatorsByCategory } from "@/lib/calculators";
import { ResponsiveAdUnit } from "@/components/AdUnit";
import { FAQSchema, BreadcrumbSchema } from "@/components/CalculatorSchema";

export const metadata: Metadata = {
  title: "Health & Fitness Calculators - BMI, Calorie, TDEE Tools | Calculator Lab",
  description:
    "Free online health calculators: BMI calculator, calorie calculator, TDEE calculator, BMR calculator, body fat calculator, ideal weight, macro calculator, and more fitness tools.",
  keywords: [
    "BMI calculator",
    "calorie calculator",
    "TDEE calculator",
    "BMR calculator",
    "body fat calculator",
    "ideal weight calculator",
    "macro calculator",
    "protein calculator",
    "pregnancy due date calculator",
    "ovulation calculator",
    "heart rate zone calculator",
    "pace calculator",
    "hydration calculator",
  ],
  openGraph: {
    title: "Health & Fitness Calculators - BMI, Calorie, TDEE Tools | Calculator Lab",
    description: "Free online health and fitness calculators for BMI, calories, macros, body composition, and more. Start your wellness journey today.",
    url: "https://calculatorlab.org/calculators/health",
  },
};

export default function HealthCalculatorsPage() {
  const calculators = getCalculatorsByCategory("health");

  const popularCalculators = [
    "bmi-calculator",
    "calorie-calculator",
    "body-fat-calculator",
    "bmr-calculator",
    "ideal-weight-calculator",
    "tdee-calculator",
  ];

  const popular = calculators.filter(c => popularCalculators.includes(c.slug));
  const others = calculators.filter(c => !popularCalculators.includes(c.slug));

  const faqs = [
    {
      question: "What is BMI and how is it calculated?",
      answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated as weight (kg) divided by height (m) squared. Use our BMI calculator to find your BMI and see which category you fall into (underweight, normal, overweight, or obese)."
    },
    {
      question: "What's the difference between BMR and TDEE?",
      answer: "BMR (Basal Metabolic Rate) is the calories your body burns at rest. TDEE (Total Daily Energy Expenditure) includes BMR plus calories burned through daily activities and exercise. Use our TDEE calculator for accurate daily calorie needs."
    },
    {
      question: "How many calories should I eat to lose weight?",
      answer: "To lose weight, create a calorie deficit by eating less than your TDEE. A safe deficit is 500-750 calories per day for 1-1.5 lbs of weight loss per week. Our calorie calculator can help you determine your specific needs based on your goals."
    },
    {
      question: "How accurate are these health calculators?",
      answer: "Our calculators use scientifically validated formulas like Mifflin-St Jeor for BMR and standard BMI formulas. Results are estimates based on population averages. For personalized health advice, consult a healthcare professional."
    }
  ];

  const breadcrumbItems = [
    { name: "Home", url: "https://calculatorlab.org" },
    { name: "Health & Fitness Calculators", url: "https://calculatorlab.org/calculators/health" }
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
          <span className="text-gray-800">Health & Fitness Calculators</span>
        </nav>

      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Free Online Health & Fitness Calculators
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Track your health metrics and fitness goals with our comprehensive calculators.
          From BMI and body composition to calorie needs and workout planning - all free and easy to use.
        </p>
      </div>

      {/* Popular Calculators */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-yellow-500">★</span> Most Popular Health Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popular.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/health/${calc.slug}`}
              className="block p-5 border-2 border-red-200 rounded-lg hover:border-red-400 hover:shadow-lg transition-all bg-gradient-to-br from-red-50 to-white"
            >
              <h3 className="font-semibold text-lg text-red-700 mb-2">
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

      {/* All Health Calculators */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          All Health & Fitness Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.map((calc) => (
            <Link
              key={calc.slug}
              href={`/calculators/health/${calc.slug}`}
              className="block p-4 border border-gray-200 rounded-lg hover:border-red-400 hover:shadow-md transition-all bg-white"
            >
              <h3 className="font-semibold text-red-700 mb-1">{calc.name}</h3>
              <p className="text-sm text-gray-600">{calc.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          About Our Health Calculators
        </h2>
        <div className="grid md:grid-cols-2 gap-6 text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Body Composition Tools</h3>
            <p className="text-sm mb-3">
              Start with our <Link href="/calculators/health/bmi-calculator" className="text-blue-600 hover:underline">BMI calculator</Link> to
              understand your body mass index. For a more complete picture, use the <Link href="/calculators/health/body-fat-calculator" className="text-blue-600 hover:underline">body fat calculator</Link> and
              <Link href="/calculators/health/ideal-weight-calculator" className="text-blue-600 hover:underline"> ideal weight calculator</Link>.
            </p>
            <h3 className="font-semibold text-gray-800 mb-2">Nutrition & Calories</h3>
            <p className="text-sm">
              Calculate your daily energy needs with our <Link href="/calculators/health/tdee-calculator" className="text-blue-600 hover:underline">TDEE calculator</Link>,
              or use the <Link href="/calculators/health/calorie-calculator" className="text-blue-600 hover:underline">calorie calculator</Link> to
              plan your diet for weight loss, maintenance, or muscle gain.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Calculator Categories</h3>
            <ul className="text-sm space-y-1">
              <li>• <strong>Body Metrics:</strong> BMI, body fat, lean mass, ideal weight</li>
              <li>• <strong>Calories:</strong> TDEE, BMR, calorie needs, deficit/surplus</li>
              <li>• <strong>Nutrition:</strong> Macros, protein, carbs, fat requirements</li>
              <li>• <strong>Fitness:</strong> Heart rate zones, VO2 max, pace calculator</li>
              <li>• <strong>Pregnancy:</strong> Due date, ovulation, conception date</li>
              <li>• <strong>Hydration:</strong> Daily water intake recommendations</li>
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
              What is BMI and how is it calculated?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated as weight (kg) divided by
              height (m) squared. Use our <Link href="/calculators/health/bmi-calculator" className="text-blue-600 hover:underline">BMI calculator</Link> to
              find your BMI and see which category you fall into (underweight, normal, overweight, or obese).
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              What's the difference between BMR and TDEE?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              BMR (Basal Metabolic Rate) is the calories your body burns at rest. TDEE (Total Daily Energy Expenditure)
              includes BMR plus calories burned through daily activities and exercise. Use our <Link href="/calculators/health/tdee-calculator" className="text-blue-600 hover:underline">TDEE calculator</Link> for
              accurate daily calorie needs.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              How many calories should I eat to lose weight?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              To lose weight, create a calorie deficit by eating less than your TDEE. A safe deficit is 500-750 calories
              per day for 1-1.5 lbs of weight loss per week. Our <Link href="/calculators/health/calorie-calculator" className="text-blue-600 hover:underline">calorie calculator</Link> can
              help you determine your specific needs based on your goals.
            </p>
          </details>
          <details className="bg-white border border-gray-200 rounded-lg p-4 group">
            <summary className="font-medium cursor-pointer flex justify-between items-center">
              How accurate are these health calculators?
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-gray-600 text-sm">
              Our calculators use scientifically validated formulas like Mifflin-St Jeor for BMR and standard BMI formulas.
              Results are estimates based on population averages. For personalized health advice, consult a healthcare professional.
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
          <Link href="/calculators/financial" className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors">
            💰 Financial Calculators
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
