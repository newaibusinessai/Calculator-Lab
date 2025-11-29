"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("retirement-calculator")!;

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [currentSavings, setCurrentSavings] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [returnRate, setReturnRate] = useState("");
  const [result, setResult] = useState<{
    retirementSavings: number;
    totalContributions: number;
    investmentGrowth: number;
    yearsToRetirement: number;
  } | null>(null);

  const calculate = () => {
    const age = parseFloat(currentAge);
    const retAge = parseFloat(retirementAge);
    const savings = parseFloat(currentSavings);
    const monthly = parseFloat(monthlyContribution);
    const rate = parseFloat(returnRate) / 100;

    if (isNaN(age) || isNaN(retAge) || isNaN(savings) || isNaN(monthly) || isNaN(rate)) {
      alert("Please enter valid numbers");
      return;
    }

    if (age >= retAge) {
      alert("Retirement age must be greater than current age");
      return;
    }

    const years = retAge - age;
    const monthlyRate = rate / 12;
    const months = years * 12;

    // Future value of current savings: FV = PV(1 + r)^n
    const futureValueOfSavings = savings * Math.pow(1 + monthlyRate, months);

    // Future value of monthly contributions: FV = PMT × [((1 + r)^n - 1) / r]
    const futureValueOfContributions =
      monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    const retirementSavings = futureValueOfSavings + futureValueOfContributions;
    const totalContributions = savings + monthly * months;
    const investmentGrowth = retirementSavings - totalContributions;

    setResult({
      retirementSavings,
      totalContributions,
      investmentGrowth,
      yearsToRetirement: years,
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
      question: "How much should I save for retirement?",
      answer: "Financial experts generally recommend saving 10-15% of your pre-tax income for retirement. A common rule of thumb is to aim for 10-12 times your annual income by retirement age to maintain your lifestyle."
    },
    {
      question: "What is a realistic rate of return for retirement savings?",
      answer: "Historically, a diversified portfolio has returned 7-10% annually. Conservative estimates use 6-7% to account for inflation and market volatility. As you near retirement, you may shift to more conservative investments with lower returns."
    },
    {
      question: "At what age should I start saving for retirement?",
      answer: "The earlier, the better! Starting in your 20s gives compound interest more time to work. Even small contributions early on can grow significantly over 40+ years. If you're starting later, you'll need to save more aggressively."
    },
    {
      question: "What is the 4% rule for retirement?",
      answer: "The 4% rule suggests you can withdraw 4% of your retirement savings in the first year, then adjust for inflation each year, with a low risk of running out of money over a 30-year retirement."
    }
  ];

  const howTo = [
    "Enter your current age",
    "Input your desired retirement age",
    "Add your current retirement savings amount",
    "Enter how much you plan to contribute monthly",
    "Input your expected annual return rate (typically 6-8%)",
    "Click 'Calculate' to see your projected retirement savings",
    "Review total savings, contributions, and investment growth"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="FV = PV(1 + r)^n + PMT × [((1 + r)^n - 1) / r], where FV = future value, PV = present value, PMT = monthly payment, r = monthly interest rate, n = number of months"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Age
            </label>
            <input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="calc-input"
              placeholder="e.g., 30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retirement Age
            </label>
            <input
              type="number"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="calc-input"
              placeholder="e.g., 65"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Savings ($)
            </label>
            <input
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              className="calc-input"
              placeholder="e.g., 50000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="calc-input"
              placeholder="e.g., 500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={returnRate}
              onChange={(e) => setReturnRate(e.target.value)}
              className="calc-input"
              placeholder="e.g., 7"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Retirement Savings
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Retirement Projections ({result.yearsToRetirement} years)
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Projected Retirement Savings:</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.retirementSavings)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Contributions:</span>
                <span className="text-lg font-semibold text-gray-800">
                  {formatCurrency(result.totalContributions)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Investment Growth:</span>
                <span className="text-lg font-semibold text-blue-700">
                  {formatCurrency(result.investmentGrowth)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
