"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("paycheck-calculator")!;

export default function PaycheckCalculator() {
  const [grossPay, setGrossPay] = useState("1500");
  const [payFrequency, setPayFrequency] = useState<"weekly" | "biweekly" | "semimonthly" | "monthly">("biweekly");
  const [federalFilingStatus, setFederalFilingStatus] = useState("single");
  const [federalAllowances, setFederalAllowances] = useState("1");
  const [stateRate, setStateRate] = useState("5");
  const [preDeductions, setPreDeductions] = useState("0");

  const [result, setResult] = useState<{
    grossPay: number;
    federalTax: number;
    stateTax: number;
    socialSecurity: number;
    medicare: number;
    preDeductions: number;
    totalDeductions: number;
    netPay: number;
  } | null>(null);

  const calculate = () => {
    const gross = parseFloat(grossPay);
    const allowances = parseInt(federalAllowances) || 0;
    const statePercent = parseFloat(stateRate) / 100;
    const preDed = parseFloat(preDeductions) || 0;

    if (isNaN(gross) || gross <= 0) {
      alert("Please enter a valid gross pay amount");
      return;
    }

    // Calculate annual gross for federal tax brackets
    let periodsPerYear = 26;
    if (payFrequency === "weekly") periodsPerYear = 52;
    else if (payFrequency === "semimonthly") periodsPerYear = 24;
    else if (payFrequency === "monthly") periodsPerYear = 12;

    const annualGross = gross * periodsPerYear;
    const taxableIncome = Math.max(0, annualGross - (allowances * 4300));

    // Simple federal tax estimation (2024 brackets simplified)
    let annualFederalTax = 0;
    if (federalFilingStatus === "single") {
      if (taxableIncome <= 11600) annualFederalTax = taxableIncome * 0.10;
      else if (taxableIncome <= 47150) annualFederalTax = 1160 + (taxableIncome - 11600) * 0.12;
      else if (taxableIncome <= 100525) annualFederalTax = 5426 + (taxableIncome - 47150) * 0.22;
      else if (taxableIncome <= 191950) annualFederalTax = 17168.50 + (taxableIncome - 100525) * 0.24;
      else annualFederalTax = 39110.50 + (taxableIncome - 191950) * 0.32;
    } else {
      // Married filing jointly
      if (taxableIncome <= 23200) annualFederalTax = taxableIncome * 0.10;
      else if (taxableIncome <= 94300) annualFederalTax = 2320 + (taxableIncome - 23200) * 0.12;
      else if (taxableIncome <= 201050) annualFederalTax = 10852 + (taxableIncome - 94300) * 0.22;
      else if (taxableIncome <= 383900) annualFederalTax = 34337 + (taxableIncome - 201050) * 0.24;
      else annualFederalTax = 78221 + (taxableIncome - 383900) * 0.32;
    }

    const federalTax = annualFederalTax / periodsPerYear;
    const stateTax = gross * statePercent;
    const socialSecurity = gross * 0.062; // 6.2%
    const medicare = gross * 0.0145; // 1.45%

    const totalDeductions = federalTax + stateTax + socialSecurity + medicare + preDed;
    const netPay = gross - totalDeductions;

    setResult({
      grossPay: gross,
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      preDeductions: preDed,
      totalDeductions,
      netPay,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Net Pay = Gross Pay - Federal Tax - State Tax - Social Security (6.2%) - Medicare (1.45%) - Pre-tax Deductions"
    >
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gross Pay Per Period
            </label>
            <input
              type="number"
              value={grossPay}
              onChange={(e) => setGrossPay(e.target.value)}
              className="calc-input"
              placeholder="1500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pay Frequency
            </label>
            <select
              value={payFrequency}
              onChange={(e) => setPayFrequency(e.target.value as typeof payFrequency)}
              className="calc-input"
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly (every 2 weeks)</option>
              <option value="semimonthly">Semi-monthly (twice/month)</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Federal Filing Status
            </label>
            <select
              value={federalFilingStatus}
              onChange={(e) => setFederalFilingStatus(e.target.value)}
              className="calc-input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Federal Allowances
            </label>
            <input
              type="number"
              value={federalAllowances}
              onChange={(e) => setFederalAllowances(e.target.value)}
              className="calc-input"
              min="0"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State Tax Rate (%)
            </label>
            <input
              type="number"
              value={stateRate}
              onChange={(e) => setStateRate(e.target.value)}
              className="calc-input"
              step="0.1"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pre-tax Deductions (401k, health, etc.)
            </label>
            <input
              type="number"
              value={preDeductions}
              onChange={(e) => setPreDeductions(e.target.value)}
              className="calc-input"
              min="0"
            />
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Paycheck
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="result-box">
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Net Pay (Take Home)</div>
              <div className="result-value">{formatCurrency(result.netPay)}</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Paycheck Breakdown</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Gross Pay</td>
                  <td className="text-right font-medium">{formatCurrency(result.grossPay)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-red-600">Federal Tax</td>
                  <td className="text-right text-red-600">-{formatCurrency(result.federalTax)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-red-600">State Tax</td>
                  <td className="text-right text-red-600">-{formatCurrency(result.stateTax)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-red-600">Social Security (6.2%)</td>
                  <td className="text-right text-red-600">-{formatCurrency(result.socialSecurity)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-red-600">Medicare (1.45%)</td>
                  <td className="text-right text-red-600">-{formatCurrency(result.medicare)}</td>
                </tr>
                {result.preDeductions > 0 && (
                  <tr className="border-b">
                    <td className="py-2 text-red-600">Pre-tax Deductions</td>
                    <td className="text-right text-red-600">-{formatCurrency(result.preDeductions)}</td>
                  </tr>
                )}
                <tr className="font-bold">
                  <td className="py-2">Total Deductions</td>
                  <td className="text-right text-red-600">-{formatCurrency(result.totalDeductions)}</td>
                </tr>
                <tr className="font-bold bg-green-50">
                  <td className="py-2 text-green-700">Net Pay</td>
                  <td className="text-right text-green-700">{formatCurrency(result.netPay)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-800 mb-2">About Paycheck Calculator</h3>
        <p>
          This calculator estimates your net paycheck after federal and state taxes, Social Security, and Medicare.
          Results are estimates and may vary from your actual paycheck.
        </p>
      </div>
    </CalculatorLayout>
  );
}
