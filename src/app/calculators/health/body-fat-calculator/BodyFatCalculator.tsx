"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("body-fat-calculator")!;

export default function BodyFatCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [waist, setWaist] = useState("");
  const [neck, setNeck] = useState("");
  const [hip, setHip] = useState(""); // Only for females

  const [result, setResult] = useState<{
    bodyFatPercentage: number;
    category: string;
    fatMass: number;
    leanMass: number;
  } | null>(null);

  const calculate = () => {
    let heightCmNum: number;
    let waistCm: number;
    let neckCm: number;
    let hipCm: number = 0;
    let weightKg: number;

    if (unit === "imperial") {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;
      heightCmNum = totalInches * 2.54;
      waistCm = parseFloat(waist) * 2.54;
      neckCm = parseFloat(neck) * 2.54;
      if (gender === "female") {
        hipCm = parseFloat(hip) * 2.54;
      }
      weightKg = parseFloat(weight) * 0.453592;
    } else {
      heightCmNum = parseFloat(heightCm);
      waistCm = parseFloat(waist);
      neckCm = parseFloat(neck);
      if (gender === "female") {
        hipCm = parseFloat(hip);
      }
      weightKg = parseFloat(weight);
    }

    if (isNaN(heightCmNum) || isNaN(waistCm) || isNaN(neckCm) || isNaN(weightKg)) {
      return;
    }

    if (gender === "female" && isNaN(hipCm)) {
      return;
    }

    // US Navy Method
    let bodyFatPercentage: number;
    if (gender === "male") {
      bodyFatPercentage =
        495 /
          (1.0324 -
            0.19077 * Math.log10(waistCm - neckCm) +
            0.15456 * Math.log10(heightCmNum)) -
        450;
    } else {
      bodyFatPercentage =
        495 /
          (1.29579 -
            0.35004 * Math.log10(waistCm + hipCm - neckCm) +
            0.221 * Math.log10(heightCmNum)) -
        450;
    }

    // Ensure reasonable range
    bodyFatPercentage = Math.max(2, Math.min(60, bodyFatPercentage));

    // Determine category
    let category: string;
    if (gender === "male") {
      if (bodyFatPercentage < 6) category = "Essential Fat";
      else if (bodyFatPercentage < 14) category = "Athletes";
      else if (bodyFatPercentage < 18) category = "Fitness";
      else if (bodyFatPercentage < 25) category = "Average";
      else category = "Obese";
    } else {
      if (bodyFatPercentage < 14) category = "Essential Fat";
      else if (bodyFatPercentage < 21) category = "Athletes";
      else if (bodyFatPercentage < 25) category = "Fitness";
      else if (bodyFatPercentage < 32) category = "Average";
      else category = "Obese";
    }

    const fatMass = weightKg * (bodyFatPercentage / 100);
    const leanMass = weightKg - fatMass;

    setResult({
      bodyFatPercentage,
      category,
      fatMass: unit === "imperial" ? fatMass / 0.453592 : fatMass,
      leanMass: unit === "imperial" ? leanMass / 0.453592 : leanMass,
    });
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "Essential Fat":
        return "text-blue-600";
      case "Athletes":
        return "text-green-600";
      case "Fitness":
        return "text-green-500";
      case "Average":
        return "text-yellow-600";
      case "Obese":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="US Navy Method - Male: Body Fat % = 495 / (1.0324 - 0.19077 × log10(waist - neck) + 0.15456 × log10(height)) - 450; Female: Body Fat % = 495 / (1.29579 - 0.35004 × log10(waist + hip - neck) + 0.221 × log10(height)) - 450"
      faqs={[
        {
          question: "How accurate is the Navy body fat method?",
          answer: "The US Navy method is fairly accurate with a margin of error of ±3-4% when measurements are taken correctly. It's less accurate than DEXA scans or hydrostatic weighing but more accessible and consistent than calipers for most people."
        },
        {
          question: "What is a healthy body fat percentage?",
          answer: "For men: 14-17% is fitness level, 18-24% is average, 25%+ is obese. For women: 21-24% is fitness level, 25-31% is average, 32%+ is obese. Athletes typically have 6-13% (men) or 14-20% (women). Essential fat is 2-5% for men and 10-13% for women."
        },
        {
          question: "Why do I need to measure neck, waist, and hip?",
          answer: "The Navy method uses these circumference measurements as proxies for body composition. Waist measurement indicates abdominal fat, neck indicates lean mass, and hip (for women) accounts for gynoid fat distribution. These measurements correlate well with actual body fat percentage."
        },
        {
          question: "How should I take my measurements?",
          answer: "Measure in the morning before eating. Use a flexible fabric tape measure. Neck: just below the larynx. Waist: at navel level, not the narrowest point. Hip (women): at the widest point of buttocks. Keep tape snug but not tight, parallel to the floor."
        }
      ]}
      howTo={[
        "Select your measurement unit system (US inches/lbs or Metric cm/kg)",
        "Choose your biological gender",
        "Enter your age and current weight",
        "Input your height",
        "Measure and enter your neck circumference (just below Adam's apple)",
        "Measure and enter your waist circumference (at belly button level)",
        "If female, also measure and enter hip circumference (at widest point)",
        "Click 'Calculate Body Fat' to see your percentage and category",
        "Review your fat mass and lean mass breakdown"
      ]}
    >
      <div className="max-w-lg mx-auto">
        {/* Unit toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setUnit("imperial")}
            className={`calc-btn flex-1 ${
              unit === "imperial" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            US Units (in, lbs)
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={`calc-btn flex-1 ${
              unit === "metric" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Metric (cm, kg)
          </button>
        </div>

        {/* Input form */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as "male" | "female")}
                className="calc-input"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="calc-input"
                placeholder="Years"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight ({unit === "imperial" ? "lbs" : "kg"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="calc-input"
            />
          </div>

          {unit === "imperial" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  className="calc-input flex-1"
                  placeholder="Feet"
                />
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  className="calc-input flex-1"
                  placeholder="Inches"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="calc-input"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Neck ({unit === "imperial" ? "inches" : "cm"})
              </label>
              <input
                type="number"
                step="0.1"
                value={neck}
                onChange={(e) => setNeck(e.target.value)}
                className="calc-input"
                placeholder="Circumference"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Waist ({unit === "imperial" ? "inches" : "cm"})
              </label>
              <input
                type="number"
                step="0.1"
                value={waist}
                onChange={(e) => setWaist(e.target.value)}
                className="calc-input"
                placeholder="At navel"
              />
            </div>
          </div>

          {gender === "female" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hip ({unit === "imperial" ? "inches" : "cm"})
              </label>
              <input
                type="number"
                step="0.1"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                className="calc-input"
                placeholder="At widest point"
              />
            </div>
          )}
        </div>

        <button
          onClick={calculate}
          className="calc-btn calc-btn-primary w-full mb-6"
        >
          Calculate Body Fat
        </button>

        {/* Results */}
        {result && (
          <>
            <div className="result-box text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">Body Fat Percentage</div>
              <div className={`text-4xl font-bold ${getCategoryColor(result.category)}`}>
                {result.bodyFatPercentage.toFixed(1)}%
              </div>
              <div className={`text-lg ${getCategoryColor(result.category)}`}>
                {result.category}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="border rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Fat Mass</div>
                <div className="text-xl font-bold text-red-600">
                  {result.fatMass.toFixed(1)} {unit === "imperial" ? "lbs" : "kg"}
                </div>
              </div>
              <div className="border rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Lean Mass</div>
                <div className="text-xl font-bold text-green-600">
                  {result.leanMass.toFixed(1)} {unit === "imperial" ? "lbs" : "kg"}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Categories reference */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">
            Body Fat Categories ({gender === "male" ? "Men" : "Women"})
          </h3>
          <table className="w-full">
            <tbody>
              {gender === "male" ? (
                <>
                  <tr className="border-b">
                    <td className="py-1 text-blue-600">Essential Fat</td>
                    <td className="text-right">2-5%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 text-green-600">Athletes</td>
                    <td className="text-right">6-13%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 text-green-500">Fitness</td>
                    <td className="text-right">14-17%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 text-yellow-600">Average</td>
                    <td className="text-right">18-24%</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-red-600">Obese</td>
                    <td className="text-right">25%+</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr className="border-b">
                    <td className="py-1 text-blue-600">Essential Fat</td>
                    <td className="text-right">10-13%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 text-green-600">Athletes</td>
                    <td className="text-right">14-20%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 text-green-500">Fitness</td>
                    <td className="text-right">21-24%</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 text-yellow-600">Average</td>
                    <td className="text-right">25-31%</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-red-600">Obese</td>
                    <td className="text-right">32%+</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        {/* Measurement instructions */}
        <div className="text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">How to Measure</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Neck:</strong> Just below the larynx (Adam's apple)</li>
            <li><strong>Waist:</strong> At navel level (belly button)</li>
            {gender === "female" && (
              <li><strong>Hip:</strong> At the widest point of the buttocks</li>
            )}
            <li>Use a flexible tape measure</li>
            <li>Measure in the morning before eating</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
