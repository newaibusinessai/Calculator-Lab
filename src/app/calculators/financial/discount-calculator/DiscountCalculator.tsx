"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("discount-calculator")!;

export default function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [result, setResult] = useState<{
    discountAmount: number;
    finalPrice: number;
    savings: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage) / 100;

    if (isNaN(price) || isNaN(discount) || price <= 0 || discount < 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    if (discount > 1) {
      alert("Discount percentage cannot exceed 100%");
      return;
    }

    // Discount calculation: discount amount = original price × discount percentage
    const discountAmount = price * discount;
    const finalPrice = price - discountAmount;

    setResult({
      discountAmount,
      finalPrice,
      savings: discountAmount,
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
      question: "How do I calculate discount percentage?",
      answer: "To calculate discount percentage: (Discount Amount ÷ Original Price) × 100 = Discount Percentage. For example, if an item was $100 and is now $75, the discount is ($25 ÷ $100) × 100 = 25%."
    },
    {
      question: "What does 'buy one get one 50% off' mean?",
      answer: "This means you pay full price for the first item and get 50% off the second item. For two identical items, you're effectively getting 25% off the total (paying 75% of the combined original price)."
    },
    {
      question: "Can I combine multiple discounts?",
      answer: "This depends on the store's policy. Some allow stacking coupons and sales, while others don't. When discounts are combined, they're usually applied sequentially, not added together. A 20% discount followed by a 10% discount equals 28% off, not 30%."
    },
    {
      question: "What's the difference between discount and markup?",
      answer: "Discount reduces the price from the original (e.g., 20% off means you pay 80%). Markup increases the price from cost (e.g., 20% markup on $100 cost = $120 selling price). They're inverse operations."
    }
  ];

  const howTo = [
    "Enter the original price of the item",
    "Input the discount percentage being offered",
    "Click 'Calculate' to see the discount amount",
    "View your final price after discount",
    "See total savings from the discount",
    "Compare multiple discounts to find the best deal"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Discount Amount = Original Price × Discount Percentage; Final Price = Original Price - Discount Amount"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Original Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              className="calc-input"
              placeholder="e.g., 99.99"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Percentage (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(e.target.value)}
              className="calc-input"
              placeholder="e.g., 25"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Discount
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Discount Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Final Price:</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.finalPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Discount Amount:</span>
                <span className="text-lg font-semibold text-red-700">
                  -{formatCurrency(result.discountAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">You Save:</span>
                <span className="text-lg font-semibold text-blue-700">
                  {formatCurrency(result.savings)}
                </span>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  You save {((result.savings / (result.finalPrice + result.savings)) * 100).toFixed(1)}% off the original price!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
