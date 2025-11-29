"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("water-intake-calculator")!;

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [climate, setClimate] = useState("moderate");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{ liters: number; cups: number; ounces: number } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    if (!w) return;

    const weightKg = unit === "imperial" ? w * 0.453592 : w;
    let waterML = weightKg * 33;

    if (activityLevel === "light") waterML *= 1.1;
    else if (activityLevel === "moderate") waterML *= 1.2;
    else if (activityLevel === "active") waterML *= 1.4;
    else if (activityLevel === "veryActive") waterML *= 1.6;

    if (climate === "hot") waterML *= 1.15;

    const liters = waterML / 1000;
    const cups = liters * 4.227;
    const ounces = liters * 33.814;

    setResult({
      liters: Math.round(liters * 10) / 10,
      cups: Math.round(cups),
      ounces: Math.round(ounces),
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="metric" checked={unit === "metric"} onChange={(e) => setUnit(e.target.value)} className="mr-2" />
              Metric (kg)
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="imperial" checked={unit === "imperial"} onChange={(e) => setUnit(e.target.value)} className="mr-2" />
              Imperial (lbs)
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight ({unit === "metric" ? "kg" : "lbs"})</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="calc-input" placeholder={unit === "metric" ? "70" : "154"} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
          <select value={activityLevel} onChange={(e) => setActivityLevel(e.target.value)} className="calc-input">
            <option value="sedentary">Sedentary</option>
            <option value="light">Light</option>
            <option value="moderate">Moderate</option>
            <option value="active">Active</option>
            <option value="veryActive">Very Active</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Climate</label>
          <select value={climate} onChange={(e) => setClimate(e.target.value)} className="calc-input">
            <option value="moderate">Moderate</option>
            <option value="hot">Hot/Humid</option>
          </select>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">Calculate Water Intake</button>

        {result && (
          <div className="result-box">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Liters</div>
                <div className="text-3xl font-bold text-blue-700">{result.liters}L</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Cups (8 oz)</div>
                <div className="text-3xl font-bold text-green-700">{result.cups}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Ounces</div>
                <div className="text-3xl font-bold text-purple-700">{result.ounces} oz</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Water Intake Calculator</h3>
          <p>Calculate your daily water needs based on your weight, activity level, and climate. Staying properly hydrated is essential for health and performance.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}