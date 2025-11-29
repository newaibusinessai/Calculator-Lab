"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("mixed-fraction-calculator")!;

export default function MixedFractionCalculator() {
  const [whole1, setWhole1] = useState("");
  const [num1, setNum1] = useState("");
  const [den1, setDen1] = useState("");
  const [whole2, setWhole2] = useState("");
  const [num2, setNum2] = useState("");
  const [den2, setDen2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState<string | null>(null);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const simplifyFraction = (numerator: number, denominator: number) => {
    const divisor = gcd(numerator, denominator);
    return {
      num: numerator / divisor,
      den: denominator / divisor,
    };
  };

  const toImproperFraction = (whole: number, num: number, den: number) => {
    return whole * den + num;
  };

  const toMixedFraction = (num: number, den: number) => {
    const whole = Math.floor(Math.abs(num) / den);
    const remainder = Math.abs(num) % den;
    const sign = num < 0 ? "-" : "";
    return { sign, whole, num: remainder, den };
  };

  const calculate = () => {
    const w1 = parseFloat(whole1) || 0;
    const n1 = parseFloat(num1) || 0;
    const d1 = parseFloat(den1);
    const w2 = parseFloat(whole2) || 0;
    const n2 = parseFloat(num2) || 0;
    const d2 = parseFloat(den2);

    if (isNaN(d1) || isNaN(d2) || d1 === 0 || d2 === 0) {
      setResult("Please enter valid denominators (cannot be zero)");
      return;
    }

    // Convert to improper fractions
    const improper1 = toImproperFraction(w1, n1, d1);
    const improper2 = toImproperFraction(w2, n2, d2);

    let resultNum: number;
    let resultDen: number;

    switch (operation) {
      case "+":
        resultNum = improper1 * d2 + improper2 * d1;
        resultDen = d1 * d2;
        break;
      case "-":
        resultNum = improper1 * d2 - improper2 * d1;
        resultDen = d1 * d2;
        break;
      case "*":
        resultNum = improper1 * improper2;
        resultDen = d1 * d2;
        break;
      case "/":
        if (improper2 === 0) {
          setResult("Cannot divide by zero");
          return;
        }
        resultNum = improper1 * d2;
        resultDen = d1 * improper2;
        break;
      default:
        setResult("Invalid operation");
        return;
    }

    // Simplify
    const simplified = simplifyFraction(resultNum, resultDen);
    const mixed = toMixedFraction(simplified.num, simplified.den);

    if (mixed.whole === 0 && mixed.num === 0) {
      setResult("0");
    } else if (mixed.whole === 0) {
      setResult(`${mixed.sign}${mixed.num}/${mixed.den}`);
    } else if (mixed.num === 0) {
      setResult(`${mixed.sign}${mixed.whole}`);
    } else {
      setResult(`${mixed.sign}${mixed.whole} ${mixed.num}/${mixed.den}`);
    }
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg bg-gray-50">
            <div className="text-sm font-medium text-gray-700 mb-3">First Mixed Fraction</div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Whole</label>
                <input
                  type="number"
                  value={whole1}
                  onChange={(e) => setWhole1(e.target.value)}
                  className="calc-input"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Numerator</label>
                <input
                  type="number"
                  value={num1}
                  onChange={(e) => setNum1(e.target.value)}
                  className="calc-input"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Denominator</label>
                <input
                  type="number"
                  value={den1}
                  onChange={(e) => setDen1(e.target.value)}
                  className="calc-input"
                  placeholder="1"
                />
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg bg-gray-50">
            <div className="text-sm font-medium text-gray-700 mb-3">Second Mixed Fraction</div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Whole</label>
                <input
                  type="number"
                  value={whole2}
                  onChange={(e) => setWhole2(e.target.value)}
                  className="calc-input"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Numerator</label>
                <input
                  type="number"
                  value={num2}
                  onChange={(e) => setNum2(e.target.value)}
                  className="calc-input"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Denominator</label>
                <input
                  type="number"
                  value={den2}
                  onChange={(e) => setDen2(e.target.value)}
                  className="calc-input"
                  placeholder="1"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="calc-input"
          >
            <option value="+">Add (+)</option>
            <option value="-">Subtract (-)</option>
            <option value="*">Multiply (×)</option>
            <option value="/">Divide (÷)</option>
          </select>
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
          <h3 className="font-semibold text-gray-800 mb-2">About Mixed Fraction Calculator</h3>
          <p>Perform operations with mixed fractions. Automatically simplifies results and displays in mixed number format.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
