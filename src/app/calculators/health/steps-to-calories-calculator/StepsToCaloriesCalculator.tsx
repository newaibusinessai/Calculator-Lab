"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("steps-to-calories-calculator")!;

export default function StepsToCaloriesCalculator() {
  const [steps, setSteps] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [result, setResult] = useState<{
    calories: number;
    distance: number;
  } | null>(null);

  const calculate = () => {
    const stepsNum = parseInt(steps);
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!stepsNum || !weightNum || !heightNum) return;

    // Calculate stride length (roughly 0.413 * height for women, 0.415 * height for men)
    const strideLength = gender === "male" ? heightNum * 0.415 : heightNum * 0.413;

    // Calculate distance in miles
    const distance = (stepsNum * strideLength) / 63360; // inches to miles

    // Calories per mile (rough estimate: 0.57 * weight for walking)
    const caloriesPerMile = 0.57 * weightNum;
    const calories = caloriesPerMile * distance;

    setResult({
      calories: parseFloat(calories.toFixed(1)),
      distance: parseFloat(distance.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Stride = Height × 0.413-0.415; Distance (miles) = (Steps × Stride) / 63360; Calories = Distance × (0.57 × Weight)"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Steps
          </label>
          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="calc-input"
            placeholder="10000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (lbs)
          </label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="calc-input"
            placeholder="150"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height (inches)
          </label>
          <input
            type="number"
            step="0.1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="calc-input"
            placeholder="68"
          />
          <p className="text-xs text-gray-500 mt-1">
            5 feet = 60 inches, add remaining inches
          </p>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>

        {result && (
          <div className="result-box">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Calories Burned</div>
                <div className="text-2xl font-bold text-orange-700">
                  {result.calories} cal
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Distance Walked</div>
                <div className="text-2xl font-bold text-blue-700">
                  {result.distance} miles
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">
            About Steps to Calories Calculator
          </h3>
          <p>
            Convert your daily steps into calories burned and distance traveled. This calculator
            estimates stride length based on your height and gender, then calculates calories
            based on your weight and distance covered.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
