"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("annuity-payout-calculator")!;

export default function AnnuityPayoutCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const interestRate = parseFloat(rate) / 100;
    const time = parseFloat(years);

    if (isNaN(principal) || isNaN(interestRate) || isNaN(time)) {
      setResult("Please enter valid numbers");
      return;
    }

    const futureValue = principal * Math.pow(1 + interestRate, time);
    setResult(`$${futureValue.toFixed(2)}`);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="calc-input"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="calc-input"
              placeholder="Enter rate"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Years
            </label>
            <input
              type="number"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="calc-input"
              placeholder="Enter years"
            />
          </div>
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
          <h3 className="font-semibold text-gray-800 mb-2">About Annuity Payout Calculator</h3>
          <p>Annuity payments.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
