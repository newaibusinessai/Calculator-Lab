"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("carpet-calculator")!;

export default function CarpetCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [result, setResult] = useState<{
    sqft: number;
    sqyards: number;
  } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);

    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    // Calculate area in square feet
    const sqft = l * w;

    // Convert to square yards (1 sq yard = 9 sq ft)
    const sqyards = sqft / 9;

    setResult({
      sqft: sqft,
      sqyards: sqyards
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Length (ft)
            </label>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="calc-input"
              placeholder="Enter length"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Width (ft)
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="calc-input"
              placeholder="Enter width"
              step="0.1"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Carpet Needed
        </button>
        {result && (
          <div className="result-box">
            <div className="text-sm text-gray-600 mb-2">Carpet Required</div>
            <div className="text-2xl font-bold text-green-700 mb-1">
              {result.sqft.toFixed(1)} sq ft
            </div>
            <div className="text-2xl font-bold text-green-700">
              {result.sqyards.toFixed(2)} sq yards
            </div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Carpet Calculator</h3>
          <p>Calculate carpet needed for your room in square feet and square yards. Carpet is typically sold by the square yard.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
