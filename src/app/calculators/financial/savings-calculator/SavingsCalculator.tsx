"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("savings-calculator")!;

export default function SavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [result, setResult] = useState<{
    futureValue: number;
    totalDeposits: number;
    totalInterest: number;
  } | null>(null);

  const calculate = () => {
    const initial = parseFloat(initialDeposit) || 0;
    const monthly = parseFloat(monthlyDeposit) || 0;
    const rate = parseFloat(interestRate) / 100;
    const years = parseFloat(timePeriod);

    if (isNaN(rate) || isNaN(years) || years <= 0) {
      alert("Please enter valid numbers");
      return;
    }

    const monthlyRate = rate / 12;
    const months = years * 12;

    // Future value of initial deposit: FV = PV(1 + r)^n
    const futureValueInitial = initial * Math.pow(1 + monthlyRate, months);

    // Future value of monthly deposits: FV = PMT × [((1 + r)^n - 1) / r]
    let futureValueMonthly = 0;
    if (monthly > 0) {
      if (monthlyRate === 0) {
        futureValueMonthly = monthly * months;
      } else {
        futureValueMonthly = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      }
    }

    const futureValue = futureValueInitial + futureValueMonthly;
    const totalDeposits = initial + monthly * months;
    const totalInterest = futureValue - totalDeposits;

    setResult({
      futureValue,
      totalDeposits,
      totalInterest,
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
      question: "How much should I save each month?",
      answer: "The 50/30/20 budget rule suggests allocating 20% of your after-tax income to savings and debt repayment. However, the ideal amount depends on your financial goals, living expenses, and income level. Start with what you can afford and increase gradually."
    },
    {
      question: "What is a good interest rate for a savings account?",
      answer: "As of 2024, high-yield savings accounts offer 4-5% APY, while traditional banks often offer 0.01-0.50%. Online banks typically offer better rates due to lower overhead costs. Shop around for the best rates and consider factors like fees and accessibility."
    },
    {
      question: "Should I save or invest my money?",
      answer: "It depends on your timeline and goals. For short-term goals (under 5 years) or emergency funds, use savings accounts for safety and liquidity. For long-term goals (5+ years), investing typically offers higher returns but comes with more risk."
    },
    {
      question: "How much should I have in emergency savings?",
      answer: "Financial experts recommend saving 3-6 months of living expenses in an easily accessible account. If you have irregular income or are the sole earner, aim for 6-12 months. This provides a buffer for job loss, medical emergencies, or unexpected expenses."
    }
  ];

  const howTo = [
    "Enter your initial deposit amount (starting balance)",
    "Input how much you plan to save each month",
    "Enter the annual interest rate (APY) of your savings account",
    "Specify the time period in years you'll be saving",
    "Click 'Calculate' to see your future savings",
    "Review total deposits, interest earned, and final balance"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="FV = PV(1 + r)^n + PMT × [((1 + r)^n - 1) / r], where FV = future value, PV = initial deposit, PMT = monthly deposit, r = monthly interest rate, n = number of months"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Deposit ($)
            </label>
            <input
              type="number"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(e.target.value)}
              className="calc-input"
              placeholder="e.g., 1000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Deposit ($)
            </label>
            <input
              type="number"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(e.target.value)}
              className="calc-input"
              placeholder="e.g., 200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
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
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="calc-input"
              placeholder="e.g., 10"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Savings Growth
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Savings Projection</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Future Value:</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.futureValue)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Deposits:</span>
                <span className="text-lg font-semibold text-gray-800">
                  {formatCurrency(result.totalDeposits)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Interest Earned:</span>
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
