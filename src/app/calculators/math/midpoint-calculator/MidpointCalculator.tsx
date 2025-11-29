"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("midpoint-calculator")!;

export default function MidpointCalculator() {
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const xCoord1 = parseFloat(x1);
    const yCoord1 = parseFloat(y1);
    const xCoord2 = parseFloat(x2);
    const yCoord2 = parseFloat(y2);

    if (isNaN(xCoord1) || isNaN(yCoord1) || isNaN(xCoord2) || isNaN(yCoord2)) {
      setResult("Please enter valid numbers for all coordinates");
      return;
    }

    const midX = (xCoord1 + xCoord2) / 2;
    const midY = (yCoord1 + yCoord2) / 2;

    setResult(`(${midX.toFixed(2)}, ${midY.toFixed(2)})`);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg bg-gray-50">
            <div className="text-sm font-medium text-gray-700 mb-3">Point 1</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">x₁</label>
                <input
                  type="number"
                  step="any"
                  value={x1}
                  onChange={(e) => setX1(e.target.value)}
                  className="calc-input"
                  placeholder="x coordinate"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">y₁</label>
                <input
                  type="number"
                  step="any"
                  value={y1}
                  onChange={(e) => setY1(e.target.value)}
                  className="calc-input"
                  placeholder="y coordinate"
                />
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg bg-gray-50">
            <div className="text-sm font-medium text-gray-700 mb-3">Point 2</div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">x₂</label>
                <input
                  type="number"
                  step="any"
                  value={x2}
                  onChange={(e) => setX2(e.target.value)}
                  className="calc-input"
                  placeholder="x coordinate"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">y₂</label>
                <input
                  type="number"
                  step="any"
                  value={y2}
                  onChange={(e) => setY2(e.target.value)}
                  className="calc-input"
                  placeholder="y coordinate"
                />
              </div>
            </div>
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Midpoint
        </button>
        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">Midpoint</div>
            <div className="text-3xl font-bold text-green-700">{result}</div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Midpoint Calculator</h3>
          <p>Find the midpoint between two points using the formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
