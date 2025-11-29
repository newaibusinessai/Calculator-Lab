"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("tax-calculator")!;

export default function TaxCalculator() {
  const [income, setIncome] = useState("75000");
  const [filingStatus, setFilingStatus] = useState("single");
  const [deductions, setDeductions] = useState("standard");
  const [itemizedAmount, setItemizedAmount] = useState("0");
  const [stateRate, setStateRate] = useState("5");

  const [result, setResult] = useState<{
    grossIncome: number;
    standardDeduction: number;
    taxableIncome: number;
    federalTax: number;
    stateTax: number;
    ficaTax: number;
    totalTax: number;
    effectiveRate: number;
    afterTaxIncome: number;
    brackets: { rate: number; amount: number }[];
  } | null>(null);

  const calculate = () => {
    const grossIncome = parseFloat(income);
    const statePercent = parseFloat(stateRate) / 100;
    const itemized = parseFloat(itemizedAmount) || 0;

    if (isNaN(grossIncome) || grossIncome <= 0) {
      alert("Please enter a valid income amount");
      return;
    }

    // Standard deductions 2024
    const standardDeductions: Record<string, number> = {
      single: 14600,
      married: 29200,
      head: 21900,
    };

    const standardDeduction = standardDeductions[filingStatus] || 14600;
    const actualDeduction = deductions === "standard" ? standardDeduction : Math.max(itemized, standardDeduction);
    const taxableIncome = Math.max(0, grossIncome - actualDeduction);

    // Federal tax brackets 2024
    let federalTax = 0;
    const brackets: { rate: number; amount: number }[] = [];

    if (filingStatus === "single" || filingStatus === "head") {
      const taxBrackets = [
        { min: 0, max: 11600, rate: 0.10 },
        { min: 11600, max: 47150, rate: 0.12 },
        { min: 47150, max: 100525, rate: 0.22 },
        { min: 100525, max: 191950, rate: 0.24 },
        { min: 191950, max: 243725, rate: 0.32 },
        { min: 243725, max: 609350, rate: 0.35 },
        { min: 609350, max: Infinity, rate: 0.37 },
      ];

      for (const bracket of taxBrackets) {
        if (taxableIncome > bracket.min) {
          const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
          const taxInBracket = taxableInBracket * bracket.rate;
          federalTax += taxInBracket;
          if (taxInBracket > 0) {
            brackets.push({ rate: bracket.rate * 100, amount: taxInBracket });
          }
        }
      }
    } else {
      // Married filing jointly
      const taxBrackets = [
        { min: 0, max: 23200, rate: 0.10 },
        { min: 23200, max: 94300, rate: 0.12 },
        { min: 94300, max: 201050, rate: 0.22 },
        { min: 201050, max: 383900, rate: 0.24 },
        { min: 383900, max: 487450, rate: 0.32 },
        { min: 487450, max: 731200, rate: 0.35 },
        { min: 731200, max: Infinity, rate: 0.37 },
      ];

      for (const bracket of taxBrackets) {
        if (taxableIncome > bracket.min) {
          const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
          const taxInBracket = taxableInBracket * bracket.rate;
          federalTax += taxInBracket;
          if (taxInBracket > 0) {
            brackets.push({ rate: bracket.rate * 100, amount: taxInBracket });
          }
        }
      }
    }

    const stateTax = grossIncome * statePercent;

    // FICA taxes (Social Security + Medicare)
    const ssWageBase = 168600; // 2024 wage base
    const socialSecurity = Math.min(grossIncome, ssWageBase) * 0.062;
    const medicare = grossIncome * 0.0145;
    const additionalMedicare = grossIncome > 200000 ? (grossIncome - 200000) * 0.009 : 0;
    const ficaTax = socialSecurity + medicare + additionalMedicare;

    const totalTax = federalTax + stateTax + ficaTax;
    const effectiveRate = (totalTax / grossIncome) * 100;
    const afterTaxIncome = grossIncome - totalTax;

    setResult({
      grossIncome,
      standardDeduction: actualDeduction,
      taxableIncome,
      federalTax,
      stateTax,
      ficaTax,
      totalTax,
      effectiveRate,
      afterTaxIncome,
      brackets,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Total Tax = Federal Tax (progressive brackets) + State Tax + FICA (Social Security 6.2% + Medicare 1.45%)"
    >
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Annual Gross Income
            </label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="calc-input"
              placeholder="75000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filing Status
            </label>
            <select
              value={filingStatus}
              onChange={(e) => setFilingStatus(e.target.value)}
              className="calc-input"
            >
              <option value="single">Single</option>
              <option value="married">Married Filing Jointly</option>
              <option value="head">Head of Household</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deductions
            </label>
            <select
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className="calc-input"
            >
              <option value="standard">Standard Deduction</option>
              <option value="itemized">Itemized Deductions</option>
            </select>
          </div>
          {deductions === "itemized" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Itemized Amount
              </label>
              <input
                type="number"
                value={itemizedAmount}
                onChange={(e) => setItemizedAmount(e.target.value)}
                className="calc-input"
                min="0"
              />
            </div>
          )}
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
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Taxes
        </button>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="result-box text-center">
              <div className="text-sm text-gray-600 mb-1">Total Tax</div>
              <div className="text-2xl font-bold text-red-600">{formatCurrency(result.totalTax)}</div>
            </div>
            <div className="result-box text-center">
              <div className="text-sm text-gray-600 mb-1">After-Tax Income</div>
              <div className="result-value">{formatCurrency(result.afterTaxIncome)}</div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <div className="text-sm text-gray-600 mb-1">Effective Tax Rate</div>
            <div className="text-xl font-bold text-blue-700">{result.effectiveRate.toFixed(1)}%</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Tax Breakdown</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Gross Income</td>
                  <td className="text-right font-medium">{formatCurrency(result.grossIncome)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Deductions</td>
                  <td className="text-right">-{formatCurrency(result.standardDeduction)}</td>
                </tr>
                <tr className="border-b font-medium">
                  <td className="py-2">Taxable Income</td>
                  <td className="text-right">{formatCurrency(result.taxableIncome)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-red-600">Federal Income Tax</td>
                  <td className="text-right text-red-600">{formatCurrency(result.federalTax)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-red-600">State Tax ({stateRate}%)</td>
                  <td className="text-right text-red-600">{formatCurrency(result.stateTax)}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 text-red-600">FICA (SS + Medicare)</td>
                  <td className="text-right text-red-600">{formatCurrency(result.ficaTax)}</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2">Total Tax</td>
                  <td className="text-right text-red-600">{formatCurrency(result.totalTax)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {result.brackets.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Federal Tax by Bracket</h3>
              <table className="w-full text-sm">
                <tbody>
                  {result.brackets.map((bracket, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2">{bracket.rate}% Bracket</td>
                      <td className="text-right">{formatCurrency(bracket.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 text-sm text-gray-600">
        <h3 className="font-semibold text-gray-800 mb-2">About Tax Calculator</h3>
        <p>
          This calculator estimates your federal and state income taxes based on 2024 tax brackets.
          Results are estimates only. Consult a tax professional for accurate tax advice.
        </p>
      </div>
    </CalculatorLayout>
  );
}
