"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("percentage-change-calculator")!;

export default function PercentageChangeCalculator() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const val1 = parseFloat(value1);
    const val2 = parseFloat(value2);

    if (isNaN(val1) || isNaN(val2)) {
      setResult("Please enter valid numbers");
      return;
    }

    if (val1 === 0) {
      setResult("First value cannot be zero");
      return;
    }

    const change = val2 - val1;
    const percentChange = (change / val1) * 100;
    const changeType = percentChange >= 0 ? "increase" : "decrease";

    setResult(`${Math.abs(percentChange).toFixed(2)}% ${changeType}`);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Value
            </label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="calc-input"
              placeholder="Enter first value"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Second Value
            </label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="calc-input"
              placeholder="Enter second value"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>
        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">Percentage Change</div>
            <div className="text-3xl font-bold text-green-700">{result}</div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Percentage Change Calculator</h3>
          <p>Calculate the percentage change between two numbers. Shows whether the change is an increase or decrease.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
