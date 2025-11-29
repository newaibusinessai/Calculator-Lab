"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("square-root-calculator")!;

export default function SquareRootCalculator() {
  const [number, setNumber] = useState("");
  const [nthRoot, setNthRoot] = useState("2");
  const [result, setResult] = useState<{
    value: number;
    simplified?: string;
  } | null>(null);

  const calculate = () => {
    const num = parseFloat(number);
    const n = parseFloat(nthRoot);

    if (isNaN(num) || isNaN(n) || n === 0) {
      return;
    }

    // Check for negative numbers with even roots
    if (num < 0 && n % 2 === 0) {
      alert("Cannot calculate even root of negative numbers");
      return;
    }

    const rootValue = num < 0 ? -Math.pow(-num, 1 / n) : Math.pow(num, 1 / n);

    // Check if it's a perfect root
    const roundedResult = Math.round(rootValue);
    const isPerfect = Math.abs(Math.pow(roundedResult, n) - num) < 0.0000001;

    setResult({
      value: rootValue,
      simplified: isPerfect ? String(roundedResult) : undefined,
    });
  };

  const commonRoots = [
    { value: 4, sqrt: 2 },
    { value: 9, sqrt: 3 },
    { value: 16, sqrt: 4 },
    { value: 25, sqrt: 5 },
    { value: 36, sqrt: 6 },
    { value: 49, sqrt: 7 },
    { value: 64, sqrt: 8 },
    { value: 81, sqrt: 9 },
    { value: 100, sqrt: 10 },
    { value: 121, sqrt: 11 },
    { value: 144, sqrt: 12 },
  ];

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="max-w-lg mx-auto">
        {/* Calculator */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number
            </label>
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="calc-input"
              placeholder="Enter a number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Root Type
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setNthRoot("2")}
                className={`calc-btn flex-1 ${nthRoot === "2" ? "bg-blue-100 border-blue-400" : ""}`}
              >
                √ Square Root
              </button>
              <button
                onClick={() => setNthRoot("3")}
                className={`calc-btn flex-1 ${nthRoot === "3" ? "bg-blue-100 border-blue-400" : ""}`}
              >
                ∛ Cube Root
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Or enter custom nth root
            </label>
            <input
              type="number"
              value={nthRoot}
              onChange={(e) => setNthRoot(e.target.value)}
              className="calc-input w-32"
              placeholder="n"
              min="1"
            />
          </div>

          <button
            onClick={calculate}
            className="calc-btn calc-btn-primary w-full"
          >
            Calculate
          </button>
        </div>

        {/* Result */}
        {result && (
          <div className="result-box mt-6">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-2">
                {nthRoot === "2"
                  ? "Square root"
                  : nthRoot === "3"
                  ? "Cube root"
                  : `${nthRoot}th root`}{" "}
                of {number}:
              </div>
              <div className="result-value text-3xl">
                {result.simplified || result.value.toFixed(10).replace(/\.?0+$/, "")}
              </div>
              {result.simplified && (
                <div className="text-sm text-gray-500 mt-2">
                  {number} is a perfect{" "}
                  {nthRoot === "2" ? "square" : nthRoot === "3" ? "cube" : "power"}
                </div>
              )}
              {!result.simplified && (
                <div className="text-sm text-gray-500 mt-2">
                  ≈ {result.value.toFixed(4)}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Perfect squares reference */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-3">
            Perfect Squares Reference
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 text-sm">
            {commonRoots.map((item) => (
              <div
                key={item.value}
                className="bg-white p-2 rounded border text-center cursor-pointer hover:border-blue-400"
                onClick={() => {
                  setNumber(String(item.value));
                  setNthRoot("2");
                }}
              >
                <span className="text-gray-600">√{item.value}</span>
                <span className="mx-1">=</span>
                <span className="font-semibold">{item.sqrt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulas */}
        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Formulas</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Square root: √x = x^(1/2)</li>
            <li>Cube root: ∛x = x^(1/3)</li>
            <li>nth root: ⁿ√x = x^(1/n)</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
