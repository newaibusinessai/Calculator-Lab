"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("macro-calculator")!;

export default function MacroCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintenance");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    proteinPercent: number;
    carbsPercent: number;
    fatPercent: number;
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (!w || !h || !a) return;

    const weightKg = unit === "imperial" ? w * 0.453592 : w;
    const heightCm = unit === "imperial" ? h * 2.54 : h;

    let bmr;
    if (gender === "male") {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * a - 161;
    }

    const activityMultipliers: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    let calories, proteinRatio, carbsRatio, fatRatio;
    switch (goal) {
      case "cutting":
        calories = tdee - 500;
        proteinRatio = 0.40;
        carbsRatio = 0.30;
        fatRatio = 0.30;
        break;
      case "bulking":
        calories = tdee + 300;
        proteinRatio = 0.30;
        carbsRatio = 0.40;
        fatRatio = 0.30;
        break;
      default:
        calories = tdee;
        proteinRatio = 0.30;
        carbsRatio = 0.40;
        fatRatio = 0.30;
    }

    const protein = (calories * proteinRatio) / 4;
    const carbs = (calories * carbsRatio) / 4;
    const fat = (calories * fatRatio) / 9;

    setResult({
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      proteinPercent: Math.round(proteinRatio * 100),
      carbsPercent: Math.round(carbsRatio * 100),
      fatPercent: Math.round(fatRatio * 100),
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="BMR (Mifflin-St Jeor): Male = 10×weight(kg) + 6.25×height(cm) - 5×age + 5; Female = 10×weight(kg) + 6.25×height(cm) - 5×age - 161; TDEE = BMR × Activity Level; Protein (g) = (Calories × Protein%) / 4; Carbs (g) = (Calories × Carbs%) / 4; Fat (g) = (Calories × Fat%) / 9; Cutting: -500 cal (40% protein, 30% carbs, 30% fat); Maintenance: TDEE (30% protein, 40% carbs, 30% fat); Bulking: +300 cal (30% protein, 40% carbs, 30% fat)"
      faqs={[
        {
          question: "What are macronutrients and why do they matter?",
          answer: "Macronutrients (macros) are protein, carbohydrates, and fat - the three nutrients that provide calories. Protein (4 cal/g) builds and repairs tissue. Carbs (4 cal/g) provide energy. Fat (9 cal/g) supports hormones and nutrient absorption. Tracking macros helps optimize body composition beyond just counting calories."
        },
        {
          question: "How much protein do I need?",
          answer: "For muscle maintenance: 0.8-1.0g per lb of body weight. For muscle building: 1.0-1.2g per lb. For fat loss while preserving muscle: 1.0-1.5g per lb. Athletes and very active individuals need more. Spread protein intake throughout the day for best results (20-40g per meal)."
        },
        {
          question: "Should I adjust macros on rest days?",
          answer: "It depends on your goal. For muscle building, keep macros consistent even on rest days (recovery needs protein/calories). For fat loss, you can reduce carbs by 20-30% on rest days while keeping protein high. Many people find it simpler to keep macros consistent daily."
        },
        {
          question: "Can I adjust the macro ratios?",
          answer: "Yes, these ratios are starting points. Popular adjustments: Low-carb: 40% protein, 20% carbs, 40% fat. High-carb (athletes): 25% protein, 50% carbs, 25% fat. Balanced: 30% protein, 35% carbs, 35% fat. Keep protein 0.8-1.2g per lb of body weight regardless of ratio."
        }
      ]}
      howTo={[
        "Select your unit system (Metric kg/cm or Imperial lbs/inches)",
        "Enter your current weight",
        "Enter your height",
        "Input your age in years",
        "Select your biological gender",
        "Choose your activity level (how often you exercise per week)",
        "Select your goal: cutting (fat loss), maintenance, or bulking (muscle gain)",
        "Click 'Calculate Macros' to see your personalized daily targets",
        "Review total daily calories and macro breakdown in grams",
        "Track your food intake to hit these targets using a food diary or app"
      ]}
    >
      <div className="space-y-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="metric" checked={unit === "metric"} onChange={(e) => setUnit(e.target.value)} className="mr-2" />
              Metric (kg, cm)
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="imperial" checked={unit === "imperial"} onChange={(e) => setUnit(e.target.value)} className="mr-2" />
              Imperial (lbs, in)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight {unit === "metric" ? "(kg)" : "(lbs)"}</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="calc-input" placeholder={unit === "metric" ? "70" : "154"} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height {unit === "metric" ? "(cm)" : "(inches)"}</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="calc-input" placeholder={unit === "metric" ? "175" : "69"} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age (years)</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="calc-input" placeholder="30" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="calc-input">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
            <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="calc-input">
              <option value="sedentary">Sedentary (little/no exercise)</option>
              <option value="light">Light (1-3 days/week)</option>
              <option value="moderate">Moderate (3-5 days/week)</option>
              <option value="active">Active (6-7 days/week)</option>
              <option value="veryActive">Very Active (athlete)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
            <select value={goal} onChange={(e) => setGoal(e.target.value)} className="calc-input">
              <option value="cutting">Cutting (lose fat)</option>
              <option value="maintenance">Maintenance</option>
              <option value="bulking">Bulking (gain muscle)</option>
            </select>
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">Calculate Macros</button>

        {result && (
          <div className="result-box">
            <h3 className="text-xl font-semibold mb-4">Your Daily Macros</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-700">{result.calories}</div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-700">{result.protein}g</div>
                <div className="text-sm text-gray-600">Protein ({result.proteinPercent}%)</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-700">{result.carbs}g</div>
                <div className="text-sm text-gray-600">Carbs ({result.carbsPercent}%)</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-700">{result.fat}g</div>
                <div className="text-sm text-gray-600">Fat ({result.fatPercent}%)</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Based on Mifflin-St Jeor equation for BMR and activity level adjustment.</p>
              {goal === "cutting" && <p>500 calorie deficit for gradual fat loss (approx 0.5kg/week).</p>}
              {goal === "bulking" && <p>300 calorie surplus for muscle gain with minimal fat gain.</p>}
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Macro Calculator</h3>
          <p>Calculate your daily macronutrient needs (protein, carbs, fat) based on your body composition, activity level, and fitness goals.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
