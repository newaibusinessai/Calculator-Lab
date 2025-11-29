"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("loan-calculator")!;

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("10000");
  const [interestRate, setInterestRate] = useState("5");
  const [loanTerm, setLoanTerm] = useState("12");
  const [termType, setTermType] = useState<"months" | "years">("months");
  const [result, setResult] = useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
    amortization: AmortizationRow[];
  } | null>(null);
  const [showAmortization, setShowAmortization] = useState(false);

  const calculate = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const months =
      termType === "years"
        ? parseInt(loanTerm) * 12
        : parseInt(loanTerm);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(months)) {
      return;
    }

    const monthlyRate = annualRate / 12;

    let monthlyPayment: number;
    if (monthlyRate === 0) {
      monthlyPayment = principal / months;
    } else {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    // Generate amortization schedule
    const amortization: AmortizationRow[] = [];
    let balance = principal;

    for (let month = 1; month <= months; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      amortization.push({
        month,
        payment: monthlyPayment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance),
      });
    }

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      amortization,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="max-w-2xl mx-auto">
        {/* Input form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount ($)
            </label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="calc-input"
              placeholder="Enter loan amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="calc-input"
              placeholder="Enter interest rate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Term
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="calc-input"
              placeholder="Enter loan term"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Term Type
            </label>
            <select
              value={termType}
              onChange={(e) => setTermType(e.target.value as "months" | "years")}
              className="calc-input"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          className="calc-btn calc-btn-primary w-full mb-6"
        >
          Calculate
        </button>

        {/* Results */}
        {result && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="result-box text-center">
                <div className="text-sm text-gray-600 mb-1">Monthly Payment</div>
                <div className="result-value">
                  {formatCurrency(result.monthlyPayment)}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Total Payment</div>
                <div className="text-2xl font-bold text-blue-700">
                  {formatCurrency(result.totalPayment)}
                </div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>
            </div>

            {/* Visual breakdown */}
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Payment Breakdown
              </div>
              <div className="h-8 rounded-full overflow-hidden flex">
                <div
                  className="bg-green-500"
                  style={{
                    width: `${(parseFloat(loanAmount) / result.totalPayment) * 100}%`,
                  }}
                  title="Principal"
                />
                <div
                  className="bg-red-400"
                  style={{
                    width: `${(result.totalInterest / result.totalPayment) * 100}%`,
                  }}
                  title="Interest"
                />
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-green-600">
                  Principal: {formatCurrency(parseFloat(loanAmount))}
                </span>
                <span className="text-red-500">
                  Interest: {formatCurrency(result.totalInterest)}
                </span>
              </div>
            </div>

            {/* Amortization schedule toggle */}
            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="calc-btn w-full mb-4"
            >
              {showAmortization ? "Hide" : "Show"} Amortization Schedule
            </button>

            {showAmortization && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Month</th>
                      <th className="border p-2 text-right">Payment</th>
                      <th className="border p-2 text-right">Principal</th>
                      <th className="border p-2 text-right">Interest</th>
                      <th className="border p-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.amortization.map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50">
                        <td className="border p-2">{row.month}</td>
                        <td className="border p-2 text-right">
                          {formatCurrency(row.payment)}
                        </td>
                        <td className="border p-2 text-right text-green-600">
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="border p-2 text-right text-red-500">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="border p-2 text-right">
                          {formatCurrency(row.balance)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Formula explanation */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">How It Works</h3>
          <p className="mb-2">
            The monthly payment is calculated using the amortization formula:
          </p>
          <p className="font-mono bg-white p-2 rounded text-center mb-2">
            M = P × [r(1+r)^n] / [(1+r)^n - 1]
          </p>
          <ul className="list-disc list-inside">
            <li>M = Monthly payment</li>
            <li>P = Principal loan amount</li>
            <li>r = Monthly interest rate (annual rate / 12)</li>
            <li>n = Total number of payments</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
