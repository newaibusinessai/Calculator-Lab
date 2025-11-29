"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("simple-interest-calculator")!;

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<{
    simpleInterest: number;
    totalAmount: number;
    principalAmount: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t) || p <= 0 || r <= 0 || t <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    // Simple Interest Formula: SI = P × r × t
    const simpleInterest = p * r * t;
    const totalAmount = p + simpleInterest;

    setResult({
      simpleInterest,
      totalAmount,
      principalAmount: p,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  const faqs = [
    {
      question: "What is simple interest?",
      answer: "Simple interest is interest calculated only on the principal amount (initial sum) throughout the entire loan or investment period. Unlike compound interest, it does not include interest on previously earned interest."
    },
    {
      question: "When is simple interest used?",
      answer: "Simple interest is commonly used for short-term loans, certain bonds, and some savings accounts. It's simpler to calculate and is often used for car loans, personal loans, and mortgages in their basic form."
    },
    {
      question: "How do I calculate simple interest?",
      answer: "Simple interest is calculated using the formula: SI = P × r × t, where P is the principal amount, r is the annual interest rate (as a decimal), and t is the time period in years."
    },
    {
      question: "Is simple interest better than compound interest?",
      answer: "For borrowers, simple interest is better as you pay less total interest. For investors, compound interest is better as your money grows faster. Simple interest grows linearly while compound interest grows exponentially."
    }
  ];

  const howTo = [
    "Enter the principal amount (initial sum of money)",
    "Input the annual interest rate as a percentage",
    "Specify the time period in years",
    "Click 'Calculate' to see the simple interest and total amount",
    "Review the results showing interest earned and final total",
    "Compare with compound interest to see the difference"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="SI = P × r × t, where SI = simple interest, P = principal amount, r = annual interest rate (decimal), t = time in years. Total Amount = P + SI"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Principal Amount ($)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="calc-input"
              placeholder="e.g., 5000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="calc-input"
              placeholder="e.g., 4.5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              step="0.1"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="calc-input"
              placeholder="e.g., 3"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Simple Interest
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Simple Interest:</span>
                <span className="text-2xl font-bold text-blue-700">
                  {formatCurrency(result.simpleInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Principal Amount:</span>
                <span className="text-lg font-semibold text-gray-800">
                  {formatCurrency(result.principalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-lg font-semibold text-green-700">
                  {formatCurrency(result.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
