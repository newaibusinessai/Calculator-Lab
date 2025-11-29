"use client";

import { useState } from "react";
import Link from "next/link";

// 2024 Federal Tax Brackets (Single)
const federalBracketsSingle = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

// 2024 Federal Tax Brackets (Married Filing Jointly)
const federalBracketsMarried = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

// State tax rates (simplified - using effective rates for 2024)
const stateTaxes: Record<string, { name: string; rate: number; type: "flat" | "progressive" | "none"; brackets?: { min: number; max: number; rate: number }[] }> = {
  AL: { name: "Alabama", rate: 0.05, type: "progressive", brackets: [{ min: 0, max: 500, rate: 0.02 }, { min: 500, max: 3000, rate: 0.04 }, { min: 3000, max: Infinity, rate: 0.05 }] },
  AK: { name: "Alaska", rate: 0, type: "none" },
  AZ: { name: "Arizona", rate: 0.025, type: "flat" },
  AR: { name: "Arkansas", rate: 0.044, type: "progressive" },
  CA: { name: "California", rate: 0.0725, type: "progressive", brackets: [{ min: 0, max: 10412, rate: 0.01 }, { min: 10412, max: 24684, rate: 0.02 }, { min: 24684, max: 38959, rate: 0.04 }, { min: 38959, max: 54081, rate: 0.06 }, { min: 54081, max: 68350, rate: 0.08 }, { min: 68350, max: 349137, rate: 0.093 }, { min: 349137, max: 418961, rate: 0.103 }, { min: 418961, max: 698271, rate: 0.113 }, { min: 698271, max: Infinity, rate: 0.123 }] },
  CO: { name: "Colorado", rate: 0.044, type: "flat" },
  CT: { name: "Connecticut", rate: 0.0599, type: "progressive" },
  DE: { name: "Delaware", rate: 0.066, type: "progressive" },
  FL: { name: "Florida", rate: 0, type: "none" },
  GA: { name: "Georgia", rate: 0.0549, type: "progressive" },
  HI: { name: "Hawaii", rate: 0.0825, type: "progressive" },
  ID: { name: "Idaho", rate: 0.058, type: "flat" },
  IL: { name: "Illinois", rate: 0.0495, type: "flat" },
  IN: { name: "Indiana", rate: 0.0305, type: "flat" },
  IA: { name: "Iowa", rate: 0.057, type: "progressive" },
  KS: { name: "Kansas", rate: 0.057, type: "progressive" },
  KY: { name: "Kentucky", rate: 0.04, type: "flat" },
  LA: { name: "Louisiana", rate: 0.0425, type: "progressive" },
  ME: { name: "Maine", rate: 0.0715, type: "progressive" },
  MD: { name: "Maryland", rate: 0.0575, type: "progressive" },
  MA: { name: "Massachusetts", rate: 0.05, type: "flat" },
  MI: { name: "Michigan", rate: 0.0425, type: "flat" },
  MN: { name: "Minnesota", rate: 0.0785, type: "progressive" },
  MS: { name: "Mississippi", rate: 0.05, type: "progressive" },
  MO: { name: "Missouri", rate: 0.048, type: "progressive" },
  MT: { name: "Montana", rate: 0.059, type: "progressive" },
  NE: { name: "Nebraska", rate: 0.0584, type: "progressive" },
  NV: { name: "Nevada", rate: 0, type: "none" },
  NH: { name: "New Hampshire", rate: 0, type: "none" },
  NJ: { name: "New Jersey", rate: 0.0637, type: "progressive" },
  NM: { name: "New Mexico", rate: 0.059, type: "progressive" },
  NY: { name: "New York", rate: 0.0685, type: "progressive", brackets: [{ min: 0, max: 8500, rate: 0.04 }, { min: 8500, max: 11700, rate: 0.045 }, { min: 11700, max: 13900, rate: 0.0525 }, { min: 13900, max: 80650, rate: 0.0585 }, { min: 80650, max: 215400, rate: 0.0625 }, { min: 215400, max: 1077550, rate: 0.0685 }, { min: 1077550, max: 5000000, rate: 0.0965 }, { min: 5000000, max: 25000000, rate: 0.103 }, { min: 25000000, max: Infinity, rate: 0.109 }] },
  NC: { name: "North Carolina", rate: 0.0475, type: "flat" },
  ND: { name: "North Dakota", rate: 0.019, type: "progressive" },
  OH: { name: "Ohio", rate: 0.0399, type: "progressive" },
  OK: { name: "Oklahoma", rate: 0.0475, type: "progressive" },
  OR: { name: "Oregon", rate: 0.099, type: "progressive" },
  PA: { name: "Pennsylvania", rate: 0.0307, type: "flat" },
  RI: { name: "Rhode Island", rate: 0.0599, type: "progressive" },
  SC: { name: "South Carolina", rate: 0.064, type: "progressive" },
  SD: { name: "South Dakota", rate: 0, type: "none" },
  TN: { name: "Tennessee", rate: 0, type: "none" },
  TX: { name: "Texas", rate: 0, type: "none" },
  UT: { name: "Utah", rate: 0.0465, type: "flat" },
  VT: { name: "Vermont", rate: 0.0875, type: "progressive" },
  VA: { name: "Virginia", rate: 0.0575, type: "progressive" },
  WA: { name: "Washington", rate: 0, type: "none" },
  WV: { name: "West Virginia", rate: 0.055, type: "progressive" },
  WI: { name: "Wisconsin", rate: 0.0765, type: "progressive" },
  WY: { name: "Wyoming", rate: 0, type: "none" },
  DC: { name: "District of Columbia", rate: 0.085, type: "progressive" },
};

// Social Security and Medicare rates for 2024
const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_WAGE_BASE = 168600;
const MEDICARE_RATE = 0.0145;
const ADDITIONAL_MEDICARE_RATE = 0.009;
const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
const ADDITIONAL_MEDICARE_THRESHOLD_MARRIED = 250000;

// Standard deductions for 2024
const STANDARD_DEDUCTION_SINGLE = 14600;
const STANDARD_DEDUCTION_MARRIED = 29200;

export default function UsSalaryCalculator() {
  const [salary, setSalary] = useState("75000");
  const [payFrequency, setPayFrequency] = useState<"annual" | "monthly" | "biweekly" | "weekly" | "hourly">("annual");
  const [state, setState] = useState("CA");
  const [filingStatus, setFilingStatus] = useState<"single" | "married">("single");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [retirement401k, setRetirement401k] = useState("0");
  const [retirement401kType, setRetirement401kType] = useState<"percent" | "fixed">("percent");
  const [healthInsurance, setHealthInsurance] = useState("0");
  const [otherPreTax, setOtherPreTax] = useState("0");

  const [result, setResult] = useState<{
    grossAnnual: number;
    federalTax: number;
    stateTax: number;
    socialSecurity: number;
    medicare: number;
    retirement401k: number;
    healthInsurance: number;
    otherPreTax: number;
    totalDeductions: number;
    netAnnual: number;
    effectiveTaxRate: number;
    marginalTaxRate: number;
  } | null>(null);

  const calculateFederalTax = (taxableIncome: number, status: "single" | "married"): number => {
    const brackets = status === "single" ? federalBracketsSingle : federalBracketsMarried;
    let tax = 0;
    let remainingIncome = taxableIncome;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;
      const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
    }

    return tax;
  };

  const calculateStateTax = (income: number, stateCode: string): number => {
    const stateInfo = stateTaxes[stateCode];
    if (!stateInfo || stateInfo.type === "none") return 0;

    if (stateInfo.type === "flat") {
      return income * stateInfo.rate;
    }

    if (stateInfo.brackets) {
      let tax = 0;
      let remainingIncome = income;
      for (const bracket of stateInfo.brackets) {
        if (remainingIncome <= 0) break;
        const taxableInBracket = Math.min(remainingIncome, bracket.max - bracket.min);
        tax += taxableInBracket * bracket.rate;
        remainingIncome -= taxableInBracket;
      }
      return tax;
    }

    return income * stateInfo.rate;
  };

  const calculate = () => {
    const salaryValue = parseFloat(salary);
    const hours = parseFloat(hoursPerWeek);
    const retirement = parseFloat(retirement401k) || 0;
    const health = parseFloat(healthInsurance) || 0;
    const otherPre = parseFloat(otherPreTax) || 0;

    if (isNaN(salaryValue)) return;

    // Convert to annual salary
    let grossAnnual: number;
    switch (payFrequency) {
      case "hourly":
        grossAnnual = salaryValue * hours * 52;
        break;
      case "weekly":
        grossAnnual = salaryValue * 52;
        break;
      case "biweekly":
        grossAnnual = salaryValue * 26;
        break;
      case "monthly":
        grossAnnual = salaryValue * 12;
        break;
      default:
        grossAnnual = salaryValue;
    }

    // Calculate pre-tax deductions
    const annual401k = retirement401kType === "percent"
      ? grossAnnual * (retirement / 100)
      : retirement * 12;
    const annualHealth = health * 12;
    const annualOtherPreTax = otherPre * 12;
    const totalPreTaxDeductions = annual401k + annualHealth + annualOtherPreTax;

    // Taxable income for federal
    const standardDeduction = filingStatus === "single" ? STANDARD_DEDUCTION_SINGLE : STANDARD_DEDUCTION_MARRIED;
    const taxableIncome = Math.max(0, grossAnnual - totalPreTaxDeductions - standardDeduction);

    // Calculate taxes
    const federalTax = calculateFederalTax(taxableIncome, filingStatus);
    const stateTax = calculateStateTax(grossAnnual - totalPreTaxDeductions, state);

    // Social Security (on gross, not reduced by pre-tax deductions)
    const socialSecurityWages = Math.min(grossAnnual, SOCIAL_SECURITY_WAGE_BASE);
    const socialSecurity = socialSecurityWages * SOCIAL_SECURITY_RATE;

    // Medicare
    const medicareThreshold = filingStatus === "single"
      ? ADDITIONAL_MEDICARE_THRESHOLD_SINGLE
      : ADDITIONAL_MEDICARE_THRESHOLD_MARRIED;
    let medicare = grossAnnual * MEDICARE_RATE;
    if (grossAnnual > medicareThreshold) {
      medicare += (grossAnnual - medicareThreshold) * ADDITIONAL_MEDICARE_RATE;
    }

    const totalDeductions = federalTax + stateTax + socialSecurity + medicare + totalPreTaxDeductions;
    const netAnnual = grossAnnual - totalDeductions;

    // Get marginal rate
    const brackets = filingStatus === "single" ? federalBracketsSingle : federalBracketsMarried;
    let marginalRate = 0.10;
    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        marginalRate = bracket.rate;
      }
    }

    setResult({
      grossAnnual,
      federalTax,
      stateTax,
      socialSecurity,
      medicare,
      retirement401k: annual401k,
      healthInsurance: annualHealth,
      otherPreTax: annualOtherPreTax,
      totalDeductions,
      netAnnual,
      effectiveTaxRate: (federalTax + stateTax + socialSecurity + medicare) / grossAnnual * 100,
      marginalTaxRate: marginalRate * 100,
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

  const formatCurrencyDecimal = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/calculators/financial" className="hover:text-blue-600">Financial</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">US Salary Calculator</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">US Salary Calculator (2024)</h1>
      <p className="text-gray-600 mb-6">
        Calculate your take-home pay after federal and state taxes, Social Security, Medicare, and deductions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold text-gray-800 mb-4">Income Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gross Salary
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="75000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pay Frequency
                </label>
                <select
                  value={payFrequency}
                  onChange={(e) => setPayFrequency(e.target.value as typeof payFrequency)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="annual">Annual</option>
                  <option value="monthly">Monthly</option>
                  <option value="biweekly">Bi-weekly (26/yr)</option>
                  <option value="weekly">Weekly</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>

              {payFrequency === "hourly" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hours Per Week
                  </label>
                  <input
                    type="number"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  {Object.entries(stateTaxes)
                    .sort((a, b) => a[1].name.localeCompare(b[1].name))
                    .map(([code, info]) => (
                      <option key={code} value={code}>
                        {info.name} {info.type === "none" ? "(No State Tax)" : ""}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filing Status
                </label>
                <select
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value as typeof filingStatus)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold text-gray-800 mb-4">Pre-Tax Deductions</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  401(k) Contribution
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={retirement401k}
                    onChange={(e) => setRetirement401k(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    placeholder="0"
                  />
                  <select
                    value={retirement401kType}
                    onChange={(e) => setRetirement401kType(e.target.value as typeof retirement401kType)}
                    className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="percent">%</option>
                    <option value="fixed">$/mo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Health Insurance ($/month)
                </label>
                <input
                  type="number"
                  value={healthInsurance}
                  onChange={(e) => setHealthInsurance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other Pre-Tax Deductions ($/month)
                </label>
                <input
                  type="number"
                  value={otherPreTax}
                  onChange={(e) => setOtherPreTax(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Calculate Take-Home Pay
          </button>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-2">
          {result ? (
            <div className="space-y-4">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-blue-600 mb-1">Gross Annual</div>
                  <div className="text-xl font-bold text-blue-800">{formatCurrency(result.grossAnnual)}</div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-red-600 mb-1">Total Deductions</div>
                  <div className="text-xl font-bold text-red-800">{formatCurrency(result.totalDeductions)}</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-green-600 mb-1">Net Annual</div>
                  <div className="text-xl font-bold text-green-800">{formatCurrency(result.netAnnual)}</div>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <div className="text-sm text-purple-600 mb-1">Effective Tax Rate</div>
                  <div className="text-xl font-bold text-purple-800">{result.effectiveTaxRate.toFixed(1)}%</div>
                </div>
              </div>

              {/* Detailed Breakdown Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Detailed Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2 font-medium text-gray-600">Item</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600">Annual</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600">Monthly</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600">Bi-Weekly</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600">Weekly</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-blue-50">
                        <td className="px-4 py-2 font-medium text-blue-800">Gross Pay</td>
                        <td className="text-right px-4 py-2 font-medium text-blue-800">{formatCurrency(result.grossAnnual)}</td>
                        <td className="text-right px-4 py-2 text-blue-700">{formatCurrencyDecimal(result.grossAnnual / 12)}</td>
                        <td className="text-right px-4 py-2 text-blue-700">{formatCurrencyDecimal(result.grossAnnual / 26)}</td>
                        <td className="text-right px-4 py-2 text-blue-700">{formatCurrencyDecimal(result.grossAnnual / 52)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-700">Federal Income Tax</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrency(result.federalTax)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.federalTax / 12)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.federalTax / 26)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.federalTax / 52)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-700">State Tax ({stateTaxes[state]?.name})</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrency(result.stateTax)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.stateTax / 12)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.stateTax / 26)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.stateTax / 52)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-700">Social Security (6.2%)</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrency(result.socialSecurity)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.socialSecurity / 12)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.socialSecurity / 26)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.socialSecurity / 52)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-700">Medicare (1.45%)</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrency(result.medicare)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.medicare / 12)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.medicare / 26)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.medicare / 52)}</td>
                      </tr>
                      {result.retirement401k > 0 && (
                        <tr>
                          <td className="px-4 py-2 text-gray-700">401(k) Contribution</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrency(result.retirement401k)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.retirement401k / 12)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.retirement401k / 26)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.retirement401k / 52)}</td>
                        </tr>
                      )}
                      {result.healthInsurance > 0 && (
                        <tr>
                          <td className="px-4 py-2 text-gray-700">Health Insurance</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrency(result.healthInsurance)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.healthInsurance / 12)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.healthInsurance / 26)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.healthInsurance / 52)}</td>
                        </tr>
                      )}
                      {result.otherPreTax > 0 && (
                        <tr>
                          <td className="px-4 py-2 text-gray-700">Other Pre-Tax</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrency(result.otherPreTax)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.otherPreTax / 12)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.otherPreTax / 26)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.otherPreTax / 52)}</td>
                        </tr>
                      )}
                      <tr className="bg-green-50 font-semibold">
                        <td className="px-4 py-3 text-green-800">Take-Home Pay</td>
                        <td className="text-right px-4 py-3 text-green-800">{formatCurrency(result.netAnnual)}</td>
                        <td className="text-right px-4 py-3 text-green-700">{formatCurrencyDecimal(result.netAnnual / 12)}</td>
                        <td className="text-right px-4 py-3 text-green-700">{formatCurrencyDecimal(result.netAnnual / 26)}</td>
                        <td className="text-right px-4 py-3 text-green-700">{formatCurrencyDecimal(result.netAnnual / 52)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tax Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Tax Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Marginal Tax Rate:</span>
                      <span className="font-medium">{result.marginalTaxRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Effective Tax Rate:</span>
                      <span className="font-medium">{result.effectiveTaxRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Taxes:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(result.federalTax + result.stateTax + result.socialSecurity + result.medicare)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Daily & Hourly</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily (5-day week):</span>
                      <span className="font-medium text-green-600">{formatCurrencyDecimal(result.netAnnual / 260)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hourly (40hr/week):</span>
                      <span className="font-medium text-green-600">{formatCurrencyDecimal(result.netAnnual / 2080)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* State Comparison */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Compare: States with No Income Tax</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {["TX", "FL", "WA", "NV", "TN", "WY", "SD", "AK"].map((stateCode) => {
                    const noStateTax = calculateStateTax(result.grossAnnual - result.retirement401k - result.healthInsurance - result.otherPreTax, stateCode);
                    const currentStateTax = result.stateTax;
                    const savings = currentStateTax - noStateTax;
                    return (
                      <div key={stateCode} className="bg-gray-50 rounded p-2">
                        <div className="font-medium">{stateTaxes[stateCode].name}</div>
                        {savings > 0 ? (
                          <div className="text-green-600 text-xs">Save {formatCurrency(savings)}/yr</div>
                        ) : (
                          <div className="text-gray-500 text-xs">Same as current</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 text-4xl mb-4">💰</div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">Enter Your Salary Details</h3>
              <p className="text-gray-500">Fill in your income information and click &quot;Calculate&quot; to see your take-home pay breakdown.</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3">About This Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">What&apos;s Included</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>2024 Federal income tax brackets</li>
              <li>State income taxes for all 50 states + DC</li>
              <li>Social Security tax (6.2% up to $168,600)</li>
              <li>Medicare tax (1.45% + 0.9% above threshold)</li>
              <li>Pre-tax deductions (401k, health insurance)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Limitations</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Uses standard deduction (not itemized)</li>
              <li>Does not include local/city taxes</li>
              <li>State tax calculations are simplified</li>
              <li>Does not account for all tax credits</li>
              <li>For estimates only - consult a tax professional</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
