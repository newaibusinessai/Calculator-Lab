"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("amortization-calculator")!;

export default function AmortizationCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    principalAmount: number;
  } | null>(null);

  const calculate = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const years = parseFloat(loanTerm);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate < 0 || years <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }

    const monthlyRate = annualRate / 12;
    const numberOfPayments = years * 12;

    // Monthly Payment Formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    let monthlyPayment;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment =
        principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principalAmount: principal,
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
      question: "What is loan amortization?",
      answer: "Loan amortization is the process of paying off a debt over time through regular payments. Each payment covers both principal and interest, with the proportion changing over time. Early payments are mostly interest, while later payments are mostly principal."
    },
    {
      question: "How is the monthly payment calculated?",
      answer: "The monthly payment is calculated using the formula M = P[r(1+r)^n]/[(1+r)^n-1], where M is the monthly payment, P is the principal, r is the monthly interest rate, and n is the number of payments."
    },
    {
      question: "What's the difference between fixed and variable rate mortgages?",
      answer: "Fixed-rate mortgages have the same interest rate throughout the loan term, resulting in consistent monthly payments. Variable-rate mortgages have interest rates that can change periodically, causing monthly payments to fluctuate."
    },
    {
      question: "Should I make extra principal payments?",
      answer: "Extra principal payments can significantly reduce the total interest paid and shorten your loan term. Even small additional payments early in the loan can save thousands of dollars in interest over time."
    }
  ];

  const howTo = [
    "Enter the total loan amount you're borrowing",
    "Input the annual interest rate as a percentage",
    "Specify the loan term in years (e.g., 15, 30)",
    "Click 'Calculate' to see your monthly payment",
    "Review the total payment amount and total interest",
    "Compare different scenarios by adjusting the inputs"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="M = P[r(1+r)^n]/[(1+r)^n-1], where M = monthly payment, P = principal loan amount, r = monthly interest rate, n = number of monthly payments"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="calc-input"
              placeholder="e.g., 250000"
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
              Loan Term (Years)
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="calc-input"
              placeholder="e.g., 30"
            />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Amortization
        </button>
        {result && (
          <div className="result-box">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly Payment:</span>
                <span className="text-2xl font-bold text-green-700">
                  {formatCurrency(result.monthlyPayment)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Principal Amount:</span>
                <span className="text-lg font-semibold text-gray-800">
                  {formatCurrency(result.principalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Interest:</span>
                <span className="text-lg font-semibold text-red-700">
                  {formatCurrency(result.totalInterest)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Payment:</span>
                <span className="text-lg font-semibold text-blue-700">
                  {formatCurrency(result.totalPayment)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
