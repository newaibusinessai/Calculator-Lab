"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("bmr-calculator")!;

export default function BmrCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");

  const [result, setResult] = useState<{
    mifflinStJeor: number;
    harrisBenedict: number;
    katchMcardle: number;
  } | null>(null);

  const calculate = () => {
    const ageNum = parseInt(age);

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

    // Mifflin-St Jeor Equation (most accurate for most people)
    let mifflinStJeor: number;
    if (gender === "male") {
      mifflinStJeor = 10 * weightKg + 6.25 * heightCmNum - 5 * ageNum + 5;
    } else {
      mifflinStJeor = 10 * weightKg + 6.25 * heightCmNum - 5 * ageNum - 161;
    }

    // Harris-Benedict Equation (revised)
    let harrisBenedict: number;
    if (gender === "male") {
      harrisBenedict = 88.362 + 13.397 * weightKg + 4.799 * heightCmNum - 5.677 * ageNum;
    } else {
      harrisBenedict = 447.593 + 9.247 * weightKg + 3.098 * heightCmNum - 4.330 * ageNum;
    }

    // Katch-McArdle (simplified, without lean body mass)
    // Using a rough estimate based on average body fat
    const avgBodyFat = gender === "male" ? 0.18 : 0.25;
    const leanMass = weightKg * (1 - avgBodyFat);
    const katchMcardle = 370 + 21.6 * leanMass;

    setResult({
      mifflinStJeor: Math.round(mifflinStJeor),
      harrisBenedict: Math.round(harrisBenedict),
      katchMcardle: Math.round(katchMcardle),
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Mifflin-St Jeor: BMR (Male) = 10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5; BMR (Female) = 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161; Harris-Benedict (Revised): Male = 88.362 + 13.397 × weight(kg) + 4.799 × height(cm) - 5.677 × age; Female = 447.593 + 9.247 × weight(kg) + 3.098 × height(cm) - 4.330 × age"
      faqs={[
        {
          question: "What is BMR and why is it important?",
          answer: "BMR (Basal Metabolic Rate) is the number of calories your body needs to perform basic life-sustaining functions at rest. It represents 60-75% of your total daily calorie expenditure and is crucial for understanding your baseline energy needs."
        },
        {
          question: "Which BMR formula is most accurate?",
          answer: "The Mifflin-St Jeor equation is generally considered the most accurate for the general population. It was developed in 1990 and has been validated across various studies. However, the Katch-McArdle formula is more accurate if you know your body fat percentage."
        },
        {
          question: "How do I use my BMR for weight management?",
          answer: "Multiply your BMR by your activity level (1.2-1.9) to get your TDEE (Total Daily Energy Expenditure). To lose weight, eat 10-20% below TDEE. To gain weight, eat 10-20% above TDEE. To maintain, eat at TDEE."
        },
        {
          question: "Why do different formulas give different results?",
          answer: "Each formula was developed using different population samples and methodologies. The differences are usually within 100-200 calories. The Mifflin-St Jeor tends to be most accurate for modern populations, while Harris-Benedict slightly overestimates for most people."
        }
      ]}
      howTo={[
        "Choose between US Units (pounds, feet, inches) or Metric (kg, cm)",
        "Enter your age in years",
        "Select your biological gender (affects the calculation formula)",
        "Input your current weight",
        "Enter your height (feet and inches for US, centimeters for metric)",
        "Click 'Calculate BMR' to see your results",
        "Review results from all three formulas for comparison",
        "Check the activity level table to see your total daily calorie needs"
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
        </div>

        <button
          onClick={calculate}
          className="calc-btn calc-btn-primary w-full mb-6"
        >
          Calculate BMR
        </button>

        {/* Results */}
        {result && (
          <>
            <div className="result-box text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">
                Your BMR (Mifflin-St Jeor)
              </div>
              <div className="result-value text-4xl">
                {result.mifflinStJeor.toLocaleString()}
              </div>
              <div className="text-gray-500">calories/day</div>
            </div>

            {/* Comparison */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Results by Different Formulas
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">Mifflin-St Jeor</div>
                    <div className="text-xs text-gray-500">Most accurate for most people</div>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    {result.mifflinStJeor.toLocaleString()} cal
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">Harris-Benedict</div>
                    <div className="text-xs text-gray-500">Revised formula (1984)</div>
                  </div>
                  <div className="text-lg font-semibold">
                    {result.harrisBenedict.toLocaleString()} cal
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <div className="font-medium">Katch-McArdle</div>
                    <div className="text-xs text-gray-500">Based on lean body mass (estimated)</div>
                  </div>
                  <div className="text-lg font-semibold">
                    {result.katchMcardle.toLocaleString()} cal
                  </div>
                </div>
              </div>
            </div>

            {/* Daily calorie needs by activity */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Daily Calories by Activity Level
              </h3>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Activity Level</th>
                    <th className="border p-2 text-right">Calories/Day</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Sedentary (little/no exercise)</td>
                    <td className="border p-2 text-right font-medium">
                      {Math.round(result.mifflinStJeor * 1.2).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Light (1-3 days/week)</td>
                    <td className="border p-2 text-right font-medium">
                      {Math.round(result.mifflinStJeor * 1.375).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Moderate (3-5 days/week)</td>
                    <td className="border p-2 text-right font-medium">
                      {Math.round(result.mifflinStJeor * 1.55).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Active (6-7 days/week)</td>
                    <td className="border p-2 text-right font-medium">
                      {Math.round(result.mifflinStJeor * 1.725).toLocaleString()}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">Very Active (hard exercise daily)</td>
                    <td className="border p-2 text-right font-medium">
                      {Math.round(result.mifflinStJeor * 1.9).toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Info */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">What is BMR?</h3>
          <p className="mb-2">
            Basal Metabolic Rate (BMR) is the number of calories your body needs
            to maintain basic life-sustaining functions like breathing, circulation,
            and cell production while at complete rest.
          </p>
          <p>
            Your actual daily calorie needs (TDEE) = BMR × Activity Multiplier
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
