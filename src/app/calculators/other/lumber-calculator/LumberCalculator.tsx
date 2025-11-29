"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("lumber-calculator")!;

export default function LumberCalculator() {
  const [thickness, setThickness] = useState("");
  const [width, setWidth] = useState("");
  const [lengthFt, setLengthFt] = useState("");
  const [pieces, setPieces] = useState("1");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const t = parseFloat(thickness);
    const w = parseFloat(width);
    const l = parseFloat(lengthFt);
    const p = parseFloat(pieces);

    if (isNaN(t) || isNaN(w) || isNaN(l) || isNaN(p) || t <= 0 || w <= 0 || l <= 0 || p <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    // Board feet formula: (Thickness in inches × Width in inches × Length in feet) / 12
    const boardFeet = (t * w * l) / 12;
    const totalBoardFeet = boardFeet * p;

    setResult(totalBoardFeet);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thickness (inches)
            </label>
            <input
              type="number"
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              className="calc-input"
              placeholder="e.g., 2"
              step="0.25"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width (inches)
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="calc-input"
              placeholder="e.g., 4"
              step="0.25"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length (feet)
            </label>
            <input
              type="number"
              value={lengthFt}
              onChange={(e) => setLengthFt(e.target.value)}
              className="calc-input"
              placeholder="e.g., 8"
              step="0.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Pieces
            </label>
            <input
              type="number"
              value={pieces}
              onChange={(e) => setPieces(e.target.value)}
              className="calc-input"
              placeholder="Number of boards"
              min="1"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Board Feet
        </button>
        {result !== null && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">Total Board Feet</div>
            <div className="text-3xl font-bold text-green-700">
              {result.toFixed(2)} BF
            </div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Board Feet Calculator</h3>
          <p>Calculate board feet for lumber using the formula: (Thickness × Width × Length) ÷ 12. Useful for estimating lumber costs and quantities.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
