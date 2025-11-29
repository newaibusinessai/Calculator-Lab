"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("roi-calculator")!;

export default function RoiCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [result, setResult] = useState<{
    roi: number;
    netProfit: number;
    annualizedROI: number;
  } | null>(null);

  const calculate = () => {
    const investment = parseFloat(initialInvestment);
    const value = parseFloat(finalValue);
    const years = parseFloat(timePeriod);

    if (isNaN(investment) || isNaN(value) || investment <= 0 || value <= 0) {
      alert("Please enter valid positive numbers for investment and final value");
      return;
    }

    // ROI = (Final Value - Initial Investment) / Initial Investment × 100
    const netProfit = value - investment;
    const roi = (netProfit / investment) * 100;

    // Annualized ROI = [(Final Value / Initial Investment)^(1/years) - 1] × 100
    let annualizedROI = 0;
    if (!isNaN(years) && years > 0) {
      annualizedROI = (Math.pow(value / investment, 1 / years) - 1) * 100;
    }

    setResult({
      roi,
      netProfit,
      annualizedROI,
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
      question: "What is ROI and how is it calculated?",
      answer: "ROI (Return on Investment) measures the profitability of an investment. It's calculated as: (Final Value - Initial Investment) ÷ Initial Investment × 100. For example, investing $1,000 and receiving $1,500 gives an ROI of 50%."
    },
    {
      question: "What's the difference between ROI and annualized ROI?",
      answer: "ROI shows total return regardless of time period, while annualized ROI shows the average yearly return. A 100% ROI over 10 years equals about 7.2% annualized ROI. Annualized ROI is better for comparing investments held for different time periods."
    },
    {
      question: "What is a good ROI?",
      answer: "It depends on the investment type and risk. Stock market historical average is 7-10% annually. Real estate typically sees 8-12%. High-risk investments may target 15%+ annually. Generally, higher returns come with higher risk."
    },
    {
      question: "Should I consider inflation when calculating ROI?",
      answer: "Yes, for a complete picture. Real ROI = Nominal ROI - Inflation Rate. If you earn 8% ROI but inflation is 3%, your real return is about 5%. This shows your actual purchasing power gain."
    }
  ];

  const howTo = [
    "Enter your initial investment amount",
    "Input the final value of your investment",
    "Optionally add the time period in years for annualized ROI",
    "Click 'Calculate' to see your return on investment",
    "Review ROI percentage and net profit",
    "Compare annualized ROI if you entered a time period"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="ROI = [(Final Value - Initial Investment) ÷ Initial Investment] × 100; Annualized ROI = [(Final Value ÷ Initial Investment)^(1/years) - 1] × 100"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Investment ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="calc-input"
              placeholder="e.g., 10000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Final Value ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={finalValue}
              onChange={(e) => setFinalValue(e.target.value)}
              className="calc-input"
              placeholder="e.g., 15000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Period (Years) - Optional
            </label>
            <input
              type="number"
              step="0.1"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="calc-input"
              placeholder="e.g., 5"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate ROI
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Returns</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total ROI:</span>
                <span className={`text-2xl font-bold ${result.roi >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {result.roi >= 0 ? '+' : ''}{result.roi.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Net Profit/Loss:</span>
                <span className={`text-xl font-semibold ${result.netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                  {result.netProfit >= 0 ? '+' : ''}{formatCurrency(result.netProfit)}
                </span>
              </div>
              {timePeriod && parseFloat(timePeriod) > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Annualized ROI:</span>
                  <span className={`text-xl font-semibold ${result.annualizedROI >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
                    {result.annualizedROI >= 0 ? '+' : ''}{result.annualizedROI.toFixed(2)}% per year
                  </span>
                </div>
              )}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  {result.roi >= 20
                    ? "Excellent return! Your investment performed very well."
                    : result.roi >= 10
                    ? "Good return. Your investment is performing above average."
                    : result.roi >= 0
                    ? "Positive return. Your investment is profitable."
                    : "Negative return. You're experiencing a loss on this investment."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
