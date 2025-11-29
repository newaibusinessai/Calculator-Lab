"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("split-bill-calculator")!;

export default function SplitBillCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [numPeople, setNumPeople] = useState("2");
  const [result, setResult] = useState<{
    perPerson: number;
    tipAmount: number;
    total: number;
  } | null>(null);

  const calculate = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercent);
    const people = parseFloat(numPeople);

    if (isNaN(bill) || isNaN(tip) || isNaN(people) || bill <= 0 || tip < 0 || people <= 0) {
      alert("Please enter valid numbers");
      return;
    }

    // Calculate tip amount
    const tipAmount = bill * (tip / 100);

    // Calculate total with tip
    const total = bill + tipAmount;

    // Calculate per person
    const perPerson = total / people;

    setResult({
      perPerson,
      tipAmount,
      total
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bill Amount ($)
            </label>
            <input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="calc-input"
              placeholder="Enter bill amount"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip (%)
            </label>
            <input
              type="number"
              value={tipPercent}
              onChange={(e) => setTipPercent(e.target.value)}
              className="calc-input"
              placeholder="Tip percentage"
              step="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of People
            </label>
            <input
              type="number"
              value={numPeople}
              onChange={(e) => setNumPeople(e.target.value)}
              className="calc-input"
              placeholder="Number of people"
              min="1"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Split
        </button>
        {result && (
          <div className="result-box">
            <div className="text-sm text-gray-600 mb-2 text-center">Amount Per Person</div>
            <div className="text-3xl font-bold text-green-700 text-center mb-3">
              ${result.perPerson.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Tip Amount:</span>
                <span className="font-semibold">${result.tipAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total with Tip:</span>
                <span className="font-semibold">${result.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Split Bill Calculator</h3>
          <p>Easily split restaurant bills between friends. Calculates tip and divides the total evenly among all people.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
