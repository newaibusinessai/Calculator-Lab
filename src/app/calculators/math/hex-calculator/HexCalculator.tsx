"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("hex-calculator")!;

export default function HexCalculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    try {
      const value = parseFloat(input);
      if (isNaN(value)) {
        setResult("Please enter a valid number");
        return;
      }
      // Calculation logic here
      setResult(`Result: ${value}`);
    } catch {
      setResult("Error in calculation");
    }
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Value
          </label>
          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="calc-input"
            placeholder="Enter a number"
          />
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>
        {result && (
          <div className="result-box">
            <div className="result-value">{result}</div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Hex Calculator</h3>
          <p>Hexadecimal operations.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
