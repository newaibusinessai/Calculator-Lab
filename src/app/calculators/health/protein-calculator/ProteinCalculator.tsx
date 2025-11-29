"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("protein-calculator")!;

export default function ProteinCalculator() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    min: number;
    max: number;
    recommended: number;
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w) return;

    const weightKg = unit === "imperial" ? w * 0.453592 : w;

    let multiplier = 1.6;
    if (activityLevel === "sedentary") multiplier = 0.8;
    else if (activityLevel === "light") multiplier = 1.2;
    else if (activityLevel === "moderate") multiplier = 1.6;
    else if (activityLevel === "active") multiplier = 2.0;
    else if (activityLevel === "athlete") multiplier = 2.4;

    if (goal === "lose") multiplier *= 1.2;
    else if (goal === "gain") multiplier *= 1.3;

    const recommended = Math.round(weightKg * multiplier);
    const min = Math.round(weightKg * (multiplier * 0.8));
    const max = Math.round(weightKg * (multiplier * 1.2));

    setResult({ min, max, recommended });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit System
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="metric"
                checked={unit === "metric"}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2"
              />
              Metric (kg)
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="imperial"
                checked={unit === "imperial"}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2"
              />
              Imperial (lbs)
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight ({unit === "metric" ? "kg" : "lbs"})
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="calc-input"
            placeholder={unit === "metric" ? "70" : "154"}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity Level
          </label>
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            className="calc-input"
          >
            <option value="sedentary">Sedentary (little/no exercise)</option>
            <option value="light">Light (1-3 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="athlete">Athlete (2x per day)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Goal
          </label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="calc-input"
          >
            <option value="lose">Lose Weight</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Muscle</option>
          </select>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Protein Needs
        </button>

        {result && (
          <div className="result-box">
            <div className="bg-blue-50 p-6 rounded-lg text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">Recommended Daily Protein</div>
              <div className="text-4xl font-bold text-blue-700">{result.recommended}g</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Minimum</div>
                <div className="text-2xl font-bold text-green-700">{result.min}g</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Maximum</div>
                <div className="text-2xl font-bold text-purple-700">{result.max}g</div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p>Aim for {result.min}-{result.max}g per day, with {result.recommended}g as your target.</p>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Protein Calculator</h3>
          <p>
            Calculate your daily protein needs based on your weight, activity level, and fitness goals. 
            Protein requirements increase with activity level and when trying to build muscle or lose fat.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
