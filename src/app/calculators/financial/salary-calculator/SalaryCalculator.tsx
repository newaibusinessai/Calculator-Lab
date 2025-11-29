"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("salary-calculator")!;

export default function SalaryCalculator() {
  const [amount, setAmount] = useState("50000");
  const [inputType, setInputType] = useState<"annual" | "monthly" | "biweekly" | "weekly" | "daily" | "hourly">("annual");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const [result, setResult] = useState<{
    hourly: number;
    daily: number;
    weekly: number;
    biweekly: number;
    monthly: number;
    annual: number;
  } | null>(null);

  const calculate = () => {
    const value = parseFloat(amount);
    const hrsPerWeek = parseFloat(hoursPerWeek);
    const wksPerYear = parseFloat(weeksPerYear);

    if (isNaN(value) || isNaN(hrsPerWeek) || isNaN(wksPerYear)) return;

    let annual: number;

    switch (inputType) {
      case "hourly":
        annual = value * hrsPerWeek * wksPerYear;
        break;
      case "daily":
        annual = value * (hrsPerWeek / 8) * wksPerYear; // Assuming 8-hour workday
        break;
      case "weekly":
        annual = value * wksPerYear;
        break;
      case "biweekly":
        annual = value * (wksPerYear / 2);
        break;
      case "monthly":
        annual = value * 12;
        break;
      case "annual":
      default:
        annual = value;
        break;
    }

    const weekly = annual / wksPerYear;
    const hourly = weekly / hrsPerWeek;
    const daily = weekly / 5; // 5-day workweek
    const biweekly = weekly * 2;
    const monthly = annual / 12;

    setResult({
      hourly,
      daily,
      weekly,
      biweekly,
      monthly,
      annual,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const SalaryCard = ({
    label,
    value,
    period,
    highlight = false,
  }: {
    label: string;
    value: number;
    period: string;
    highlight?: boolean;
  }) => (
    <div
      className={`border rounded-lg p-4 text-center ${
        highlight ? "bg-green-50 border-green-300" : "bg-white"
      }`}
    >
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div
        className={`text-xl font-bold ${
          highlight ? "text-green-700" : "text-gray-800"
        }`}
      >
        {formatCurrency(value)}
      </div>
      <div className="text-xs text-gray-500">{period}</div>
    </div>
  );

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="max-w-2xl mx-auto">
        {/* Input form */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Salary
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pay Period
              </label>
              <select
                value={inputType}
                onChange={(e) => setInputType(e.target.value as typeof inputType)}
                className="calc-input"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="annual">Annual</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hours Per Week
              </label>
              <input
                type="number"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(e.target.value)}
                className="calc-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weeks Per Year
              </label>
              <input
                type="number"
                value={weeksPerYear}
                onChange={(e) => setWeeksPerYear(e.target.value)}
                className="calc-input"
              />
            </div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <SalaryCard
              label="Hourly"
              value={result.hourly}
              period="per hour"
              highlight={inputType === "hourly"}
            />
            <SalaryCard
              label="Daily"
              value={result.daily}
              period="per day"
              highlight={inputType === "daily"}
            />
            <SalaryCard
              label="Weekly"
              value={result.weekly}
              period="per week"
              highlight={inputType === "weekly"}
            />
            <SalaryCard
              label="Bi-weekly"
              value={result.biweekly}
              period="every 2 weeks"
              highlight={inputType === "biweekly"}
            />
            <SalaryCard
              label="Monthly"
              value={result.monthly}
              period="per month"
              highlight={inputType === "monthly"}
            />
            <SalaryCard
              label="Annual"
              value={result.annual}
              period="per year"
              highlight={inputType === "annual"}
            />
          </div>
        )}

        {/* Comparison table */}
        {result && (
          <div className="mt-8">
            <h3 className="font-semibold text-gray-800 mb-3">
              Quick Reference
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 text-sm">
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="py-1">Working hours per year:</td>
                    <td className="text-right font-medium">
                      {(parseFloat(hoursPerWeek) * parseFloat(weeksPerYear)).toLocaleString()} hours
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1">Working days per year:</td>
                    <td className="text-right font-medium">
                      {(parseFloat(weeksPerYear) * 5).toLocaleString()} days
                    </td>
                  </tr>
                  <tr>
                    <td className="py-1">Pay periods (bi-weekly):</td>
                    <td className="text-right font-medium">
                      {Math.round(parseFloat(weeksPerYear) / 2)} paychecks
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Notes</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Calculations assume a 5-day workweek for daily rates</li>
            <li>Default is 40 hours/week and 52 weeks/year</li>
            <li>Adjust hours and weeks for part-time or contract work</li>
            <li>This is gross salary before taxes and deductions</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
