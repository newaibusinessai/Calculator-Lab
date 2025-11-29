"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("calorie-calculator")!;

export default function CalorieCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [activityLevel, setActivityLevel] = useState("1.55");

  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    mildLoss: number;
    weightLoss: number;
    extremeLoss: number;
    mildGain: number;
    weightGain: number;
  } | null>(null);

  const activityLevels = [
    { value: "1.2", label: "Sedentary", desc: "Little or no exercise" },
    { value: "1.375", label: "Light", desc: "Exercise 1-3 days/week" },
    { value: "1.55", label: "Moderate", desc: "Exercise 3-5 days/week" },
    { value: "1.725", label: "Active", desc: "Exercise 6-7 days/week" },
    { value: "1.9", label: "Very Active", desc: "Hard exercise & physical job" },
  ];

  const calculate = () => {
    const ageNum = parseInt(age);
    const activity = parseFloat(activityLevel);

    let weightKg: number;
    let heightCmNum: number;

    if (unit === "imperial") {
      const lbs = parseFloat(weight);
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;

      if (isNaN(lbs) || totalInches <= 0 || isNaN(ageNum)) return;

      weightKg = lbs * 0.453592;
      heightCmNum = totalInches * 2.54;
    } else {
      weightKg = parseFloat(weight);
      heightCmNum = parseFloat(heightCm);

      if (isNaN(weightKg) || isNaN(heightCmNum) || isNaN(ageNum)) return;
    }

    // Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCmNum - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCmNum - 5 * ageNum - 161;
    }

    const maintenance = bmr * activity;

    setResult({
      bmr: Math.round(bmr),
      maintenance: Math.round(maintenance),
      mildLoss: Math.round(maintenance - 250), // 0.5 lb/week
      weightLoss: Math.round(maintenance - 500), // 1 lb/week
      extremeLoss: Math.round(maintenance - 1000), // 2 lb/week
      mildGain: Math.round(maintenance + 250),
      weightGain: Math.round(maintenance + 500),
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="BMR (Male) = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5; BMR (Female) = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161; Daily Calories = BMR × Activity Level"
      faqs={[
        {
          question: "How accurate is the calorie calculator?",
          answer: "This calculator uses the Mifflin-St Jeor equation, which is considered the most accurate BMR formula for most people. However, individual variations exist based on genetics, muscle mass, and metabolism."
        },
        {
          question: "How many calories should I eat to lose weight?",
          answer: "For healthy weight loss, create a deficit of 500-750 calories per day to lose 1-1.5 pounds per week. Avoid extreme deficits below 1200 calories (women) or 1500 calories (men) without medical supervision."
        },
        {
          question: "What is BMR vs TDEE?",
          answer: "BMR (Basal Metabolic Rate) is calories burned at complete rest. TDEE (Total Daily Energy Expenditure) is BMR multiplied by your activity level - the actual calories you burn daily."
        },
        {
          question: "Should I adjust my calories on rest days?",
          answer: "It depends on your activity level. If you exercise intensely 6-7 days/week, you might reduce calories by 10-15% on rest days. For moderate activity, keep calories consistent."
        }
      ]}
      howTo={[
        "Select your unit system (US Units or Metric)",
        "Enter your age, gender, and current weight",
        "Input your height (feet and inches for US, or cm for metric)",
        "Choose your activity level from sedentary to very active",
        "Click 'Calculate Calories' to see your results",
        "Review your BMR, maintenance calories, and weight goal targets",
        "Use the weight loss or gain targets based on your fitness goals"
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
            US Units
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={`calc-btn flex-1 ${
              unit === "metric" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Metric
          </button>
        </div>

        {/* Input form */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value)}
              className="calc-input"
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label} - {level.desc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          className="calc-btn calc-btn-primary w-full mb-6"
        >
          Calculate Calories
        </button>

        {/* Results */}
        {result && (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">BMR</div>
                <div className="text-2xl font-bold text-blue-700">
                  {result.bmr.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">calories/day</div>
              </div>
              <div className="result-box text-center">
                <div className="text-sm text-gray-600 mb-1">Maintenance</div>
                <div className="result-value">{result.maintenance.toLocaleString()}</div>
                <div className="text-xs text-gray-500">calories/day</div>
              </div>
            </div>

            {/* Weight goals */}
            <div className="space-y-3 mb-6">
              <h3 className="font-medium text-gray-700">Daily Calorie Goals</h3>

              <div className="bg-red-50 border border-red-200 rounded p-3">
                <div className="font-medium text-red-700">Weight Loss</div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                  <div>
                    <div className="text-gray-600">Mild</div>
                    <div className="font-semibold">{result.mildLoss.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">0.5 lb/week</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Moderate</div>
                    <div className="font-semibold">{result.weightLoss.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">1 lb/week</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Extreme</div>
                    <div className="font-semibold">{result.extremeLoss.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">2 lb/week</div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded p-3">
                <div className="font-medium text-green-700">Weight Gain</div>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <div>
                    <div className="text-gray-600">Mild</div>
                    <div className="font-semibold">{result.mildGain.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">0.5 lb/week</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Moderate</div>
                    <div className="font-semibold">{result.weightGain.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">1 lb/week</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Info */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">How It Works</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>BMR:</strong> Calories burned at complete rest
            </li>
            <li>
              <strong>Maintenance:</strong> BMR × Activity Level
            </li>
            <li>500 calorie deficit = ~1 lb weight loss per week</li>
            <li>Uses the Mifflin-St Jeor equation (most accurate)</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
