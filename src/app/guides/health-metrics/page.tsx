import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Health Metrics Explained - BMI, Body Fat, Calories & More",
  description:
    "Complete guide to understanding health metrics: BMI, body fat percentage, BMR, calorie needs, heart rate zones, and more. Learn what the numbers mean.",
  openGraph: {
    title: "Health Metrics Explained - Complete Guide",
    description:
      "Understanding BMI, body fat, calories, and other health measurements.",
    url: "https://calculatorlab.org/guides/health-metrics",
  },
};

export default function HealthMetricsPage() {
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
        <span className="text-gray-800">Health Metrics</span>
      </nav>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Health Metrics Explained
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Understanding what health numbers mean and how to interpret them.
          This guide covers the most common health metrics and their implications.
        </p>

        <div className="not-prose bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-800 text-sm">
            <strong>Disclaimer:</strong> This guide is for educational purposes only.
            Always consult healthcare professionals for personalized medical advice.
            These metrics are screening tools, not diagnostic instruments.
          </p>
        </div>

        <div className="not-prose bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <strong className="text-blue-800">Quick Navigation:</strong>
          <div className="flex flex-wrap gap-2 mt-2">
            <a href="#bmi" className="text-blue-600 hover:underline text-sm">BMI</a>
            <span className="text-gray-400">•</span>
            <a href="#body-fat" className="text-blue-600 hover:underline text-sm">Body Fat</a>
            <span className="text-gray-400">•</span>
            <a href="#bmr" className="text-blue-600 hover:underline text-sm">BMR & TDEE</a>
            <span className="text-gray-400">•</span>
            <a href="#heart-rate" className="text-blue-600 hover:underline text-sm">Heart Rate</a>
            <span className="text-gray-400">•</span>
            <a href="#blood-pressure" className="text-blue-600 hover:underline text-sm">Blood Pressure</a>
            <span className="text-gray-400">•</span>
            <a href="#waist" className="text-blue-600 hover:underline text-sm">Waist Measurements</a>
          </div>
        </div>

        {/* BMI */}
        <section id="bmi" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Body Mass Index (BMI)
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Formula</h3>
          <div className="bg-gray-100 p-4 rounded-lg space-y-2">
            <p><strong>Metric:</strong> BMI = weight (kg) / height (m)²</p>
            <p><strong>Imperial:</strong> BMI = [weight (lb) / height (in)²] × 703</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">BMI Categories (Adults)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">BMI Range</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
                  <th className="border border-gray-300 px-4 py-2">Health Risk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 text-center">&lt; 18.5</td>
                  <td className="border border-gray-300 px-4 py-2">Underweight</td>
                  <td className="border border-gray-300 px-4 py-2">Increased</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">18.5 - 24.9</td>
                  <td className="border border-gray-300 px-4 py-2">Normal weight</td>
                  <td className="border border-gray-300 px-4 py-2">Lowest</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">25.0 - 29.9</td>
                  <td className="border border-gray-300 px-4 py-2">Overweight</td>
                  <td className="border border-gray-300 px-4 py-2">Increased</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">30.0 - 34.9</td>
                  <td className="border border-gray-300 px-4 py-2">Obesity Class I</td>
                  <td className="border border-gray-300 px-4 py-2">High</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border border-gray-300 px-4 py-2 text-center">35.0 - 39.9</td>
                  <td className="border border-gray-300 px-4 py-2">Obesity Class II</td>
                  <td className="border border-gray-300 px-4 py-2">Very High</td>
                </tr>
                <tr className="bg-red-100">
                  <td className="border border-gray-300 px-4 py-2 text-center">≥ 40.0</td>
                  <td className="border border-gray-300 px-4 py-2">Obesity Class III</td>
                  <td className="border border-gray-300 px-4 py-2">Extremely High</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Limitations of BMI</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Does not distinguish between muscle and fat mass</li>
            <li>• May overestimate body fat in athletes</li>
            <li>• May underestimate body fat in elderly or sedentary people</li>
            <li>• Does not account for fat distribution</li>
            <li>• Cutoffs may vary by ethnicity</li>
          </ul>

          <p className="text-sm text-gray-500 mt-4">
            <Link href="/calculators/health/bmi-calculator" className="text-blue-600 hover:underline">
              Calculate your BMI →
            </Link>
          </p>
        </section>

        {/* Body Fat */}
        <section id="body-fat" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Body Fat Percentage
          </h2>

          <p className="text-gray-600 mb-4">
            Body fat percentage measures the proportion of your total body weight that is fat tissue.
            It&apos;s a more accurate indicator of body composition than BMI alone.
          </p>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Body Fat Categories</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Men</h4>
              <table className="w-full border border-gray-300 text-sm">
                <tbody>
                  <tr><td className="border px-3 py-2">Essential fat</td><td className="border px-3 py-2 text-center">2-5%</td></tr>
                  <tr className="bg-blue-50"><td className="border px-3 py-2">Athletes</td><td className="border px-3 py-2 text-center">6-13%</td></tr>
                  <tr className="bg-green-50"><td className="border px-3 py-2">Fitness</td><td className="border px-3 py-2 text-center">14-17%</td></tr>
                  <tr><td className="border px-3 py-2">Average</td><td className="border px-3 py-2 text-center">18-24%</td></tr>
                  <tr className="bg-yellow-50"><td className="border px-3 py-2">Obese</td><td className="border px-3 py-2 text-center">25%+</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Women</h4>
              <table className="w-full border border-gray-300 text-sm">
                <tbody>
                  <tr><td className="border px-3 py-2">Essential fat</td><td className="border px-3 py-2 text-center">10-13%</td></tr>
                  <tr className="bg-blue-50"><td className="border px-3 py-2">Athletes</td><td className="border px-3 py-2 text-center">14-20%</td></tr>
                  <tr className="bg-green-50"><td className="border px-3 py-2">Fitness</td><td className="border px-3 py-2 text-center">21-24%</td></tr>
                  <tr><td className="border px-3 py-2">Average</td><td className="border px-3 py-2 text-center">25-31%</td></tr>
                  <tr className="bg-yellow-50"><td className="border px-3 py-2">Obese</td><td className="border px-3 py-2 text-center">32%+</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Measurement Methods</h3>
          <ul className="text-gray-600 space-y-2">
            <li><strong>Skinfold calipers:</strong> Pinches skin at multiple sites; 3-4% error margin</li>
            <li><strong>Bioelectrical impedance:</strong> Sends current through body; affected by hydration</li>
            <li><strong>DEXA scan:</strong> X-ray technology; most accurate but expensive</li>
            <li><strong>Hydrostatic weighing:</strong> Underwater; very accurate but inconvenient</li>
          </ul>

          <p className="text-sm text-gray-500 mt-4">
            <Link href="/calculators/health/body-fat-calculator" className="text-blue-600 hover:underline">
              Estimate your body fat percentage →
            </Link>
          </p>
        </section>

        {/* BMR & TDEE */}
        <section id="bmr" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            BMR & TDEE (Calorie Needs)
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Basal Metabolic Rate (BMR)</h3>
          <p className="text-gray-600 mb-4">
            BMR is the number of calories your body burns at rest to maintain basic functions
            like breathing, circulation, and cell production.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p className="font-semibold mb-2">Mifflin-St Jeor Equation (most accurate):</p>
            <p><strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</p>
            <p><strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Total Daily Energy Expenditure (TDEE)</h3>
          <p className="text-gray-600 mb-4">
            TDEE is your total daily calorie needs, including physical activity.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg font-mono text-center mb-4">
            TDEE = BMR × Activity Multiplier
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Activity Level</th>
                  <th className="border border-gray-300 px-4 py-2">Multiplier</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="border px-4 py-2">Sedentary</td><td className="border px-4 py-2 text-center">1.2</td><td className="border px-4 py-2">Little or no exercise</td></tr>
                <tr><td className="border px-4 py-2">Lightly active</td><td className="border px-4 py-2 text-center">1.375</td><td className="border px-4 py-2">Light exercise 1-3 days/week</td></tr>
                <tr><td className="border px-4 py-2">Moderately active</td><td className="border px-4 py-2 text-center">1.55</td><td className="border px-4 py-2">Moderate exercise 3-5 days/week</td></tr>
                <tr><td className="border px-4 py-2">Very active</td><td className="border px-4 py-2 text-center">1.725</td><td className="border px-4 py-2">Hard exercise 6-7 days/week</td></tr>
                <tr><td className="border px-4 py-2">Extra active</td><td className="border px-4 py-2 text-center">1.9</td><td className="border px-4 py-2">Very hard exercise, physical job</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Weight Management</h3>
          <ul className="text-gray-600 space-y-2">
            <li><strong>Maintain weight:</strong> Eat at TDEE</li>
            <li><strong>Lose weight:</strong> Eat 500-750 calories below TDEE (1-1.5 lbs/week loss)</li>
            <li><strong>Gain weight:</strong> Eat 300-500 calories above TDEE</li>
          </ul>

          <p className="text-sm text-gray-500 mt-4">
            <Link href="/calculators/health/calorie-calculator" className="text-blue-600 hover:underline">
              Calculate your daily calorie needs →
            </Link>
          </p>
        </section>

        {/* Heart Rate */}
        <section id="heart-rate" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Heart Rate Zones
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Maximum Heart Rate</h3>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p><strong>Simple formula:</strong> Max HR = 220 - age</p>
            <p className="text-sm text-gray-600 mt-1">(More accurate: 208 - 0.7 × age)</p>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Training Zones (% of Max HR)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Zone</th>
                  <th className="border border-gray-300 px-4 py-2">% Max HR</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Benefit</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-gray-50"><td className="border px-4 py-2 text-center">Zone 1 (Recovery)</td><td className="border px-4 py-2 text-center">50-60%</td><td className="border px-4 py-2">Active recovery, warm-up</td></tr>
                <tr className="bg-blue-50"><td className="border px-4 py-2 text-center">Zone 2 (Fat Burn)</td><td className="border px-4 py-2 text-center">60-70%</td><td className="border px-4 py-2">Fat burning, endurance base</td></tr>
                <tr className="bg-green-50"><td className="border px-4 py-2 text-center">Zone 3 (Aerobic)</td><td className="border px-4 py-2 text-center">70-80%</td><td className="border px-4 py-2">Cardiovascular fitness</td></tr>
                <tr className="bg-yellow-50"><td className="border px-4 py-2 text-center">Zone 4 (Threshold)</td><td className="border px-4 py-2 text-center">80-90%</td><td className="border px-4 py-2">Lactate threshold, speed</td></tr>
                <tr className="bg-red-50"><td className="border px-4 py-2 text-center">Zone 5 (Maximum)</td><td className="border px-4 py-2 text-center">90-100%</td><td className="border px-4 py-2">Maximum effort, anaerobic</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Resting Heart Rate</h3>
          <ul className="text-gray-600 space-y-1">
            <li><strong>Normal:</strong> 60-100 bpm</li>
            <li><strong>Athletes:</strong> 40-60 bpm</li>
            <li><strong>Lower is generally better</strong> (indicates cardiovascular fitness)</li>
          </ul>
        </section>

        {/* Blood Pressure */}
        <section id="blood-pressure" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Blood Pressure
          </h2>

          <p className="text-gray-600 mb-4">
            Blood pressure is measured in mmHg with two numbers: systolic (pressure during heartbeat)
            over diastolic (pressure between beats).
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
                  <th className="border border-gray-300 px-4 py-2">Systolic</th>
                  <th className="border border-gray-300 px-4 py-2"></th>
                  <th className="border border-gray-300 px-4 py-2">Diastolic</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-green-50">
                  <td className="border px-4 py-2">Normal</td>
                  <td className="border px-4 py-2 text-center">&lt; 120</td>
                  <td className="border px-4 py-2 text-center">and</td>
                  <td className="border px-4 py-2 text-center">&lt; 80</td>
                </tr>
                <tr className="bg-yellow-50">
                  <td className="border px-4 py-2">Elevated</td>
                  <td className="border px-4 py-2 text-center">120-129</td>
                  <td className="border px-4 py-2 text-center">and</td>
                  <td className="border px-4 py-2 text-center">&lt; 80</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border px-4 py-2">High BP Stage 1</td>
                  <td className="border px-4 py-2 text-center">130-139</td>
                  <td className="border px-4 py-2 text-center">or</td>
                  <td className="border px-4 py-2 text-center">80-89</td>
                </tr>
                <tr className="bg-red-50">
                  <td className="border px-4 py-2">High BP Stage 2</td>
                  <td className="border px-4 py-2 text-center">≥ 140</td>
                  <td className="border px-4 py-2 text-center">or</td>
                  <td className="border px-4 py-2 text-center">≥ 90</td>
                </tr>
                <tr className="bg-red-100">
                  <td className="border px-4 py-2">Hypertensive Crisis</td>
                  <td className="border px-4 py-2 text-center">&gt; 180</td>
                  <td className="border px-4 py-2 text-center">and/or</td>
                  <td className="border px-4 py-2 text-center">&gt; 120</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Waist */}
        <section id="waist" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2 mb-4">
            Waist Measurements
          </h2>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Waist Circumference</h3>
          <p className="text-gray-600 mb-4">
            Waist circumference is a simple measure of abdominal fat, which is particularly
            associated with health risks.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Men - Increased Risk</h4>
              <p className="text-gray-600">&gt; 40 inches (102 cm)</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="font-semibold">Women - Increased Risk</h4>
              <p className="text-gray-600">&gt; 35 inches (88 cm)</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">Waist-to-Hip Ratio</h3>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <p><strong>Formula:</strong> WHR = Waist circumference / Hip circumference</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Men</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>&lt; 0.90: Low risk</li>
                <li>0.90 - 0.99: Moderate risk</li>
                <li>≥ 1.00: High risk</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">Women</h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>&lt; 0.80: Low risk</li>
                <li>0.80 - 0.85: Moderate risk</li>
                <li>≥ 0.86: High risk</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="mb-12 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Key Takeaways
          </h2>
          <ul className="text-gray-600 space-y-2">
            <li>• No single metric tells the complete health story—use multiple measurements</li>
            <li>• Trends over time are more meaningful than single measurements</li>
            <li>• Context matters—age, ethnicity, fitness level all affect interpretation</li>
            <li>• These are screening tools—abnormal results warrant professional evaluation</li>
            <li>• Focus on what you can control: diet, exercise, sleep, stress management</li>
          </ul>
        </section>
      </article>

      {/* Related Calculators */}
      <section className="mt-12 border-t pt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Related Calculators
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/calculators/health/bmi-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">⚖️</span>
            <span className="block text-sm text-gray-700 mt-2">BMI</span>
          </Link>
          <Link href="/calculators/health/body-fat-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">📊</span>
            <span className="block text-sm text-gray-700 mt-2">Body Fat</span>
          </Link>
          <Link href="/calculators/health/calorie-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">🔥</span>
            <span className="block text-sm text-gray-700 mt-2">Calories</span>
          </Link>
          <Link href="/calculators/health/ideal-weight-calculator" className="text-center p-4 border rounded hover:shadow-md transition-shadow">
            <span className="text-2xl">🎯</span>
            <span className="block text-sm text-gray-700 mt-2">Ideal Weight</span>
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
