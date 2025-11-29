"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("roman-numeral-converter")!;

export default function RomanNumeralConverter() {
  const [mode, setMode] = useState<'toRoman' | 'toNumber'>('toRoman');
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const numberToRoman = (num: number): string => {
    if (num < 1 || num > 3999) {
      return "Number must be between 1 and 3999";
    }

    const romanNumerals: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
    ];

    let result = '';
    for (const [value, numeral] of romanNumerals) {
      while (num >= value) {
        result += numeral;
        num -= value;
      }
    }
    return result;
  };

  const romanToNumber = (roman: string): number => {
    const romanValues: { [key: string]: number } = {
      'I': 1, 'V': 5, 'X': 10, 'L': 50,
      'C': 100, 'D': 500, 'M': 1000
    };

    let result = 0;
    const upperRoman = roman.toUpperCase();

    for (let i = 0; i < upperRoman.length; i++) {
      const current = romanValues[upperRoman[i]];
      const next = romanValues[upperRoman[i + 1]];

      if (!current) {
        return -1; // Invalid character
      }

      if (next && current < next) {
        result -= current;
      } else {
        result += current;
      }
    }

    return result;
  };

  const convert = () => {
    if (!input.trim()) {
      alert("Please enter a value");
      return;
    }

    if (mode === 'toRoman') {
      const num = parseInt(input);
      if (isNaN(num)) {
        alert("Please enter a valid number");
        return;
      }
      if (num < 1 || num > 3999) {
        alert("Number must be between 1 and 3999");
        return;
      }
      setResult(numberToRoman(num));
    } else {
      const num = romanToNumber(input);
      if (num === -1) {
        alert("Invalid Roman numeral");
        return;
      }
      setResult(num.toString());
    }
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Convert
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMode('toRoman')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                mode === 'toRoman'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Number to Roman
            </button>
            <button
              onClick={() => setMode('toNumber')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                mode === 'toNumber'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Roman to Number
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'toRoman' ? 'Enter Number (1-3999)' : 'Enter Roman Numeral'}
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="calc-input"
            placeholder={mode === 'toRoman' ? '2024' : 'MMXXIV'}
          />
        </div>

        <button onClick={convert} className="calc-btn calc-btn-primary w-full">
          Convert
        </button>

        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-2">Result</div>
            <div className="text-4xl font-bold text-green-700">
              {result}
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Roman Numeral Converter</h3>
          <p>Convert between Arabic numbers (1-3999) and Roman numerals. Roman numerals use letters: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.</p>
          <div className="mt-2 text-xs">
            <strong>Examples:</strong> 4=IV, 9=IX, 40=XL, 90=XC, 400=CD, 900=CM, 2024=MMXXIV
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
