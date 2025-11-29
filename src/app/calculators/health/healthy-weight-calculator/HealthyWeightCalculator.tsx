"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("healthy-weight-calculator")!;

export default function HealthyWeightCalculator() {
  const [height, setHeight] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{
    minWeight: number;
    maxWeight: number;
    idealWeight: number;
    minBMI: number;
    maxBMI: number;
  } | null>(null);

  const calculate = () => {
    const h = parseFloat(height);
    if (!h) return;

    const heightM = unit === "imperial" ? h * 0.0254 : h / 100;
    const minBMI = 18.5;
    const maxBMI = 24.9;
    const idealBMI = 21.7;

    let minWeight = minBMI * heightM * heightM;
    let maxWeight = maxBMI * heightM * heightM;
    let idealWeight = idealBMI * heightM * heightM;

    if (unit === "imperial") {
      minWeight = minWeight * 2.20462;
      maxWeight = maxWeight * 2.20462;
      idealWeight = idealWeight * 2.20462;
    }

    setResult({
      minWeight: Math.round(minWeight * 10) / 10,
      maxWeight: Math.round(maxWeight * 10) / 10,
      idealWeight: Math.round(idealWeight * 10) / 10,
      minBMI,
      maxBMI,
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
              Metric (cm, kg)
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="imperial" checked={unit === "imperial"} onChange={(e) => setUnit(e.target.value)} className="mr-2" />
              Imperial (in, lbs)
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height ({unit === "metric" ? "cm" : "inches"})
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="calc-input"
            placeholder={unit === "metric" ? "175" : "69"}
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Healthy Weight Range
        </button>

        {result && (
          <div className="result-box">
            <div className="bg-green-50 p-6 rounded-lg text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">Healthy Weight Range</div>
              <div className="text-4xl font-bold text-green-700">
                {result.minWeight} - {result.maxWeight}
              </div>
              <div className="text-sm text-gray-600 mt-1">{unit === "metric" ? "kg" : "lbs"}</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Minimum Healthy Weight</div>
                <div className="text-2xl font-bold text-blue-700">{result.minWeight} {unit === "metric" ? "kg" : "lbs"}</div>
                <div className="text-xs text-gray-500">BMI {result.minBMI}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Maximum Healthy Weight</div>
                <div className="text-2xl font-bold text-purple-700">{result.maxWeight} {unit === "metric" ? "kg" : "lbs"}</div>
                <div className="text-xs text-gray-500">BMI {result.maxBMI}</div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <div className="text-sm text-gray-600 mb-1">Ideal Weight</div>
              <div className="text-2xl font-bold text-yellow-700">{result.idealWeight} {unit === "metric" ? "kg" : "lbs"}</div>
              <div className="text-xs text-gray-500">BMI 21.7 (midpoint of healthy range)</div>
            </div>

            <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p>Based on BMI range of 18.5 - 24.9, which is considered healthy for most adults.</p>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Healthy Weight Calculator</h3>
          <p>
            Calculate your healthy weight range based on your height using BMI standards. 
            A BMI between 18.5 and 24.9 is considered healthy for most adults. Individual needs may vary.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}