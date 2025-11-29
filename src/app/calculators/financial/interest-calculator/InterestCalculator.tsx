"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("interest-calculator")!;

export default function InterestCalculator() {
  const [principal, setPrincipal] = useState("1000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("5");
  const [timeUnit, setTimeUnit] = useState<"years" | "months">("years");
  const [compounding, setCompounding] = useState("yearly");
  const [interestType, setInterestType] = useState<"simple" | "compound">("compound");

  const [result, setResult] = useState<{
    finalAmount: number;
    totalInterest: number;
    yearlyBreakdown: Array<{ year: number; balance: number; interest: number }>;
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = timeUnit === "months" ? parseFloat(time) / 12 : parseFloat(time);

    if (isNaN(P) || isNaN(r) || isNaN(t)) return;

    let finalAmount: number;
    let totalInterest: number;
    const yearlyBreakdown: Array<{ year: number; balance: number; interest: number }> = [];

    if (interestType === "simple") {
      // Simple interest: A = P(1 + rt)
      totalInterest = P * r * t;
      finalAmount = P + totalInterest;

      // Yearly breakdown for simple interest
      for (let year = 1; year <= Math.ceil(t); year++) {
        const yearsToCalc = Math.min(year, t);
        const interest = P * r * yearsToCalc;
        yearlyBreakdown.push({
          year,
          balance: P + interest,
          interest: P * r,
        });
      }
    } else {
      // Compound interest: A = P(1 + r/n)^(nt)
      let n: number;
      switch (compounding) {
        case "daily":
          n = 365;
          break;
        case "weekly":
          n = 52;
          break;
        case "monthly":
          n = 12;
          break;
        case "quarterly":
          n = 4;
          break;
        case "semiannually":
          n = 2;
          break;
        case "yearly":
        default:
          n = 1;
          break;
      }

      finalAmount = P * Math.pow(1 + r / n, n * t);
      totalInterest = finalAmount - P;

      // Yearly breakdown for compound interest
      for (let year = 1; year <= Math.ceil(t); year++) {
        const yearsToCalc = Math.min(year, t);
        const balance = P * Math.pow(1 + r / n, n * yearsToCalc);
        const prevBalance = year === 1 ? P : P * Math.pow(1 + r / n, n * (year - 1));
        yearlyBreakdown.push({
          year,
          balance,
          interest: balance - prevBalance,
        });
      }
    }

    setResult({ finalAmount, totalInterest, yearlyBreakdown });
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
        {/* Interest type toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setInterestType("simple")}
            className={`calc-btn flex-1 ${
              interestType === "simple" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Simple Interest
          </button>
          <button
            onClick={() => setInterestType("compound")}
            className={`calc-btn flex-1 ${
              interestType === "compound" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Compound Interest
          </button>
        </div>

        {/* Input form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Principal Amount ($)
            </label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="calc-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="calc-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time Period
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="calc-input flex-1"
              />
              <select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value as "years" | "months")}
                className="calc-input w-28"
              >
                <option value="years">Years</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          {interestType === "compound" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compounding Frequency
              </label>
              <select
                value={compounding}
                onChange={(e) => setCompounding(e.target.value)}
                className="calc-input"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="semiannually">Semi-annually</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="result-box text-center">
                <div className="text-sm text-gray-600 mb-1">Final Amount</div>
                <div className="result-value">
                  {formatCurrency(result.finalAmount)}
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Total Interest Earned</div>
                <div className="text-2xl font-bold text-blue-700">
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>
            </div>

            {/* Visual breakdown */}
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Principal vs Interest
              </div>
              <div className="h-8 rounded-full overflow-hidden flex">
                <div
                  className="bg-blue-500"
                  style={{
                    width: `${(parseFloat(principal) / result.finalAmount) * 100}%`,
                  }}
                />
                <div
                  className="bg-green-400"
                  style={{
                    width: `${(result.totalInterest / result.finalAmount) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-blue-600">
                  Principal: {formatCurrency(parseFloat(principal))}
                </span>
                <span className="text-green-600">
                  Interest: {formatCurrency(result.totalInterest)}
                </span>
              </div>
            </div>

            {/* Yearly breakdown table */}
            {result.yearlyBreakdown.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 text-left">Year</th>
                      <th className="border p-2 text-right">Interest Earned</th>
                      <th className="border p-2 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.yearlyBreakdown.map((row) => (
                      <tr key={row.year} className="hover:bg-gray-50">
                        <td className="border p-2">{row.year}</td>
                        <td className="border p-2 text-right text-green-600">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="border p-2 text-right font-medium">
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

        {/* Formulas */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Interest Formulas</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-gray-700">Simple Interest:</p>
              <p className="font-mono bg-white p-2 rounded">A = P(1 + rt)</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Compound Interest:</p>
              <p className="font-mono bg-white p-2 rounded">A = P(1 + r/n)^(nt)</p>
            </div>
            <p className="text-xs">
              Where: A = Final amount, P = Principal, r = Annual rate, t = Time in years, n = Compounding frequency
            </p>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
