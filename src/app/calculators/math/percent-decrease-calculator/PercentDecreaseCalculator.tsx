"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("percent-decrease-calculator")!;

export default function PercentDecreaseCalculator() {
  const [originalValue, setOriginalValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const original = parseFloat(originalValue);
    const newVal = parseFloat(newValue);

    if (isNaN(original) || isNaN(newVal)) {
      setResult("Please enter valid numbers");
      return;
    }

    if (original === 0) {
      setResult("Original value cannot be zero");
      return;
    }

    const decrease = original - newVal;
    const percentDecrease = (decrease / original) * 100;

    setResult(`${percentDecrease.toFixed(2)}%`);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Value
            </label>
            <input
              type="number"
              value={originalValue}
              onChange={(e) => setOriginalValue(e.target.value)}
              className="calc-input"
              placeholder="Enter original value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Value
            </label>
            <input
              type="number"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="calc-input"
              placeholder="Enter new value"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>
        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">Percent Decrease</div>
            <div className="text-3xl font-bold text-green-700">{result}</div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Percent Decrease Calculator</h3>
          <p>Calculate the percentage decrease between two values. Formula: ((Original Value - New Value) / Original Value) × 100</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
