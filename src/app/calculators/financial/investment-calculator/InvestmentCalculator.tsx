"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("investment-calculator")!;

export default function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [investmentYears, setInvestmentYears] = useState("20");

  const [result, setResult] = useState<{
    finalValue: number;
    totalContributions: number;
    totalInterest: number;
    yearlyData: Array<{
      year: number;
      contributions: number;
      interest: number;
      balance: number;
    }>;
  } | null>(null);

  const calculate = () => {
    const P = parseFloat(initialInvestment) || 0;
    const PMT = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(annualReturn) / 100;
    const t = parseInt(investmentYears);

    if (isNaN(r) || isNaN(t)) return;

    const monthlyRate = r / 12;
    const totalMonths = t * 12;

    // Future value with initial investment and monthly contributions
    // FV = P(1 + r)^n + PMT × ((1 + r)^n - 1) / r
    let balance = P;
    const yearlyData: Array<{
      year: number;
      contributions: number;
      interest: number;
      balance: number;
    }> = [];

    let totalContributions = P;

    for (let year = 1; year <= t; year++) {
      const startBalance = balance;
      let yearInterest = 0;

      for (let month = 1; month <= 12; month++) {
        const monthInterest = balance * monthlyRate;
        yearInterest += monthInterest;
        balance += monthInterest + PMT;
        totalContributions += PMT;
      }

      yearlyData.push({
        year,
        contributions: totalContributions,
        interest: yearInterest,
        balance,
      });
    }

    const totalInterest = balance - totalContributions;

    setResult({
      finalValue: balance,
      totalContributions,
      totalInterest,
      yearlyData,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="max-w-2xl mx-auto">
        {/* Input form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Investment ($)
            </label>
            <input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              className="calc-input"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Contribution ($)
            </label>
            <input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(e.target.value)}
              className="calc-input"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expected Annual Return (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={annualReturn}
              onChange={(e) => setAnnualReturn(e.target.value)}
              className="calc-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Investment Period (Years)
            </label>
            <input
              type="number"
              value={investmentYears}
              onChange={(e) => setInvestmentYears(e.target.value)}
              className="calc-input"
            />
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
            <div className="result-box text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">
                Future Investment Value
              </div>
              <div className="text-4xl font-bold text-green-700">
                {formatCurrency(result.finalValue)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">
                  Total Contributions
                </div>
                <div className="text-xl font-bold text-blue-700">
                  {formatCurrency(result.totalContributions)}
                </div>
              </div>
              <div className="border rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">
                  Total Interest Earned
                </div>
                <div className="text-xl font-bold text-green-600">
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>
            </div>

            {/* Visual breakdown */}
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Contributions vs Earnings
              </div>
              <div className="h-10 rounded-full overflow-hidden flex">
                <div
                  className="bg-blue-500 flex items-center justify-center text-white text-xs"
                  style={{
                    width: `${(result.totalContributions / result.finalValue) * 100}%`,
                  }}
                >
                  {((result.totalContributions / result.finalValue) * 100).toFixed(0)}%
                </div>
                <div
                  className="bg-green-500 flex items-center justify-center text-white text-xs"
                  style={{
                    width: `${(result.totalInterest / result.finalValue) * 100}%`,
                  }}
                >
                  {((result.totalInterest / result.finalValue) * 100).toFixed(0)}%
                </div>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-blue-600">Contributions</span>
                <span className="text-green-600">Interest Earned</span>
              </div>
            </div>

            {/* Growth chart data */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Year</th>
                    <th className="border p-2 text-right">Total Contributed</th>
                    <th className="border p-2 text-right">Year Interest</th>
                    <th className="border p-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearlyData.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50">
                      <td className="border p-2">{row.year}</td>
                      <td className="border p-2 text-right text-blue-600">
                        {formatCurrency(row.contributions)}
                      </td>
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
          </>
        )}

        {/* Info */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">
            About This Calculator
          </h3>
          <p className="mb-2">
            This calculator shows the power of compound interest and regular
            contributions over time. Key assumptions:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Returns are compounded monthly</li>
            <li>Contributions are made at the end of each month</li>
            <li>The rate of return is constant (actual returns vary)</li>
            <li>Does not account for taxes or inflation</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
