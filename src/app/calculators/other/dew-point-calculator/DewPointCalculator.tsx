"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("dew-point-calculator")!;

export default function DewPointCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    if (!input.trim()) {
      setResult("Please enter a value");
      return;
    }
    // Calculation logic here
    setResult(`Result: ${input}`);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Value
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="calc-input"
            placeholder="Enter value"
          />
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>
        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">Result</div>
            <div className="text-xl font-bold text-green-700">{result}</div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Dew Point Calculator</h3>
          <p>Dew point temp.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
