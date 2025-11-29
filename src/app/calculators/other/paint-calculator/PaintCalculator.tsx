"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("paint-calculator")!;

export default function PaintCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [coats, setCoats] = useState("2");
  const [result, setResult] = useState<{
    gallons: number;
    sqft: number;
  } | null>(null);

  const calculate = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const h = parseFloat(height);
    const c = parseFloat(coats);

    if (isNaN(l) || isNaN(w) || isNaN(h) || isNaN(c) || l <= 0 || w <= 0 || h <= 0 || c <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    // Calculate wall area (perimeter * height)
    const wallArea = 2 * (l + w) * h;

    // Total area with coats
    const totalArea = wallArea * c;

    // Standard coverage: 1 gallon covers ~350 sq ft
    const gallonsNeeded = Math.ceil(totalArea / 350);

    setResult({
      gallons: gallonsNeeded,
      sqft: wallArea
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Coats
            </label>
            <input
              type="number"
              value={coats}
              onChange={(e) => setCoats(e.target.value)}
              className="calc-input"
              placeholder="Number of coats"
              min="1"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Paint Needed
        </button>
        {result && (
          <div className="result-box">
            <div className="text-sm text-gray-600 mb-2">Paint Required</div>
            <div className="text-3xl font-bold text-green-700 mb-2">
              {result.gallons} {result.gallons === 1 ? 'Gallon' : 'Gallons'}
            </div>
            <div className="text-sm text-gray-600">
              Wall Area: {result.sqft.toFixed(1)} sq ft
            </div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Paint Calculator</h3>
          <p>This calculator estimates paint needed based on room dimensions. Standard coverage is 350 sq ft per gallon. Add extra for windows and doors if needed.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
