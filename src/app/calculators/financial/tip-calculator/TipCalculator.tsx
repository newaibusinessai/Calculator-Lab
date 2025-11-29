"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("tip-calculator")!;

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercentage, setTipPercentage] = useState("18");
  const [numberOfPeople, setNumberOfPeople] = useState("1");
  const [result, setResult] = useState<{
    tipAmount: number;
    totalAmount: number;
    perPersonTotal: number;
    perPersonTip: number;
  } | null>(null);

  const calculate = () => {
    const bill = parseFloat(billAmount);
    const tipPercent = parseFloat(tipPercentage) / 100;
    const people = parseFloat(numberOfPeople);

    if (isNaN(bill) || isNaN(tipPercent) || isNaN(people) || bill <= 0 || people <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    // Tip calculation: tip = bill × tip percentage
    const tipAmount = bill * tipPercent;
    const totalAmount = bill + tipAmount;
    const perPersonTotal = totalAmount / people;
    const perPersonTip = tipAmount / people;

    setResult({
      tipAmount,
      totalAmount,
      perPersonTotal,
      perPersonTip,
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
      question: "What is the standard tip percentage?",
      answer: "In the United States, standard tipping is 15-20% for good service at restaurants. 15% is considered acceptable, 18-20% is typical for good service, and 20%+ is for exceptional service. For poor service, 10% or less may be appropriate."
    },
    {
      question: "Should I tip on the pre-tax or post-tax amount?",
      answer: "While either is acceptable, most people calculate tips based on the pre-tax amount. However, calculating on the post-tax amount results in a slightly larger tip, which servers appreciate. The difference is usually minimal."
    },
    {
      question: "When should I tip more than 20%?",
      answer: "Consider tipping 20-25% or more for exceptional service, complicated orders, large groups, during busy times, or if you received complimentary items. Also tip more generously during holidays or if you're a regular customer."
    },
    {
      question: "Do I need to tip for takeout orders?",
      answer: "While not mandatory, 10-15% is appreciated for takeout, especially if the restaurant packaged your order carefully or you had special requests. For delivery, 15-20% is standard. Some restaurants add a service charge for large orders."
    }
  ];

  const howTo = [
    "Enter the total bill amount before tip",
    "Select or enter your desired tip percentage (15%, 18%, 20%, or custom)",
    "Input the number of people splitting the bill",
    "Click 'Calculate' to see tip amount and total",
    "View the per-person breakdown if splitting the bill",
    "Round up or down as desired for convenience"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Tip Amount = Bill × Tip Percentage; Total = Bill + Tip; Per Person = Total ÷ Number of People"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bill Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="calc-input"
              placeholder="e.g., 85.50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip Percentage (%)
            </label>
            <select
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              className="calc-input"
            >
              <option value="10">10%</option>
              <option value="15">15%</option>
              <option value="18">18%</option>
              <option value="20">20%</option>
              <option value="25">25%</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of People
            </label>
            <input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              className="calc-input"
              placeholder="e.g., 4"
            />
          </div>
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Custom Tip Percentage (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={tipPercentage}
              onChange={(e) => setTipPercentage(e.target.value)}
              className="calc-input"
              placeholder="Enter custom percentage"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Tip
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tip Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tip Amount:</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.tipAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total with Tip:</span>
                <span className="text-xl font-semibold text-blue-700">
                  {formatCurrency(result.totalAmount)}
                </span>
              </div>
              {parseFloat(numberOfPeople) > 1 && (
                <>
                  <div className="border-t pt-3 mt-3">
                    <p className="text-sm text-gray-500 mb-2">Per Person:</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total per Person:</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {formatCurrency(result.perPersonTotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tip per Person:</span>
                    <span className="text-lg font-semibold text-gray-600">
                      {formatCurrency(result.perPersonTip)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
