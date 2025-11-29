"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("mortgage-calculator")!;

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTax, setPropertyTax] = useState("3000");
  const [homeInsurance, setHomeInsurance] = useState("1200");
  const [pmi, setPmi] = useState("0");
  const [hoa, setHoa] = useState("0");

  const [result, setResult] = useState<{
    principal: number;
    monthlyPrincipalInterest: number;
    monthlyTax: number;
    monthlyInsurance: number;
    monthlyPmi: number;
    monthlyHoa: number;
    totalMonthly: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const updateDownPaymentFromPercent = (percent: string) => {
    setDownPaymentPercent(percent);
    const price = parseFloat(homePrice);
    const pct = parseFloat(percent);
    if (!isNaN(price) && !isNaN(pct)) {
      setDownPayment(String(Math.round(price * (pct / 100))));
    }
  };

  const updateDownPaymentFromAmount = (amount: string) => {
    setDownPayment(amount);
    const price = parseFloat(homePrice);
    const amt = parseFloat(amount);
    if (!isNaN(price) && !isNaN(amt) && price > 0) {
      setDownPaymentPercent(String(((amt / price) * 100).toFixed(1)));
    }
  };

  const calculate = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate) / 100;
    const years = parseInt(loanTerm);
    const annualTax = parseFloat(propertyTax) || 0;
    const annualInsurance = parseFloat(homeInsurance) || 0;
    const annualPmi = parseFloat(pmi) || 0;
    const monthlyHoaFee = parseFloat(hoa) || 0;

    if (isNaN(price) || isNaN(down) || isNaN(rate) || isNaN(years)) {
      return;
    }

    const principal = price - down;
    const monthlyRate = rate / 12;
    const numPayments = years * 12;

    let monthlyPrincipalInterest: number;
    if (monthlyRate === 0) {
      monthlyPrincipalInterest = principal / numPayments;
    } else {
      monthlyPrincipalInterest =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
        (Math.pow(1 + monthlyRate, numPayments) - 1);
    }

    const monthlyTax = annualTax / 12;
    const monthlyInsurance = annualInsurance / 12;
    const monthlyPmi = annualPmi / 12;

    const totalMonthly =
      monthlyPrincipalInterest +
      monthlyTax +
      monthlyInsurance +
      monthlyPmi +
      monthlyHoaFee;

    const totalPayment = monthlyPrincipalInterest * numPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      principal,
      monthlyPrincipalInterest,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      monthlyHoa: monthlyHoaFee,
      totalMonthly,
      totalPayment,
      totalInterest,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formula = "M = P × [r(1+r)^n] / [(1+r)^n - 1]\n\nWhere:\nM = Monthly Payment\nP = Principal (loan amount)\nr = Monthly interest rate (annual rate / 12)\nn = Number of payments (years × 12)";

  const faqs = [
    {
      question: "How much house can I afford?",
      answer: "A common rule is the 28/36 rule: spend no more than 28% of gross monthly income on housing costs and no more than 36% on total debt. However, this varies based on your financial situation, other debts, and local housing costs."
    },
    {
      question: "What is PMI and when is it required?",
      answer: "Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home price. It protects the lender if you default. PMI typically costs 0.5-1% of the loan amount annually and can be removed once you have 20% equity."
    },
    {
      question: "Should I choose a 15-year or 30-year mortgage?",
      answer: "A 15-year mortgage has higher monthly payments but lower total interest and faster equity building. A 30-year mortgage has lower monthly payments but more total interest paid. Choose based on your budget and financial goals."
    },
    {
      question: "What costs are not included in this calculator?",
      answer: "This calculator estimates principal, interest, taxes, insurance, PMI, and HOA. It doesn't include closing costs (2-5% of loan), maintenance (1% of home value/year), utilities, or potential special assessments."
    },
    {
      question: "How does interest rate affect my payment?",
      answer: "Interest rate significantly impacts your monthly payment and total cost. For example, on a $300,000 loan over 30 years, a 1% rate increase (from 6% to 7%) adds about $200/month to your payment and over $70,000 in total interest."
    }
  ];

  const howTo = [
    "Enter the home purchase price",
    "Set your down payment amount or percentage",
    "Enter the interest rate (check current rates with lenders)",
    "Select your loan term (15, 20, or 30 years)",
    "Add property tax, insurance, PMI, and HOA if applicable",
    "Click Calculate to see your monthly payment breakdown"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="max-w-2xl mx-auto">
        {/* Main inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Home Price ($)
            </label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => {
                setHomePrice(e.target.value);
                updateDownPaymentFromPercent(downPaymentPercent);
              }}
              className="calc-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Down Payment
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={downPayment}
                onChange={(e) => updateDownPaymentFromAmount(e.target.value)}
                className="calc-input flex-1"
                placeholder="$"
              />
              <input
                type="number"
                value={downPaymentPercent}
                onChange={(e) => updateDownPaymentFromPercent(e.target.value)}
                className="calc-input w-20"
                placeholder="%"
              />
              <span className="flex items-center text-gray-500">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="calc-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Term (Years)
            </label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              className="calc-input"
            >
              <option value="30">30 Years</option>
              <option value="20">20 Years</option>
              <option value="15">15 Years</option>
              <option value="10">10 Years</option>
            </select>
          </div>
        </div>

        {/* Additional costs */}
        <div className="border-t pt-4 mb-6">
          <h3 className="font-medium text-gray-700 mb-3">
            Additional Costs (Annual)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Property Tax
              </label>
              <input
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(e.target.value)}
                className="calc-input"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                Home Insurance
              </label>
              <input
                type="number"
                value={homeInsurance}
                onChange={(e) => setHomeInsurance(e.target.value)}
                className="calc-input"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">PMI</label>
              <input
                type="number"
                value={pmi}
                onChange={(e) => setPmi(e.target.value)}
                className="calc-input"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">
                HOA (Monthly)
              </label>
              <input
                type="number"
                value={hoa}
                onChange={(e) => setHoa(e.target.value)}
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
          <>
            {/* Total monthly payment */}
            <div className="result-box text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">
                Total Monthly Payment
              </div>
              <div className="text-4xl font-bold text-green-700">
                {formatCurrency(result.totalMonthly)}
              </div>
            </div>

            {/* Payment breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Monthly Payment Breakdown
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Principal & Interest</span>
                  <span className="font-medium">
                    {formatCurrency(result.monthlyPrincipalInterest)}
                  </span>
                </div>
                {result.monthlyTax > 0 && (
                  <div className="flex justify-between">
                    <span>Property Tax</span>
                    <span className="font-medium">
                      {formatCurrency(result.monthlyTax)}
                    </span>
                  </div>
                )}
                {result.monthlyInsurance > 0 && (
                  <div className="flex justify-between">
                    <span>Home Insurance</span>
                    <span className="font-medium">
                      {formatCurrency(result.monthlyInsurance)}
                    </span>
                  </div>
                )}
                {result.monthlyPmi > 0 && (
                  <div className="flex justify-between">
                    <span>PMI</span>
                    <span className="font-medium">
                      {formatCurrency(result.monthlyPmi)}
                    </span>
                  </div>
                )}
                {result.monthlyHoa > 0 && (
                  <div className="flex justify-between">
                    <span>HOA Fees</span>
                    <span className="font-medium">
                      {formatCurrency(result.monthlyHoa)}
                    </span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(result.totalMonthly)}</span>
                </div>
              </div>
            </div>

            {/* Loan summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Loan Amount</div>
                <div className="text-xl font-bold text-gray-800">
                  {formatCurrency(result.principal)}
                </div>
              </div>
              <div className="border rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">
                  Total of {parseInt(loanTerm) * 12} Payments
                </div>
                <div className="text-xl font-bold text-blue-700">
                  {formatCurrency(result.totalPayment)}
                </div>
              </div>
              <div className="border rounded p-4 text-center">
                <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                <div className="text-xl font-bold text-red-600">
                  {formatCurrency(result.totalInterest)}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Info */}
        <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Understanding Your Mortgage</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Principal & Interest:</strong> The main loan payment
            </li>
            <li>
              <strong>Property Tax:</strong> Usually 1-2% of home value annually
            </li>
            <li>
              <strong>PMI:</strong> Required if down payment is less than 20%
            </li>
            <li>
              <strong>HOA:</strong> Homeowners Association fees if applicable
            </li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
