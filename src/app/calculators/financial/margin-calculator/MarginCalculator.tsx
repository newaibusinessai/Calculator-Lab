"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("margin-calculator")!;

export default function MarginCalculator() {
  const [cost, setCost] = useState("");
  const [revenue, setRevenue] = useState("");
  const [result, setResult] = useState<{
    grossProfit: number;
    profitMargin: number;
    markup: number;
  } | null>(null);

  const calculate = () => {
    const costPrice = parseFloat(cost);
    const sellingPrice = parseFloat(revenue);

    if (isNaN(costPrice) || isNaN(sellingPrice) || costPrice <= 0 || sellingPrice <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    if (costPrice > sellingPrice) {
      alert("Warning: Cost exceeds revenue - this results in a loss");
    }

    // Gross Profit = Revenue - Cost
    const grossProfit = sellingPrice - costPrice;

    // Profit Margin = (Gross Profit / Revenue) × 100
    const profitMargin = (grossProfit / sellingPrice) * 100;

    // Markup = (Gross Profit / Cost) × 100
    const markup = (grossProfit / costPrice) * 100;

    setResult({
      grossProfit,
      profitMargin,
      markup,
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
      question: "What's the difference between margin and markup?",
      answer: "Margin is profit as a percentage of selling price: (Profit ÷ Revenue) × 100. Markup is profit as a percentage of cost: (Profit ÷ Cost) × 100. A 50% markup equals a 33.3% margin. Margin is always lower than markup for the same profit amount."
    },
    {
      question: "What is a good profit margin?",
      answer: "It varies by industry. Retail typically sees 2-5%, restaurants 3-6%, software/SaaS 70-90%, and professional services 15-20%. Higher margins generally indicate better profitability, but very high margins may attract competition."
    },
    {
      question: "How do I calculate selling price from desired margin?",
      answer: "Use the formula: Selling Price = Cost ÷ (1 - Desired Margin). For example, if cost is $100 and you want a 30% margin: $100 ÷ (1 - 0.30) = $142.86 selling price."
    },
    {
      question: "What's the difference between gross margin and net margin?",
      answer: "Gross margin is (Revenue - Cost of Goods Sold) ÷ Revenue. Net margin is (Revenue - All Expenses) ÷ Revenue. Net margin accounts for operating expenses, taxes, and interest, giving a complete picture of profitability."
    }
  ];

  const howTo = [
    "Enter the cost of the product or service",
    "Input the selling price (revenue) per unit",
    "Click 'Calculate' to see profit metrics",
    "View gross profit (revenue minus cost)",
    "Review profit margin percentage",
    "Check markup percentage for pricing strategy"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Gross Profit = Revenue - Cost; Profit Margin = (Gross Profit ÷ Revenue) × 100; Markup = (Gross Profit ÷ Cost) × 100"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cost Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className="calc-input"
              placeholder="e.g., 50.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selling Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="calc-input"
              placeholder="e.g., 75.00"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Margin
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Profit Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gross Profit:</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.grossProfit)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Profit Margin:</span>
                <span className="text-xl font-semibold text-blue-700">
                  {result.profitMargin.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Markup:</span>
                <span className="text-xl font-semibold text-purple-700">
                  {result.markup.toFixed(2)}%
                </span>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  {result.profitMargin >= 20
                    ? "Excellent margin! Your pricing strategy is strong."
                    : result.profitMargin >= 10
                    ? "Good margin. Consider opportunities to optimize further."
                    : result.profitMargin >= 0
                    ? "Low margin. Review costs or consider price increases."
                    : "Negative margin - you're losing money on this sale."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
