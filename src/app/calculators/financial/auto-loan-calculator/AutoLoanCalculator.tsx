"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("auto-loan-calculator")!;

export default function AutoLoanCalculator() {
  const [carPrice, setCarPrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [tradeInValue, setTradeInValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    loanAmount: number;
    totalInterest: number;
    totalCost: number;
  } | null>(null);

  const calculate = () => {
    const price = parseFloat(carPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const tradeIn = parseFloat(tradeInValue) || 0;
    const rate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);

    if (price <= 0 || isNaN(rate) || isNaN(years) || years <= 0) {
      alert("Please enter valid numbers for car price, interest rate, and loan term");
      return;
    }

    const loanAmount = price - down - tradeIn;

    if (loanAmount <= 0) {
      alert("Down payment and trade-in value exceed car price");
      return;
    }

    const monthlyRate = rate / 12;
    const numberOfPayments = years * 12;

    // Monthly Payment Formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    let monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      monthlyPayment =
        loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalCost = monthlyPayment * numberOfPayments;
    const totalInterest = totalCost - loanAmount;

    setResult({
      monthlyPayment,
      loanAmount,
      totalInterest,
      totalCost: totalCost + down + tradeIn,
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
      question: "How much should I put down on a car loan?",
      answer: "Financial experts typically recommend putting down at least 20% of the car's purchase price. This helps you avoid being upside down on the loan (owing more than the car is worth) and reduces your monthly payments and total interest paid."
    },
    {
      question: "What is a good interest rate for a car loan?",
      answer: "As of 2024, good auto loan rates range from 3% to 6% for new cars and 4% to 8% for used cars, depending on your credit score. Excellent credit (720+) typically qualifies for the best rates. Rates vary based on loan term, vehicle age, and lender."
    },
    {
      question: "Should I trade in my old car or sell it privately?",
      answer: "Selling privately often yields more money but requires more effort. Trading in is more convenient and can reduce sales tax in some states. Compare offers from dealerships with private sale estimates to make the best decision."
    },
    {
      question: "What loan term should I choose?",
      answer: "Shorter loan terms (36-48 months) mean higher monthly payments but less total interest. Longer terms (60-72 months) have lower payments but you'll pay significantly more in interest and risk being upside down longer. Choose the shortest term you can comfortably afford."
    }
  ];

  const howTo = [
    "Enter the total car purchase price",
    "Input your down payment amount (recommended 20% or more)",
    "Add any trade-in value from your current vehicle",
    "Enter the annual interest rate offered by your lender",
    "Specify the loan term in years (typically 3-6 years)",
    "Click 'Calculate' to see your monthly payment and total costs"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="M = P[r(1+r)^n]/[(1+r)^n-1], where M = monthly payment, P = loan amount (car price - down payment - trade-in), r = monthly interest rate, n = number of monthly payments"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Car Price ($)
            </label>
            <input
              type="number"
              value={carPrice}
              onChange={(e) => setCarPrice(e.target.value)}
              className="calc-input"
              placeholder="e.g., 30000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Down Payment ($)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              className="calc-input"
              placeholder="e.g., 6000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trade-In Value ($)
            </label>
            <input
              type="number"
              value={tradeInValue}
              onChange={(e) => setTradeInValue(e.target.value)}
              className="calc-input"
              placeholder="e.g., 5000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="calc-input"
              placeholder="e.g., 5.5"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Term (Years)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="calc-input"
              placeholder="e.g., 5"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Auto Loan
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Auto Loan Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.monthlyPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Loan Amount:</span>
                <span className="text-lg font-semibold text-gray-800">
                  {formatCurrency(result.loanAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Interest:</span>
                <span className="text-lg font-semibold text-red-700">
                  {formatCurrency(result.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Cost:</span>
                <span className="text-lg font-semibold text-blue-700">
                  {formatCurrency(result.totalCost)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
