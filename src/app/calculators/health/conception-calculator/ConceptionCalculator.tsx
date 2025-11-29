"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("conception-calculator")!;

export default function ConceptionCalculator() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);

    if (isNaN(v1) || isNaN(v2)) {
      setResult("Please enter valid numbers");
      return;
    }

    // Generic calculation
    const calculatedResult = v1 / (v2 * v2) * 703;
    setResult(calculatedResult.toFixed(1));
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value 1
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="calc-input"
              placeholder="Enter value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Value 2
            </label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="calc-input"
              placeholder="Enter value"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>
        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">Result</div>
            <div className="text-3xl font-bold text-green-700">{result}</div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Conception Calculator</h3>
          <p>Conception date.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
