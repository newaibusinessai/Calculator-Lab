"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("tdee-calculator")!;

export default function TdeeCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("moderate");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    bmr: number;
    tdee: number;
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
      sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, veryActive: 1.9,
    };
    const tdee = bmr * activityMultipliers[activityLevel];
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee) });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="calc-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="calc-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="calc-input" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="calc-input">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
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
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">Calculate TDEE</button>
        {result && (
          <div className="result-box">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600">BMR</div>
                <div className="text-3xl font-bold text-blue-700">{result.bmr}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600">TDEE</div>
                <div className="text-3xl font-bold text-green-700">{result.tdee}</div>
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About TDEE Calculator</h3>
          <p>Calculate your Total Daily Energy Expenditure based on BMR and activity level.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
