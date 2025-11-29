"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("proportion-calculator")!;

export default function ProportionCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const valueA = parseFloat(a);
    const valueB = parseFloat(b);
    const valueC = parseFloat(c);
    const valueD = parseFloat(d);

    // Count how many values are provided
    const values = [valueA, valueB, valueC, valueD];
    const providedValues = values.filter(v => !isNaN(v)).length;

    if (providedValues !== 3) {
      setResult("Please enter exactly 3 values to find the 4th");
      return;
    }

    // Solve for missing value using a:b = c:d or a*d = b*c
    if (isNaN(valueA)) {
      // Solve for a: a = (b * c) / d
      if (valueD === 0) {
        setResult("Cannot divide by zero");
        return;
      }
      const missing = (valueB * valueC) / valueD;
      setResult(`a = ${missing.toFixed(2)}`);
    } else if (isNaN(valueB)) {
      // Solve for b: b = (a * d) / c
      if (valueC === 0) {
        setResult("Cannot divide by zero");
        return;
      }
      const missing = (valueA * valueD) / valueC;
      setResult(`b = ${missing.toFixed(2)}`);
    } else if (isNaN(valueC)) {
      // Solve for c: c = (a * d) / b
      if (valueB === 0) {
        setResult("Cannot divide by zero");
        return;
      }
      const missing = (valueA * valueD) / valueB;
      setResult(`c = ${missing.toFixed(2)}`);
    } else if (isNaN(valueD)) {
      // Solve for d: d = (b * c) / a
      if (valueA === 0) {
        setResult("Cannot divide by zero");
        return;
      }
      const missing = (valueB * valueC) / valueA;
      setResult(`d = ${missing.toFixed(2)}`);
    }
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="text-center mb-4">
          <div className="text-lg font-medium text-gray-700">Solve: a : b = c : d</div>
          <div className="text-sm text-gray-500 mt-1">Enter any 3 values to find the 4th</div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              a
            </label>
            <input
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="calc-input"
              placeholder="Value a"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              b
            </label>
            <input
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="calc-input"
              placeholder="Value b"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              c
            </label>
            <input
              type="number"
              value={c}
              onChange={(e) => setC(e.target.value)}
              className="calc-input"
              placeholder="Value c"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              d
            </label>
            <input
              type="number"
              value={d}
              onChange={(e) => setD(e.target.value)}
              className="calc-input"
              placeholder="Value d"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>
        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">Missing Value</div>
            <div className="text-3xl font-bold text-green-700">{result}</div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Proportion Calculator</h3>
          <p>Solve proportion problems using the formula a:b = c:d. Enter any three values to find the fourth missing value.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
