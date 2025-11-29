"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("fraction-calculator")!;

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function simplifyFraction(num: number, den: number): [number, number] {
  if (den === 0) return [num, den];
  const divisor = gcd(num, den);
  const sign = den < 0 ? -1 : 1;
  return [(num / divisor) * sign, Math.abs(den / divisor)];
}

export default function FractionCalculator() {
  const [num1, setNum1] = useState("");
  const [den1, setDen1] = useState("");
  const [num2, setNum2] = useState("");
  const [den2, setDen2] = useState("");
  const [operation, setOperation] = useState<"+" | "-" | "×" | "÷">("+");
  const [result, setResult] = useState<{
    num: number;
    den: number;
    decimal: number;
  } | null>(null);

  const calculate = () => {
    const n1 = parseInt(num1) || 0;
    const d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0;
    const d2 = parseInt(den2) || 1;

    if (d1 === 0 || d2 === 0) {
      alert("Denominator cannot be zero");
      return;
    }

    let resultNum: number;
    let resultDen: number;

    switch (operation) {
      case "+":
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case "-":
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case "×":
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case "÷":
        if (n2 === 0) {
          alert("Cannot divide by zero");
          return;
        }
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
      default:
        return;
    }

    const [simplifiedNum, simplifiedDen] = simplifyFraction(resultNum, resultDen);
    setResult({
      num: simplifiedNum,
      den: simplifiedDen,
      decimal: simplifiedNum / simplifiedDen,
    });
  };

  const FractionInput = ({
    numValue,
    denValue,
    onNumChange,
    onDenChange,
    label,
  }: {
    numValue: string;
    denValue: string;
    onNumChange: (v: string) => void;
    onDenChange: (v: string) => void;
    label: string;
  }) => (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-500 mb-1">{label}</span>
      <div className="flex flex-col items-center">
        <input
          type="number"
          value={numValue}
          onChange={(e) => onNumChange(e.target.value)}
          className="calc-input w-20 text-center"
          placeholder="0"
        />
        <div className="w-16 h-px bg-gray-800 my-1"></div>
        <input
          type="number"
          value={denValue}
          onChange={(e) => onDenChange(e.target.value)}
          className="calc-input w-20 text-center"
          placeholder="1"
        />
      </div>
    </div>
  );

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="max-w-lg mx-auto">
        {/* Calculator */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <FractionInput
            numValue={num1}
            denValue={den1}
            onNumChange={setNum1}
            onDenChange={setDen1}
            label="Fraction 1"
          />

          {/* Operation selector */}
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-1">Operation</span>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as typeof operation)}
              className="calc-input w-16 text-center text-xl"
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="×">×</option>
              <option value="÷">÷</option>
            </select>
          </div>

          <FractionInput
            numValue={num2}
            denValue={den2}
            onNumChange={setNum2}
            onDenChange={setDen2}
            label="Fraction 2"
          />

          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 mb-1">&nbsp;</span>
            <button onClick={calculate} className="calc-btn calc-btn-primary h-20">
              Calculate
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="result-box text-center">
            <div className="text-lg text-gray-600 mb-2">Result:</div>
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold text-green-700">
                  {result.num}
                </span>
                <div className="w-12 h-1 bg-green-700 my-1"></div>
                <span className="text-3xl font-bold text-green-700">
                  {result.den}
                </span>
              </div>
              <span className="text-2xl text-gray-400">=</span>
              <span className="text-2xl font-semibold text-gray-700">
                {result.decimal.toFixed(6).replace(/\.?0+$/, "")}
              </span>
            </div>
            {result.den !== 1 && (
              <div className="mt-2 text-sm text-gray-500">
                (Simplified from {num1 && den1 ? `${num1}/${den1}` : "0/1"}{" "}
                {operation} {num2 && den2 ? `${num2}/${den2}` : "0/1"})
              </div>
            )}
          </div>
        )}

        {/* How it works */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">How It Works</h3>
          <div className="space-y-2">
            <p>
              <strong>Addition/Subtraction:</strong> Find common denominator,
              then add/subtract numerators.
            </p>
            <p>
              <strong>Multiplication:</strong> Multiply numerators together and
              denominators together.
            </p>
            <p>
              <strong>Division:</strong> Multiply by the reciprocal of the
              second fraction.
            </p>
            <p>
              Results are automatically simplified to the lowest terms.
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
