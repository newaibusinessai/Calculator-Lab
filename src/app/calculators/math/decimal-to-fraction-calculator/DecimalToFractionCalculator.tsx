"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("decimal-to-fraction-calculator")!;

export default function DecimalToFractionCalculator() {
  const [decimal, setDecimal] = useState("");
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

  const decimalToFraction = (decimal: number) => {
    const tolerance = 1.0e-10;
    let numerator = 1;
    let denominator = 1;
    let fraction = numerator / denominator;

    // Handle whole numbers
    if (Math.abs(decimal - Math.round(decimal)) < tolerance) {
      return { numerator: Math.round(decimal), denominator: 1 };
    }

    // Find decimal places
    const decimalStr = decimal.toString();
    const decimalPlaces = decimalStr.includes('.') ? decimalStr.split('.')[1].length : 0;

    // Convert to fraction
    numerator = Math.round(decimal * Math.pow(10, decimalPlaces));
    denominator = Math.pow(10, decimalPlaces);

    // Simplify
    const divisor = gcd(numerator, denominator);

    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor,
    };
  };

  const calculate = () => {
    const value = parseFloat(decimal);

    if (isNaN(value)) {
      setResult("Please enter a valid decimal number");
      return;
    }

    const isNegative = value < 0;
    const absValue = Math.abs(value);

    // Extract whole number part
    const wholePart = Math.floor(absValue);
    const fractionalPart = absValue - wholePart;

    if (fractionalPart === 0) {
      setResult(`${isNegative ? '-' : ''}${wholePart}`);
      return;
    }

    const { numerator, denominator } = decimalToFraction(fractionalPart);

    if (wholePart === 0) {
      setResult(`${isNegative ? '-' : ''}${numerator}/${denominator}`);
    } else {
      setResult(`${isNegative ? '-' : ''}${wholePart} ${numerator}/${denominator}`);
    }
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Decimal Number
          </label>
          <input
            type="number"
            step="any"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value)}
            className="calc-input"
            placeholder="Enter decimal (e.g., 0.75, 2.5)"
          />
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Convert to Fraction
        </button>
        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">Fraction</div>
            <div className="text-3xl font-bold text-green-700">{result}</div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Decimal to Fraction Calculator</h3>
          <p>Convert decimal numbers to fractions in simplest form. Automatically simplifies and displays as mixed numbers when applicable.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
