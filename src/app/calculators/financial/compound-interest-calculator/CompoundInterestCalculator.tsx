"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("compound-interest-calculator")!;

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState<{
    futureValue: number;
    totalInterest: number;
    principalAmount: number;
  } | null>(null);

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n) || p <= 0 || r <= 0 || t <= 0 || n <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const futureValue = p * Math.pow(1 + r / n, n * t);
    const totalInterest = futureValue - p;

    setResult({
      futureValue,
      totalInterest,
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
      question: "What is compound interest?",
      answer: "Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods. It's essentially 'interest on interest' and makes a sum grow faster than simple interest."
    },
    {
      question: "How is compound interest different from simple interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal plus any interest already earned. This means compound interest grows exponentially over time."
    },
    {
      question: "What does compounding frequency mean?",
      answer: "Compounding frequency refers to how often interest is calculated and added to the principal. Common frequencies are annually (1), semi-annually (2), quarterly (4), monthly (12), or daily (365). More frequent compounding results in higher returns."
    },
    {
      question: "What is a good interest rate for investments?",
      answer: "A good rate varies by investment type. Savings accounts typically offer 0.5-2%, while stock market historical average is around 7-10% annually. Higher returns usually come with higher risk."
    }
  ];

  const howTo = [
    "Enter your initial principal amount (starting investment)",
    "Input the annual interest rate as a percentage",
    "Specify the time period in years",
    "Select the compounding frequency (how often interest is calculated)",
    "Click 'Calculate' to see your future value and total interest earned",
    "The result shows your final amount, interest earned, and principal invested"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="A = P(1 + r/n)^(nt), where A = final amount, P = principal, r = annual interest rate (decimal), n = compounding frequency per year, t = time in years"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Principal Amount ($)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="calc-input"
              placeholder="e.g., 10000"
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
              placeholder="e.g., 5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (Years)
            </label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="calc-input"
              placeholder="e.g., 10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Compounding Frequency
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="calc-input"
            >
              <option value="1">Annually</option>
              <option value="2">Semi-annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Compound Interest
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Results</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Future Value:</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.futureValue)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Principal Amount:</span>
                <span className="text-lg font-semibold text-gray-800">
                  {formatCurrency(result.principalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Interest Earned:</span>
                <span className="text-lg font-semibold text-blue-700">
                  {formatCurrency(result.totalInterest)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
