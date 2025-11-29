"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("lean-body-mass-calculator")!;

export default function LeanBodyMassCalculator() {
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    lbm: number;
    fatMass: number;
    lbmPercent: number;
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const bf = parseFloat(bodyFat);

    if (!w || !bf || bf < 0 || bf > 100) return;

    const fatMass = w * (bf / 100);
    const lbm = w - fatMass;
    const lbmPercent = 100 - bf;

    setResult({
      lbm: parseFloat(lbm.toFixed(1)),
      fatMass: parseFloat(fatMass.toFixed(1)),
      lbmPercent: parseFloat(lbmPercent.toFixed(1)),
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight Unit</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="metric" checked={unit === "metric"} onChange={(e) => setUnit(e.target.value)} className="mr-2" />
              Kilograms (kg)
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="imperial" checked={unit === "imperial"} onChange={(e) => setUnit(e.target.value)} className="mr-2" />
              Pounds (lbs)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Total Body Weight ({unit === "metric" ? "kg" : "lbs"})</label>
            <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} className="calc-input" placeholder={unit === "metric" ? "70" : "154"} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Body Fat Percentage (%)</label>
            <input type="number" step="0.1" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} className="calc-input" placeholder="15" />
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">Calculate Lean Body Mass</button>

        {result && (
          <div className="result-box">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-2">Lean Body Mass</div>
                <div className="text-4xl font-bold text-blue-700">{result.lbm}</div>
                <div className="text-sm text-gray-600 mt-1">{unit === "metric" ? "kg" : "lbs"} ({result.lbmPercent}%)</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-2">Fat Mass</div>
                <div className="text-4xl font-bold text-orange-700">{result.fatMass}</div>
                <div className="text-sm text-gray-600 mt-1">{unit === "metric" ? "kg" : "lbs"} ({bodyFat}%)</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              <p><strong>Formula:</strong> LBM = Total Weight - (Total Weight � Body Fat %)</p>
              <p className="mt-2">Lean body mass includes muscles, bones, organs, and water.</p>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Lean Body Mass Calculator</h3>
          <p>
            Calculate your lean body mass (LBM), which is your total body weight minus fat mass. 
            LBM includes muscle, bone, organs, and water. Tracking LBM helps monitor muscle retention during weight loss.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}