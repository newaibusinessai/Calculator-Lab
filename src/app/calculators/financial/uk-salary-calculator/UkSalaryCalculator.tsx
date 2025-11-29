"use client";

import { useState } from "react";
import Link from "next/link";

// 2024/25 UK Tax Rates and Thresholds (England, Wales, Northern Ireland)
const UK_TAX_BANDS = [
  { name: "Personal Allowance", min: 0, max: 12570, rate: 0 },
  { name: "Basic Rate", min: 12570, max: 50270, rate: 0.20 },
  { name: "Higher Rate", min: 50270, max: 125140, rate: 0.40 },
  { name: "Additional Rate", min: 125140, max: Infinity, rate: 0.45 },
];

// Scotland Tax Rates 2024/25
const SCOTLAND_TAX_BANDS = [
  { name: "Personal Allowance", min: 0, max: 12570, rate: 0 },
  { name: "Starter Rate", min: 12570, max: 14876, rate: 0.19 },
  { name: "Basic Rate", min: 14876, max: 26561, rate: 0.20 },
  { name: "Intermediate Rate", min: 26561, max: 43662, rate: 0.21 },
  { name: "Higher Rate", min: 43662, max: 75000, rate: 0.42 },
  { name: "Advanced Rate", min: 75000, max: 125140, rate: 0.45 },
  { name: "Top Rate", min: 125140, max: Infinity, rate: 0.48 },
];

// National Insurance Thresholds 2024/25
const NI_PRIMARY_THRESHOLD = 12570; // Annual
const NI_UPPER_EARNINGS_LIMIT = 50270; // Annual
const NI_RATE_MAIN = 0.08; // 8% between thresholds (reduced from 12% in Jan 2024)
const NI_RATE_UPPER = 0.02; // 2% above upper limit

// Student Loan Thresholds and Rates 2024/25
const STUDENT_LOAN_PLANS = {
  none: { threshold: 0, rate: 0, name: "None" },
  plan1: { threshold: 24990, rate: 0.09, name: "Plan 1 (Pre-2012)" },
  plan2: { threshold: 27295, rate: 0.09, name: "Plan 2 (Post-2012)" },
  plan4: { threshold: 31395, rate: 0.09, name: "Plan 4 (Scotland)" },
  plan5: { threshold: 25000, rate: 0.09, name: "Plan 5 (Post-2023)" },
  postgrad: { threshold: 21000, rate: 0.06, name: "Postgraduate Loan" },
};

// Pension Auto-Enrollment
const PENSION_MIN_CONTRIBUTION = 0.05; // 5% minimum employee contribution

export default function UkSalaryCalculator() {
  const [salary, setSalary] = useState("35000");
  const [payFrequency, setPayFrequency] = useState<"annual" | "monthly" | "weekly" | "daily" | "hourly">("annual");
  const [region, setRegion] = useState<"england" | "scotland">("england");
  const [studentLoan, setStudentLoan] = useState<keyof typeof STUDENT_LOAN_PLANS>("none");
  const [hasPostgradLoan, setHasPostgradLoan] = useState(false);
  const [pensionPercent, setPensionPercent] = useState("5");
  const [pensionType, setPensionType] = useState<"salary_sacrifice" | "relief_at_source">("salary_sacrifice");
  const [hoursPerWeek, setHoursPerWeek] = useState("37.5");
  const [taxCode, setTaxCode] = useState("1257L");
  const [blindPersonAllowance, setBlindPersonAllowance] = useState(false);

  const [result, setResult] = useState<{
    grossAnnual: number;
    personalAllowance: number;
    taxableIncome: number;
    incomeTax: number;
    nationalInsurance: number;
    studentLoanRepayment: number;
    postgradLoanRepayment: number;
    pensionContribution: number;
    totalDeductions: number;
    netAnnual: number;
    effectiveTaxRate: number;
    marginalRate: number;
    taxBreakdown: { band: string; amount: number; rate: number }[];
  } | null>(null);

  const parsePersonalAllowance = (code: string, grossSalary: number): number => {
    // Handle common tax codes
    const baseAllowance = 12570;
    const blindAllowance = blindPersonAllowance ? 3070 : 0;

    // Taper personal allowance for income over £100,000
    if (grossSalary > 100000) {
      const excess = grossSalary - 100000;
      const reduction = Math.min(baseAllowance, Math.floor(excess / 2));
      return Math.max(0, baseAllowance - reduction) + blindAllowance;
    }

    // Standard tax code like 1257L
    const numericMatch = code.match(/^(\d+)/);
    if (numericMatch) {
      return parseInt(numericMatch[1]) * 10 + blindAllowance;
    }

    return baseAllowance + blindAllowance;
  };

  const calculateIncomeTax = (taxableIncome: number, isScotland: boolean): { total: number; breakdown: { band: string; amount: number; rate: number }[] } => {
    const bands = isScotland ? SCOTLAND_TAX_BANDS : UK_TAX_BANDS;
    let remainingIncome = taxableIncome;
    let totalTax = 0;
    const breakdown: { band: string; amount: number; rate: number }[] = [];

    for (const band of bands) {
      if (remainingIncome <= 0) break;

      const bandWidth = band.max - band.min;
      const taxableInBand = Math.min(remainingIncome, bandWidth);
      const taxInBand = taxableInBand * band.rate;

      if (taxInBand > 0) {
        totalTax += taxInBand;
        breakdown.push({
          band: band.name,
          amount: taxInBand,
          rate: band.rate * 100,
        });
      }

      remainingIncome -= taxableInBand;
    }

    return { total: totalTax, breakdown };
  };

  const calculateNationalInsurance = (grossSalary: number): number => {
    if (grossSalary <= NI_PRIMARY_THRESHOLD) return 0;

    let ni = 0;

    // Main rate between thresholds
    const mainBandEarnings = Math.min(grossSalary, NI_UPPER_EARNINGS_LIMIT) - NI_PRIMARY_THRESHOLD;
    if (mainBandEarnings > 0) {
      ni += mainBandEarnings * NI_RATE_MAIN;
    }

    // Upper rate above limit
    if (grossSalary > NI_UPPER_EARNINGS_LIMIT) {
      ni += (grossSalary - NI_UPPER_EARNINGS_LIMIT) * NI_RATE_UPPER;
    }

    return ni;
  };

  const calculateStudentLoan = (grossSalary: number, plan: keyof typeof STUDENT_LOAN_PLANS): number => {
    const planDetails = STUDENT_LOAN_PLANS[plan];
    if (!planDetails || planDetails.rate === 0) return 0;

    const annualThreshold = planDetails.threshold;
    if (grossSalary <= annualThreshold) return 0;

    return (grossSalary - annualThreshold) * planDetails.rate;
  };

  const calculate = () => {
    const salaryValue = parseFloat(salary);
    const hours = parseFloat(hoursPerWeek);
    const pension = parseFloat(pensionPercent) || 0;

    if (isNaN(salaryValue)) return;

    // Convert to annual salary
    let grossAnnual: number;
    switch (payFrequency) {
      case "hourly":
        grossAnnual = salaryValue * hours * 52;
        break;
      case "daily":
        grossAnnual = salaryValue * 5 * 52; // 5-day week
        break;
      case "weekly":
        grossAnnual = salaryValue * 52;
        break;
      case "monthly":
        grossAnnual = salaryValue * 12;
        break;
      default:
        grossAnnual = salaryValue;
    }

    // Calculate pension contribution
    const pensionContribution = grossAnnual * (pension / 100);

    // For salary sacrifice, pension reduces gross for tax/NI purposes
    const effectiveGross = pensionType === "salary_sacrifice"
      ? grossAnnual - pensionContribution
      : grossAnnual;

    // Calculate personal allowance (may be tapered)
    const personalAllowance = parsePersonalAllowance(taxCode, grossAnnual);

    // For relief at source pension, deductions come from net pay but get tax relief
    const taxableIncome = Math.max(0, effectiveGross - personalAllowance);

    // Calculate taxes
    const { total: incomeTax, breakdown: taxBreakdown } = calculateIncomeTax(
      taxableIncome,
      region === "scotland"
    );

    // National Insurance (based on effective gross for salary sacrifice)
    const nationalInsurance = calculateNationalInsurance(effectiveGross);

    // Student loan repayments (based on original gross)
    const studentLoanRepayment = calculateStudentLoan(grossAnnual, studentLoan);
    const postgradLoanRepayment = hasPostgradLoan
      ? calculateStudentLoan(grossAnnual, "postgrad")
      : 0;

    // Total deductions
    const totalDeductions = incomeTax + nationalInsurance + studentLoanRepayment +
      postgradLoanRepayment + pensionContribution;

    const netAnnual = grossAnnual - totalDeductions;

    // Calculate marginal rate
    const bands = region === "scotland" ? SCOTLAND_TAX_BANDS : UK_TAX_BANDS;
    let marginalRate = 0;
    for (const band of bands) {
      if (taxableIncome > band.min) {
        marginalRate = band.rate;
      }
    }
    // Add NI if applicable
    if (grossAnnual > NI_PRIMARY_THRESHOLD && grossAnnual <= NI_UPPER_EARNINGS_LIMIT) {
      marginalRate += NI_RATE_MAIN;
    } else if (grossAnnual > NI_UPPER_EARNINGS_LIMIT) {
      marginalRate += NI_RATE_UPPER;
    }

    setResult({
      grossAnnual,
      personalAllowance,
      taxableIncome,
      incomeTax,
      nationalInsurance,
      studentLoanRepayment,
      postgradLoanRepayment,
      pensionContribution,
      totalDeductions,
      netAnnual,
      effectiveTaxRate: (incomeTax + nationalInsurance) / grossAnnual * 100,
      marginalRate: marginalRate * 100,
      taxBreakdown,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCurrencyDecimal = (value: number) => {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
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
        <span className="text-gray-800">UK Salary Calculator</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">UK Salary Calculator 2024/25</h1>
      <p className="text-gray-600 mb-6">
        Calculate your take-home pay after Income Tax, National Insurance, Student Loans, and Pension contributions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold text-gray-800 mb-4">Income Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gross Salary (£)
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="35000"
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
                  <option value="weekly">Weekly</option>
                  <option value="daily">Daily</option>
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
                  Region
                </label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as typeof region)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="england">England, Wales, N. Ireland</option>
                  <option value="scotland">Scotland</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Code
                </label>
                <input
                  type="text"
                  value={taxCode}
                  onChange={(e) => setTaxCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="1257L"
                />
                <p className="text-xs text-gray-500 mt-1">Standard code is 1257L</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="blindPerson"
                  checked={blindPersonAllowance}
                  onChange={(e) => setBlindPersonAllowance(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="blindPerson" className="text-sm text-gray-700">
                  Blind Person&apos;s Allowance (£3,070)
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold text-gray-800 mb-4">Student Loans</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Student Loan Plan
                </label>
                <select
                  value={studentLoan}
                  onChange={(e) => setStudentLoan(e.target.value as keyof typeof STUDENT_LOAN_PLANS)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  {Object.entries(STUDENT_LOAN_PLANS).map(([key, plan]) => (
                    <option key={key} value={key}>
                      {plan.name} {plan.threshold > 0 ? `(£${plan.threshold.toLocaleString()})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="postgrad"
                  checked={hasPostgradLoan}
                  onChange={(e) => setHasPostgradLoan(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="postgrad" className="text-sm text-gray-700">
                  Postgraduate Loan (6% over £21,000)
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h2 className="font-semibold text-gray-800 mb-4">Pension</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contribution (%)
                </label>
                <input
                  type="number"
                  value={pensionPercent}
                  onChange={(e) => setPensionPercent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  placeholder="5"
                  min="0"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pension Type
                </label>
                <select
                  value={pensionType}
                  onChange={(e) => setPensionType(e.target.value as typeof pensionType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="salary_sacrifice">Salary Sacrifice (saves NI)</option>
                  <option value="relief_at_source">Relief at Source</option>
                </select>
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
                  <div className="text-sm text-purple-600 mb-1">Effective Rate</div>
                  <div className="text-xl font-bold text-purple-800">{result.effectiveTaxRate.toFixed(1)}%</div>
                </div>
              </div>

              {/* Detailed Breakdown Table */}
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Income Breakdown</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2 font-medium text-gray-600">Item</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600">Annual</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600">Monthly</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600">Weekly</th>
                        <th className="text-right px-4 py-2 font-medium text-gray-600">Daily</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr className="bg-blue-50">
                        <td className="px-4 py-2 font-medium text-blue-800">Gross Salary</td>
                        <td className="text-right px-4 py-2 font-medium text-blue-800">{formatCurrency(result.grossAnnual)}</td>
                        <td className="text-right px-4 py-2 text-blue-700">{formatCurrencyDecimal(result.grossAnnual / 12)}</td>
                        <td className="text-right px-4 py-2 text-blue-700">{formatCurrencyDecimal(result.grossAnnual / 52)}</td>
                        <td className="text-right px-4 py-2 text-blue-700">{formatCurrencyDecimal(result.grossAnnual / 260)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-500 pl-8">Personal Allowance</td>
                        <td className="text-right px-4 py-2 text-gray-500">{formatCurrency(result.personalAllowance)}</td>
                        <td className="text-right px-4 py-2 text-gray-500">-</td>
                        <td className="text-right px-4 py-2 text-gray-500">-</td>
                        <td className="text-right px-4 py-2 text-gray-500">-</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-700">Income Tax</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrency(result.incomeTax)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.incomeTax / 12)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.incomeTax / 52)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.incomeTax / 260)}</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 text-gray-700">National Insurance</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrency(result.nationalInsurance)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.nationalInsurance / 12)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.nationalInsurance / 52)}</td>
                        <td className="text-right px-4 py-2 text-red-600">-{formatCurrencyDecimal(result.nationalInsurance / 260)}</td>
                      </tr>
                      {result.studentLoanRepayment > 0 && (
                        <tr>
                          <td className="px-4 py-2 text-gray-700">Student Loan ({STUDENT_LOAN_PLANS[studentLoan].name})</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrency(result.studentLoanRepayment)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.studentLoanRepayment / 12)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.studentLoanRepayment / 52)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.studentLoanRepayment / 260)}</td>
                        </tr>
                      )}
                      {result.postgradLoanRepayment > 0 && (
                        <tr>
                          <td className="px-4 py-2 text-gray-700">Postgraduate Loan</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrency(result.postgradLoanRepayment)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.postgradLoanRepayment / 12)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.postgradLoanRepayment / 52)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.postgradLoanRepayment / 260)}</td>
                        </tr>
                      )}
                      {result.pensionContribution > 0 && (
                        <tr>
                          <td className="px-4 py-2 text-gray-700">Pension ({pensionPercent}%)</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrency(result.pensionContribution)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.pensionContribution / 12)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.pensionContribution / 52)}</td>
                          <td className="text-right px-4 py-2 text-orange-600">-{formatCurrencyDecimal(result.pensionContribution / 260)}</td>
                        </tr>
                      )}
                      <tr className="bg-green-50 font-semibold">
                        <td className="px-4 py-3 text-green-800">Take-Home Pay</td>
                        <td className="text-right px-4 py-3 text-green-800">{formatCurrency(result.netAnnual)}</td>
                        <td className="text-right px-4 py-3 text-green-700">{formatCurrencyDecimal(result.netAnnual / 12)}</td>
                        <td className="text-right px-4 py-3 text-green-700">{formatCurrencyDecimal(result.netAnnual / 52)}</td>
                        <td className="text-right px-4 py-3 text-green-700">{formatCurrencyDecimal(result.netAnnual / 260)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tax Band Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Income Tax Breakdown</h4>
                  {result.taxBreakdown.length > 0 ? (
                    <div className="space-y-2 text-sm">
                      {result.taxBreakdown.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="text-gray-600">{item.band} ({item.rate}%):</span>
                          <span className="font-medium text-red-600">{formatCurrency(item.amount)}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total Income Tax:</span>
                        <span className="text-red-600">{formatCurrency(result.incomeTax)}</span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No income tax due (income within Personal Allowance)</p>
                  )}
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Tax Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Marginal Rate:</span>
                      <span className="font-medium">{result.marginalRate.toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Effective Rate:</span>
                      <span className="font-medium">{result.effectiveTaxRate.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax + NI:</span>
                      <span className="font-medium text-red-600">
                        {formatCurrency(result.incomeTax + result.nationalInsurance)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hourly (37.5hr week):</span>
                      <span className="font-medium text-green-600">
                        {formatCurrencyDecimal(result.netAnnual / 1950)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* National Insurance Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">National Insurance 2024/25</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-gray-600">Primary Threshold</div>
                    <div className="font-medium">£{NI_PRIMARY_THRESHOLD.toLocaleString()}/year</div>
                    <div className="text-xs text-gray-500">No NI below this</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-gray-600">Main Rate</div>
                    <div className="font-medium">8%</div>
                    <div className="text-xs text-gray-500">£12,570 - £50,270</div>
                  </div>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="text-gray-600">Upper Rate</div>
                    <div className="font-medium">2%</div>
                    <div className="text-xs text-gray-500">Above £50,270</div>
                  </div>
                </div>
              </div>

              {/* Pension Savings Note */}
              {result.pensionContribution > 0 && pensionType === "salary_sacrifice" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">💡 Salary Sacrifice Pension Savings</h4>
                  <p className="text-sm text-green-700">
                    By using salary sacrifice, you save National Insurance on your pension contributions.
                    This saves you approximately {formatCurrency(result.pensionContribution * 0.08)} per year
                    compared to Relief at Source pension.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
              <div className="text-gray-400 text-4xl mb-4">💷</div>
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
              <li>2024/25 Income Tax rates (England/Wales/NI and Scotland)</li>
              <li>National Insurance contributions (8%/2% rates)</li>
              <li>All Student Loan plans (1, 2, 4, 5, Postgraduate)</li>
              <li>Pension contributions (Salary Sacrifice &amp; Relief at Source)</li>
              <li>Personal Allowance tapering above £100,000</li>
              <li>Blind Person&apos;s Allowance</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Tax Year 2024/25</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Personal Allowance: £12,570</li>
              <li>Basic Rate: 20% (£12,571 - £50,270)</li>
              <li>Higher Rate: 40% (£50,271 - £125,140)</li>
              <li>Additional Rate: 45% (over £125,140)</li>
              <li>Scotland has different rates and bands</li>
              <li>NI reduced from 12% to 8% in January 2024</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
