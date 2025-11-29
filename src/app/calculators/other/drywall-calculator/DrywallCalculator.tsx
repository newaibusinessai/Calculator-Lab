"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("drywall-calculator")!;

export default function DrywallCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState<{
    sheets: number;
    sqft: number;
  } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);

    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    // Calculate wall area (perimeter * height)
    const wallArea = 2 * (l + w) * h;

    // Standard drywall sheet is 4ft x 8ft = 32 sq ft
    const sheetArea = 32;

    // Calculate sheets needed (add 10% waste)
    const sheetsNeeded = Math.ceil((wallArea * 1.1) / sheetArea);

    setResult({
      sheets: sheetsNeeded,
      sqft: wallArea
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wall Height (ft)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="calc-input"
              placeholder="Enter height"
              step="0.1"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Drywall Needed
        </button>
        {result && (
          <div className="result-box">
            <div className="text-sm text-gray-600 mb-2">Drywall Sheets Required (4x8 ft)</div>
            <div className="text-3xl font-bold text-green-700 mb-2">
              {result.sheets} {result.sheets === 1 ? 'Sheet' : 'Sheets'}
            </div>
            <div className="text-sm text-gray-600">
              Wall Area: {result.sqft.toFixed(1)} sq ft (includes 10% waste)
            </div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Drywall Calculator</h3>
          <p>Calculates 4x8 ft drywall sheets needed for room walls. Includes 10% waste factor for cuts and mistakes.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
