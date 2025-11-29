"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("percentage-calculator")!;

export default function PercentageCalculator() {
  // What is X% of Y?
  const [percent1, setPercent1] = useState("");
  const [value1, setValue1] = useState("");
  const [result1, setResult1] = useState<number | null>(null);

  // X is what % of Y?
  const [value2a, setValue2a] = useState("");
  const [value2b, setValue2b] = useState("");
  const [result2, setResult2] = useState<number | null>(null);

  // Percentage change from X to Y
  const [value3a, setValue3a] = useState("");
  const [value3b, setValue3b] = useState("");
  const [result3, setResult3] = useState<number | null>(null);

  const calculatePercent1 = () => {
    const p = parseFloat(percent1);
    const v = parseFloat(value1);
    if (!isNaN(p) && !isNaN(v)) {
      setResult1((p / 100) * v);
    }
  };

  const calculatePercent2 = () => {
    const a = parseFloat(value2a);
    const b = parseFloat(value2b);
    if (!isNaN(a) && !isNaN(b) && b !== 0) {
      setResult2((a / b) * 100);
    }
  };

  const calculatePercent3 = () => {
    const a = parseFloat(value3a);
    const b = parseFloat(value3b);
    if (!isNaN(a) && !isNaN(b) && a !== 0) {
      setResult3(((b - a) / a) * 100);
    }
  };

  const formula = `1. X% of Y = (X/100) × Y
2. X is what % of Y = (X/Y) × 100
3. Percentage Change = ((New - Old) / Old) × 100`;

  const faqs = [
    {
      question: "How do I calculate a percentage of a number?",
      answer: "To find X% of a number Y, convert the percentage to a decimal by dividing by 100, then multiply by Y. For example, 25% of 80 = (25/100) × 80 = 0.25 × 80 = 20."
    },
    {
      question: "How do I calculate what percentage one number is of another?",
      answer: "Divide the first number by the second number, then multiply by 100. For example, to find what percent 15 is of 60: (15/60) × 100 = 25%."
    },
    {
      question: "How do I calculate percentage increase or decrease?",
      answer: "Use the formula: ((New Value - Old Value) / Old Value) × 100. A positive result means increase, negative means decrease. For example, from 50 to 75: ((75-50)/50) × 100 = 50% increase."
    },
    {
      question: "What's the difference between percentage and percentile?",
      answer: "A percentage is a fraction of 100, while a percentile indicates a value below which a certain percentage of data falls. For example, scoring in the 90th percentile means you scored higher than 90% of test-takers."
    },
    {
      question: "How do I add or subtract a percentage from a number?",
      answer: "To add X% to a number, multiply by (1 + X/100). To subtract, multiply by (1 - X/100). For example, adding 20% to 50: 50 × 1.20 = 60. Subtracting 20% from 50: 50 × 0.80 = 40."
    }
  ];

  const howTo = [
    "Choose the type of calculation you need from the three options",
    "Enter the values in the input fields",
    "Click 'Calculate' to see the result",
    "Use 'What is X% of Y' for finding a percentage of a value",
    "Use 'X is what % of Y' for finding what percentage one value is of another",
    "Use 'Percentage Change' for calculating increase or decrease between values"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-8">
        {/* Calculator 1: What is X% of Y? */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">
            What is X% of Y?
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <span>What is</span>
            <input
              type="number"
              value={percent1}
              onChange={(e) => setPercent1(e.target.value)}
              className="calc-input w-24"
              placeholder="X"
            />
            <span>% of</span>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="calc-input w-24"
              placeholder="Y"
            />
            <span>?</span>
            <button onClick={calculatePercent1} className="calc-btn calc-btn-primary">
              Calculate
            </button>
          </div>
          {result1 !== null && (
            <div className="result-box mt-4">
              <span className="text-gray-600">Answer: </span>
              <span className="result-value">{result1.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Calculator 2: X is what % of Y? */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">
            X is what percent of Y?
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              value={value2a}
              onChange={(e) => setValue2a(e.target.value)}
              className="calc-input w-24"
              placeholder="X"
            />
            <span>is what % of</span>
            <input
              type="number"
              value={value2b}
              onChange={(e) => setValue2b(e.target.value)}
              className="calc-input w-24"
              placeholder="Y"
            />
            <span>?</span>
            <button onClick={calculatePercent2} className="calc-btn calc-btn-primary">
              Calculate
            </button>
          </div>
          {result2 !== null && (
            <div className="result-box mt-4">
              <span className="text-gray-600">Answer: </span>
              <span className="result-value">{result2.toFixed(2)}%</span>
            </div>
          )}
        </div>

        {/* Calculator 3: Percentage change */}
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">
            Percentage Change
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <span>From</span>
            <input
              type="number"
              value={value3a}
              onChange={(e) => setValue3a(e.target.value)}
              className="calc-input w-24"
              placeholder="X"
            />
            <span>to</span>
            <input
              type="number"
              value={value3b}
              onChange={(e) => setValue3b(e.target.value)}
              className="calc-input w-24"
              placeholder="Y"
            />
            <button onClick={calculatePercent3} className="calc-btn calc-btn-primary">
              Calculate
            </button>
          </div>
          {result3 !== null && (
            <div className="result-box mt-4">
              <span className="text-gray-600">Change: </span>
              <span className={`result-value ${result3 >= 0 ? "text-green-600" : "text-red-600"}`}>
                {result3 >= 0 ? "+" : ""}
                {result3.toFixed(2)}%
              </span>
              <span className="text-gray-600 ml-2">
                ({result3 >= 0 ? "increase" : "decrease"})
              </span>
            </div>
          )}
        </div>

        {/* Information */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">
            About Percentage Calculations
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>X% of Y</strong>: Multiply Y by X/100
            </li>
            <li>
              <strong>X is what % of Y</strong>: Divide X by Y and multiply by
              100
            </li>
            <li>
              <strong>Percentage change</strong>: ((New - Old) / Old) × 100
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
