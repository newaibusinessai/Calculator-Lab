"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("bac-calculator")!;

export default function BacCalculator() {
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState("");
  const [drinks, setDrinks] = useState("");
  const [hours, setHours] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{ bac: number; status: string; description: string } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(drinks);
    const h = parseFloat(hours);

    if (!w || !d || !h) return;

    const weightKg = unit === "imperial" ? w * 0.453592 : w;
    const weightGrams = weightKg * 1000;
    const alcoholGrams = d * 14;
    const r = gender === "male" ? 0.68 : 0.55;

    let bac = (alcoholGrams / (weightGrams * r)) * 100;
    bac -= h * 0.015;
    bac = Math.max(0, bac);

    let status = "Sober";
    let description = "No impairment";

    if (bac >= 0.08) {
      status = "Legally Intoxicated";
      description = "Significant impairment. Do not drive.";
    } else if (bac >= 0.05) {
      status = "Impaired";
      description = "Reduced coordination and judgment";
    } else if (bac >= 0.03) {
      status = "Slight Impairment";
      description = "Mild effects on mood and behavior";
    }

    setResult({ bac: parseFloat(bac.toFixed(3)), status, description });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This calculator provides estimates only. Do not drive if you have been drinking.
          </p>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} className="calc-input">
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weight ({unit === "metric" ? "kg" : "lbs"})</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="calc-input" placeholder={unit === "metric" ? "70" : "154"} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Standard Drinks</label>
            <input type="number" step="0.5" value={drinks} onChange={(e) => setDrinks(e.target.value)} className="calc-input" placeholder="3" />
            <p className="text-xs text-gray-500 mt-1">1 drink = 12oz beer, 5oz wine, 1.5oz spirits</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hours Since First Drink</label>
            <input type="number" step="0.5" value={hours} onChange={(e) => setHours(e.target.value)} className="calc-input" placeholder="2" />
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">Calculate BAC</button>

        {result && (
          <div className="result-box">
            <div className={"p-6 rounded-lg text-center mb-4 " + (result.bac >= 0.08 ? "bg-red-50" : result.bac >= 0.03 ? "bg-yellow-50" : "bg-green-50")}>
              <div className="text-sm text-gray-600 mb-2">Blood Alcohol Content</div>
              <div className={"text-5xl font-bold " + (result.bac >= 0.08 ? "text-red-700" : result.bac >= 0.03 ? "text-yellow-700" : "text-green-700")}>{result.bac.toFixed(3)}%</div>
              <div className="mt-3">
                <div className="text-lg font-semibold text-gray-800">{result.status}</div>
                <div className="text-sm text-gray-600">{result.description}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p>Calculated using Widmark formula. BAC decreases by approximately 0.015% per hour.</p>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About BAC Calculator</h3>
          <p>
            Estimate your Blood Alcohol Content (BAC) based on the number of drinks consumed, your weight, gender, and time elapsed. This is for educational purposes only. Never drink and drive.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}