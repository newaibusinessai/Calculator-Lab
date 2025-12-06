"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("social-security-calculator")!;

type CalculatorTab =
  | "quick-estimate"
  | "retirement-age"
  | "retirement-benefits"
  | "disability"
  | "survivors"
  | "wep"
  | "gpo";

// Full Retirement Age data based on birth year
const getFullRetirementAge = (birthYear: number): { years: number; months: number } => {
  if (birthYear <= 1937) return { years: 65, months: 0 };
  if (birthYear === 1938) return { years: 65, months: 2 };
  if (birthYear === 1939) return { years: 65, months: 4 };
  if (birthYear === 1940) return { years: 65, months: 6 };
  if (birthYear === 1941) return { years: 65, months: 8 };
  if (birthYear === 1942) return { years: 65, months: 10 };
  if (birthYear >= 1943 && birthYear <= 1954) return { years: 66, months: 0 };
  if (birthYear === 1955) return { years: 66, months: 2 };
  if (birthYear === 1956) return { years: 66, months: 4 };
  if (birthYear === 1957) return { years: 66, months: 6 };
  if (birthYear === 1958) return { years: 66, months: 8 };
  if (birthYear === 1959) return { years: 66, months: 10 };
  return { years: 67, months: 0 }; // 1960 and later
};

// Calculate PIA (Primary Insurance Amount) from AIME
const calculatePIA = (aime: number): number => {
  // 2024 bend points
  const bendPoint1 = 1174;
  const bendPoint2 = 7078;

  let pia = 0;
  if (aime <= bendPoint1) {
    pia = aime * 0.90;
  } else if (aime <= bendPoint2) {
    pia = bendPoint1 * 0.90 + (aime - bendPoint1) * 0.32;
  } else {
    pia = bendPoint1 * 0.90 + (bendPoint2 - bendPoint1) * 0.32 + (aime - bendPoint2) * 0.15;
  }
  return Math.floor(pia * 10) / 10;
};

// Calculate benefit reduction for early retirement
const calculateEarlyReduction = (monthsEarly: number): number => {
  const first36Months = Math.min(monthsEarly, 36);
  const beyond36Months = Math.max(0, monthsEarly - 36);
  const reduction = (first36Months * (5/9) / 100) + (beyond36Months * (5/12) / 100);
  return reduction;
};

// Calculate delayed retirement credits
const calculateDelayedCredits = (monthsDelayed: number, birthYear: number): number => {
  let creditPerYear = 8;
  if (birthYear < 1943) {
    if (birthYear <= 1924) creditPerYear = 3;
    else if (birthYear <= 1926) creditPerYear = 3.5;
    else if (birthYear <= 1928) creditPerYear = 4;
    else if (birthYear <= 1930) creditPerYear = 4.5;
    else if (birthYear <= 1932) creditPerYear = 5;
    else if (birthYear <= 1934) creditPerYear = 5.5;
    else if (birthYear <= 1936) creditPerYear = 6;
    else if (birthYear <= 1938) creditPerYear = 6.5;
    else if (birthYear <= 1940) creditPerYear = 7;
    else creditPerYear = 7.5;
  }
  return (monthsDelayed / 12) * (creditPerYear / 100);
};

export default function SocialSecurityCalculator() {
  const [activeTab, setActiveTab] = useState<CalculatorTab>("quick-estimate");

  // Quick Estimate state
  const [qeBirthDate, setQeBirthDate] = useState("");
  const [qeCurrentEarnings, setQeCurrentEarnings] = useState("");
  const [qeRetirementAge, setQeRetirementAge] = useState("");
  const [qeResult, setQeResult] = useState<{
    monthlyBenefit: number;
    yearlyBenefit: number;
    fra: { years: number; months: number };
    adjustment: string;
  } | null>(null);

  // Retirement Age state
  const [raBirthYear, setRaBirthYear] = useState("");
  const [raResult, setRaResult] = useState<{
    fra: { years: number; months: number };
    earliest: number;
    latest: number;
    reductionAt62: number;
    increaseAt70: number;
  } | null>(null);

  // Retirement Benefits state
  const [rbBirthYear, setRbBirthYear] = useState("");
  const [rbAverageEarnings, setRbAverageEarnings] = useState("");
  const [rbResult, setRbResult] = useState<{
    pia: number;
    benefitAt62: number;
    benefitAtFRA: number;
    benefitAt70: number;
    fra: { years: number; months: number };
  } | null>(null);

  // Disability state
  const [diBirthYear, setDiBirthYear] = useState("");
  const [diAverageEarnings, setDiAverageEarnings] = useState("");
  const [diResult, setDiResult] = useState<{
    monthlyBenefit: number;
    yearlyBenefit: number;
    familyMax: number;
  } | null>(null);

  // Survivors state
  const [suDeceasedEarnings, setSuDeceasedEarnings] = useState("");
  const [suSurvivorAge, setSuSurvivorAge] = useState("");
  const [suSurvivorType, setSuSurvivorType] = useState("spouse-fra");
  const [suResult, setSuResult] = useState<{
    monthlyBenefit: number;
    yearlyBenefit: number;
    benefitType: string;
  } | null>(null);

  // WEP state
  const [wepSSEarnings, setWepSSEarnings] = useState("");
  const [wepYearsSubstantial, setWepYearsSubstantial] = useState("");
  const [wepPensionAmount, setWepPensionAmount] = useState("");
  const [wepResult, setWepResult] = useState<{
    regularBenefit: number;
    wepReduction: number;
    adjustedBenefit: number;
  } | null>(null);

  // GPO state
  const [gpoSpouseBenefit, setGpoSpouseBenefit] = useState("");
  const [gpoPensionAmount, setGpoPensionAmount] = useState("");
  const [gpoResult, setGpoResult] = useState<{
    originalBenefit: number;
    gpoReduction: number;
    adjustedBenefit: number;
  } | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Quick Estimate Calculator
  const calculateQuickEstimate = () => {
    const birthDate = new Date(qeBirthDate);
    const birthYear = birthDate.getFullYear();
    const earnings = parseFloat(qeCurrentEarnings);
    const retAge = parseFloat(qeRetirementAge);

    if (!qeBirthDate || isNaN(earnings) || isNaN(retAge)) {
      alert("Please fill in all fields");
      return;
    }

    const fra = getFullRetirementAge(birthYear);
    const fraInMonths = fra.years * 12 + fra.months;
    const retirementInMonths = retAge * 12;

    const estimatedAIME = Math.min(earnings, 168600) / 12;
    const pia = calculatePIA(estimatedAIME);

    let monthlyBenefit = pia;
    let adjustment = "";

    if (retirementInMonths < fraInMonths) {
      const monthsEarly = fraInMonths - retirementInMonths;
      const reduction = calculateEarlyReduction(monthsEarly);
      monthlyBenefit = pia * (1 - reduction);
      adjustment = `${(reduction * 100).toFixed(1)}% reduction for claiming ${Math.floor(monthsEarly / 12)} years and ${monthsEarly % 12} months early`;
    } else if (retirementInMonths > fraInMonths) {
      const monthsDelayed = Math.min(retirementInMonths - fraInMonths, 48);
      const increase = calculateDelayedCredits(monthsDelayed, birthYear);
      monthlyBenefit = pia * (1 + increase);
      adjustment = `${(increase * 100).toFixed(1)}% increase for delaying ${Math.floor(monthsDelayed / 12)} years and ${monthsDelayed % 12} months past FRA`;
    } else {
      adjustment = "Claiming at Full Retirement Age - no adjustment";
    }

    setQeResult({
      monthlyBenefit: Math.round(monthlyBenefit),
      yearlyBenefit: Math.round(monthlyBenefit * 12),
      fra,
      adjustment,
    });
  };

  // Retirement Age Calculator
  const calculateRetirementAge = () => {
    const birthYear = parseInt(raBirthYear);
    if (isNaN(birthYear) || birthYear < 1900 || birthYear > 2010) {
      alert("Please enter a valid birth year");
      return;
    }

    const fra = getFullRetirementAge(birthYear);
    const fraInMonths = fra.years * 12 + fra.months;

    const monthsEarlyAt62 = fraInMonths - (62 * 12);
    const reductionAt62 = calculateEarlyReduction(monthsEarlyAt62);

    const monthsDelayedAt70 = (70 * 12) - fraInMonths;
    const increaseAt70 = calculateDelayedCredits(monthsDelayedAt70, birthYear);

    setRaResult({
      fra,
      earliest: 62,
      latest: 70,
      reductionAt62: reductionAt62 * 100,
      increaseAt70: increaseAt70 * 100,
    });
  };

  // Retirement Benefits Calculator
  const calculateRetirementBenefits = () => {
    const birthYear = parseInt(rbBirthYear);
    const avgEarnings = parseFloat(rbAverageEarnings);

    if (isNaN(birthYear) || isNaN(avgEarnings)) {
      alert("Please fill in all fields");
      return;
    }

    const fra = getFullRetirementAge(birthYear);
    const fraInMonths = fra.years * 12 + fra.months;

    const aime = Math.min(avgEarnings, 168600) / 12;
    const pia = calculatePIA(aime);

    const monthsEarly = fraInMonths - (62 * 12);
    const reductionAt62 = calculateEarlyReduction(monthsEarly);
    const benefitAt62 = pia * (1 - reductionAt62);

    const monthsDelayed = (70 * 12) - fraInMonths;
    const increaseAt70 = calculateDelayedCredits(monthsDelayed, birthYear);
    const benefitAt70 = pia * (1 + increaseAt70);

    setRbResult({
      pia: Math.round(pia),
      benefitAt62: Math.round(benefitAt62),
      benefitAtFRA: Math.round(pia),
      benefitAt70: Math.round(benefitAt70),
      fra,
    });
  };

  // Disability Benefits Calculator
  const calculateDisabilityBenefits = () => {
    const avgEarnings = parseFloat(diAverageEarnings);

    if (isNaN(avgEarnings)) {
      alert("Please fill in all fields");
      return;
    }

    const aime = Math.min(avgEarnings, 168600) / 12;
    const pia = calculatePIA(aime);
    const familyMax = pia * 1.5;

    setDiResult({
      monthlyBenefit: Math.round(pia),
      yearlyBenefit: Math.round(pia * 12),
      familyMax: Math.round(familyMax),
    });
  };

  // Survivors Benefits Calculator
  const calculateSurvivorsBenefits = () => {
    const deceasedEarnings = parseFloat(suDeceasedEarnings);

    if (isNaN(deceasedEarnings)) {
      alert("Please fill in all fields");
      return;
    }

    const aime = Math.min(deceasedEarnings, 168600) / 12;
    const pia = calculatePIA(aime);

    let benefitPercent = 0;
    let benefitType = "";

    switch (suSurvivorType) {
      case "spouse-fra":
        benefitPercent = 1.0;
        benefitType = "Surviving Spouse at Full Retirement Age";
        break;
      case "spouse-60":
        benefitPercent = 0.715;
        benefitType = "Surviving Spouse at Age 60";
        break;
      case "spouse-disabled":
        benefitPercent = 0.715;
        benefitType = "Disabled Surviving Spouse (50-59)";
        break;
      case "spouse-caring":
        benefitPercent = 0.75;
        benefitType = "Surviving Spouse Caring for Child Under 16";
        break;
      case "child":
        benefitPercent = 0.75;
        benefitType = "Surviving Child Under 18 (or 19 if in school)";
        break;
      case "parent":
        benefitPercent = 0.825;
        benefitType = "Dependent Parent Age 62+";
        break;
      default:
        benefitPercent = 1.0;
        benefitType = "Surviving Spouse";
    }

    const monthlyBenefit = pia * benefitPercent;

    setSuResult({
      monthlyBenefit: Math.round(monthlyBenefit),
      yearlyBenefit: Math.round(monthlyBenefit * 12),
      benefitType,
    });
  };

  // WEP Calculator
  const calculateWEP = () => {
    const ssEarnings = parseFloat(wepSSEarnings);
    const yearsSubstantial = parseInt(wepYearsSubstantial);
    const pension = parseFloat(wepPensionAmount);

    if (isNaN(ssEarnings) || isNaN(yearsSubstantial) || isNaN(pension)) {
      alert("Please fill in all fields");
      return;
    }

    const aime = Math.min(ssEarnings, 168600) / 12;
    const regularBenefit = calculatePIA(aime);

    let wepReduction = 0;
    const maxWepReduction = 558;

    if (yearsSubstantial < 30) {
      const bendPoint1 = 1174;
      const firstBendAmount = Math.min(aime, bendPoint1);
      wepReduction = firstBendAmount * 0.5;

      if (yearsSubstantial >= 21) wepReduction *= 0.9;
      if (yearsSubstantial >= 22) wepReduction *= 0.8;
      if (yearsSubstantial >= 23) wepReduction *= 0.7;
      if (yearsSubstantial >= 24) wepReduction *= 0.6;
      if (yearsSubstantial >= 25) wepReduction *= 0.5;
      if (yearsSubstantial >= 26) wepReduction *= 0.4;
      if (yearsSubstantial >= 27) wepReduction *= 0.3;
      if (yearsSubstantial >= 28) wepReduction *= 0.2;
      if (yearsSubstantial >= 29) wepReduction *= 0.1;

      wepReduction = Math.min(wepReduction, maxWepReduction, pension / 2);
    }

    setWepResult({
      regularBenefit: Math.round(regularBenefit),
      wepReduction: Math.round(wepReduction),
      adjustedBenefit: Math.round(regularBenefit - wepReduction),
    });
  };

  // GPO Calculator
  const calculateGPO = () => {
    const spouseBenefit = parseFloat(gpoSpouseBenefit);
    const pension = parseFloat(gpoPensionAmount);

    if (isNaN(spouseBenefit) || isNaN(pension)) {
      alert("Please fill in all fields");
      return;
    }

    const gpoReduction = (pension * 2) / 3;
    const adjustedBenefit = Math.max(0, spouseBenefit - gpoReduction);

    setGpoResult({
      originalBenefit: Math.round(spouseBenefit),
      gpoReduction: Math.round(gpoReduction),
      adjustedBenefit: Math.round(adjustedBenefit),
    });
  };

  const tabs = [
    { id: "quick-estimate" as CalculatorTab, label: "Quick Estimate", shortLabel: "Quick" },
    { id: "retirement-age" as CalculatorTab, label: "Retirement Age", shortLabel: "FRA" },
    { id: "retirement-benefits" as CalculatorTab, label: "Retirement Benefits", shortLabel: "Retire" },
    { id: "disability" as CalculatorTab, label: "Disability", shortLabel: "SSDI" },
    { id: "survivors" as CalculatorTab, label: "Survivors", shortLabel: "Surv." },
    { id: "wep" as CalculatorTab, label: "WEP", shortLabel: "WEP" },
    { id: "gpo" as CalculatorTab, label: "GPO", shortLabel: "GPO" },
  ];

  const faqs = [
    {
      question: "What is Full Retirement Age (FRA)?",
      answer: "Full Retirement Age is the age at which you can receive your full Social Security retirement benefit without any reduction. It ranges from 65 to 67 depending on your birth year. If you were born in 1960 or later, your FRA is 67."
    },
    {
      question: "How much is my benefit reduced if I claim early?",
      answer: "If you claim before your FRA, your benefit is permanently reduced. For the first 36 months early, the reduction is 5/9 of 1% per month (about 6.7% per year). For months beyond 36, it's 5/12 of 1% per month (5% per year). Claiming at 62 with an FRA of 67 results in a 30% reduction."
    },
    {
      question: "What are delayed retirement credits?",
      answer: "If you delay claiming past your FRA (up to age 70), you earn delayed retirement credits of 8% per year for those born 1943 or later. This increases your benefit permanently. For example, if your FRA is 67, waiting until 70 increases your benefit by 24%."
    },
    {
      question: "What is the Windfall Elimination Provision (WEP)?",
      answer: "WEP reduces Social Security benefits for workers who also receive a pension from work not covered by Social Security (like some government jobs). The reduction is based on years of 'substantial earnings' under Social Security. With 30+ years of substantial earnings, WEP doesn't apply."
    },
    {
      question: "What is the Government Pension Offset (GPO)?",
      answer: "GPO affects spouse or survivor benefits for those who receive a pension from government work not covered by Social Security. The spouse/survivor benefit is reduced by 2/3 of the government pension amount."
    },
    {
      question: "How are disability benefits calculated?",
      answer: "Social Security Disability Insurance (SSDI) benefits are calculated the same way as retirement benefits - based on your average indexed monthly earnings. There's no reduction for age since you receive your full PIA regardless of when you become disabled."
    }
  ];

  const howTo = [
    "Select the calculator type that matches your needs using the tabs above",
    "Quick Estimate: Enter your birth date, current annual earnings, and desired retirement age for a rough benefit estimate",
    "Retirement Age: Enter your birth year to find your Full Retirement Age and see how early or late claiming affects benefits",
    "Retirement Benefits: Compare your estimated benefits at ages 62, Full Retirement Age, and 70",
    "Disability: Estimate SSDI benefits if you become disabled before retirement age",
    "Survivors: Calculate benefits available to surviving family members of a deceased worker",
    "WEP: See how a pension from non-covered work affects your Social Security benefit",
    "GPO: Calculate how a government pension offsets spouse/survivor benefits"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="PIA = 90% of first $1,174 AIME + 32% of AIME $1,174-$7,078 + 15% of AIME over $7,078 (2024 bend points)"
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex flex-wrap gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Quick Estimate Calculator */}
        {activeTab === "quick-estimate" && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Quick Benefits Estimator</h3>
              <p className="text-sm text-blue-700">Get a rough estimate of your Social Security retirement benefit based on your current earnings and planned retirement age.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={qeBirthDate}
                  onChange={(e) => setQeBirthDate(e.target.value)}
                  className="calc-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Annual Earnings ($)</label>
                <input
                  type="number"
                  value={qeCurrentEarnings}
                  onChange={(e) => setQeCurrentEarnings(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 75000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Planned Retirement Age</label>
                <input
                  type="number"
                  value={qeRetirementAge}
                  onChange={(e) => setQeRetirementAge(e.target.value)}
                  className="calc-input"
                  placeholder="62-70"
                  min="62"
                  max="70"
                />
              </div>
            </div>

            <button onClick={calculateQuickEstimate} className="calc-btn calc-btn-primary w-full">
              Calculate Estimate
            </button>

            {qeResult && (
              <div className="result-box">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimated Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Monthly Benefit</div>
                    <div className="text-3xl font-bold text-green-700">{formatCurrency(qeResult.monthlyBenefit)}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Annual Benefit</div>
                    <div className="text-3xl font-bold text-blue-700">{formatCurrency(qeResult.yearlyBenefit)}</div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Your Full Retirement Age:</strong> {qeResult.fra.years} years{qeResult.fra.months > 0 ? ` and ${qeResult.fra.months} months` : ""}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Adjustment:</strong> {qeResult.adjustment}
                  </p>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">How to Interpret Your Results</h4>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>This is a rough estimate based on your current earnings continuing until retirement</li>
                <li>Actual benefits depend on your complete 35-year earnings history</li>
                <li>Benefits are adjusted annually for cost of living (COLA)</li>
                <li>Create a my Social Security account at ssa.gov for a more accurate estimate</li>
              </ul>
            </div>
          </div>
        )}

        {/* Retirement Age Calculator */}
        {activeTab === "retirement-age" && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Full Retirement Age Calculator</h3>
              <p className="text-sm text-blue-700">Find your Full Retirement Age (FRA) and see how claiming early or late affects your benefits.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Birth Year</label>
              <input
                type="number"
                value={raBirthYear}
                onChange={(e) => setRaBirthYear(e.target.value)}
                className="calc-input"
                placeholder="e.g., 1965"
                min="1900"
                max="2010"
              />
            </div>

            <button onClick={calculateRetirementAge} className="calc-btn calc-btn-primary w-full">
              Calculate Retirement Age
            </button>

            {raResult && (
              <div className="result-box">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Retirement Age Details</h3>

                <div className="bg-green-50 p-4 rounded-lg text-center mb-4">
                  <div className="text-sm text-gray-600">Full Retirement Age (FRA)</div>
                  <div className="text-3xl font-bold text-green-700">
                    {raResult.fra.years} years{raResult.fra.months > 0 ? ` ${raResult.fra.months} months` : ""}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Earliest Age to Claim</div>
                    <div className="text-2xl font-bold text-red-700">{raResult.earliest}</div>
                    <div className="text-sm text-red-600 mt-1">
                      {raResult.reductionAt62.toFixed(1)}% permanent reduction
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">Maximum Benefit Age</div>
                    <div className="text-2xl font-bold text-blue-700">{raResult.latest}</div>
                    <div className="text-sm text-blue-600 mt-1">
                      {raResult.increaseAt70.toFixed(1)}% permanent increase
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Understanding Full Retirement Age</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p><strong>Born 1937 or earlier:</strong> FRA is 65</p>
                <p><strong>Born 1938-1942:</strong> FRA is 65 + 2 months for each year after 1937</p>
                <p><strong>Born 1943-1954:</strong> FRA is 66</p>
                <p><strong>Born 1955-1959:</strong> FRA is 66 + 2 months for each year after 1954</p>
                <p><strong>Born 1960 or later:</strong> FRA is 67</p>
              </div>
            </div>
          </div>
        )}

        {/* Retirement Benefits Calculator */}
        {activeTab === "retirement-benefits" && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Retirement Benefits Estimator</h3>
              <p className="text-sm text-blue-700">Compare your estimated monthly benefits at different retirement ages (62, FRA, and 70).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Birth Year</label>
                <input
                  type="number"
                  value={rbBirthYear}
                  onChange={(e) => setRbBirthYear(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 1965"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Annual Earnings ($)</label>
                <input
                  type="number"
                  value={rbAverageEarnings}
                  onChange={(e) => setRbAverageEarnings(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 75000"
                />
                <p className="text-xs text-gray-500 mt-1">Your average earnings over your highest 35 years</p>
              </div>
            </div>

            <button onClick={calculateRetirementBenefits} className="calc-btn calc-btn-primary w-full">
              Calculate Benefits
            </button>

            {rbResult && (
              <div className="result-box">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Benefit Comparison</h3>

                <div className="bg-purple-50 p-4 rounded-lg text-center mb-4">
                  <div className="text-sm text-gray-600">Primary Insurance Amount (PIA)</div>
                  <div className="text-2xl font-bold text-purple-700">{formatCurrency(rbResult.pia)}</div>
                  <div className="text-xs text-gray-500">Your base benefit at Full Retirement Age</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">At Age 62</div>
                    <div className="text-2xl font-bold text-red-700">{formatCurrency(rbResult.benefitAt62)}</div>
                    <div className="text-xs text-red-600">Earliest claiming age</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">At FRA ({rbResult.fra.years}{rbResult.fra.months > 0 ? `:${rbResult.fra.months}` : ""})</div>
                    <div className="text-2xl font-bold text-green-700">{formatCurrency(rbResult.benefitAtFRA)}</div>
                    <div className="text-xs text-green-600">Full benefit amount</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">At Age 70</div>
                    <div className="text-2xl font-bold text-blue-700">{formatCurrency(rbResult.benefitAt70)}</div>
                    <div className="text-xs text-blue-600">Maximum benefit</div>
                  </div>
                </div>

                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Break-Even Analysis</h4>
                  <p className="text-sm text-gray-600">
                    The break-even age (when total benefits from waiting exceed what you would have received
                    by claiming earlier) is typically around age 80-82. Consider your health, financial needs,
                    and life expectancy when deciding when to claim.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Disability Calculator */}
        {activeTab === "disability" && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Disability Benefits Estimator (SSDI)</h3>
              <p className="text-sm text-blue-700">Estimate Social Security Disability Insurance benefits based on your earnings history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Birth Year</label>
                <input
                  type="number"
                  value={diBirthYear}
                  onChange={(e) => setDiBirthYear(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 1980"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Annual Earnings ($)</label>
                <input
                  type="number"
                  value={diAverageEarnings}
                  onChange={(e) => setDiAverageEarnings(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 60000"
                />
              </div>
            </div>

            <button onClick={calculateDisabilityBenefits} className="calc-btn calc-btn-primary w-full">
              Calculate Disability Benefits
            </button>

            {diResult && (
              <div className="result-box">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimated SSDI Benefits</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Monthly Benefit</div>
                    <div className="text-3xl font-bold text-green-700">{formatCurrency(diResult.monthlyBenefit)}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Annual Benefit</div>
                    <div className="text-3xl font-bold text-blue-700">{formatCurrency(diResult.yearlyBenefit)}</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Family Maximum</div>
                    <div className="text-3xl font-bold text-purple-700">{formatCurrency(diResult.familyMax)}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">SSDI Eligibility Requirements</h4>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>You must have a medical condition that meets Social Security&apos;s strict definition of disability</li>
                <li>The disability must be expected to last at least 12 months or result in death</li>
                <li>You must have earned enough work credits (typically 40 credits, with 20 in the last 10 years)</li>
                <li>There is a 5-month waiting period before benefits begin</li>
                <li>After 24 months of SSDI, you become eligible for Medicare</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Understanding SSDI vs SSI</h4>
              <p className="text-sm text-gray-600">
                <strong>SSDI (Social Security Disability Insurance)</strong> is based on your work history and
                the taxes you&apos;ve paid. <strong>SSI (Supplemental Security Income)</strong> is a needs-based
                program for those with limited income and resources, regardless of work history. This calculator
                estimates SSDI benefits only.
              </p>
            </div>
          </div>
        )}

        {/* Survivors Calculator */}
        {activeTab === "survivors" && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Survivors Benefits Estimator</h3>
              <p className="text-sm text-blue-700">Calculate benefits available to surviving family members of a deceased worker.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Deceased&apos;s Average Annual Earnings ($)</label>
                <input
                  type="number"
                  value={suDeceasedEarnings}
                  onChange={(e) => setSuDeceasedEarnings(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 70000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survivor&apos;s Current Age</label>
                <input
                  type="number"
                  value={suSurvivorAge}
                  onChange={(e) => setSuSurvivorAge(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Survivor Type</label>
                <select
                  value={suSurvivorType}
                  onChange={(e) => setSuSurvivorType(e.target.value)}
                  className="calc-input"
                >
                  <option value="spouse-fra">Spouse at FRA or older</option>
                  <option value="spouse-60">Spouse age 60+</option>
                  <option value="spouse-disabled">Disabled Spouse (50-59)</option>
                  <option value="spouse-caring">Spouse caring for child under 16</option>
                  <option value="child">Child under 18</option>
                  <option value="parent">Dependent Parent 62+</option>
                </select>
              </div>
            </div>

            <button onClick={calculateSurvivorsBenefits} className="calc-btn calc-btn-primary w-full">
              Calculate Survivors Benefits
            </button>

            {suResult && (
              <div className="result-box">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Estimated Survivors Benefits</h3>

                <div className="bg-purple-50 p-4 rounded-lg text-center mb-4">
                  <div className="text-sm text-gray-600">{suResult.benefitType}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Monthly Benefit</div>
                    <div className="text-3xl font-bold text-green-700">{formatCurrency(suResult.monthlyBenefit)}</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Annual Benefit</div>
                    <div className="text-3xl font-bold text-blue-700">{formatCurrency(suResult.yearlyBenefit)}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Survivors Benefit Percentages</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Widow(er) at FRA or older:</strong> 100% of deceased&apos;s benefit</p>
                <p><strong>Widow(er) age 60-FRA:</strong> 71.5% to 99% (depends on age)</p>
                <p><strong>Disabled widow(er) 50-59:</strong> 71.5%</p>
                <p><strong>Widow(er) caring for child under 16:</strong> 75%</p>
                <p><strong>Child under 18 (or 19 if in school):</strong> 75%</p>
                <p><strong>Dependent parent 62+:</strong> 82.5% (one parent) or 75% each (two parents)</p>
              </div>
            </div>
          </div>
        )}

        {/* WEP Calculator */}
        {activeTab === "wep" && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Windfall Elimination Provision (WEP) Calculator</h3>
              <p className="text-sm text-blue-700">See how a pension from work not covered by Social Security affects your benefits.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SS-Covered Annual Earnings ($)</label>
                <input
                  type="number"
                  value={wepSSEarnings}
                  onChange={(e) => setWepSSEarnings(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 50000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Years of Substantial SS Earnings</label>
                <input
                  type="number"
                  value={wepYearsSubstantial}
                  onChange={(e) => setWepYearsSubstantial(e.target.value)}
                  className="calc-input"
                  placeholder="0-30"
                  min="0"
                  max="30"
                />
                <p className="text-xs text-gray-500 mt-1">Substantial earnings in 2024: $31,275+</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Non-Covered Pension ($)</label>
                <input
                  type="number"
                  value={wepPensionAmount}
                  onChange={(e) => setWepPensionAmount(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 2000"
                />
              </div>
            </div>

            <button onClick={calculateWEP} className="calc-btn calc-btn-primary w-full">
              Calculate WEP Impact
            </button>

            {wepResult && (
              <div className="result-box">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">WEP Calculation Results</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Regular Benefit</div>
                    <div className="text-2xl font-bold text-gray-700">{formatCurrency(wepResult.regularBenefit)}</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">WEP Reduction</div>
                    <div className="text-2xl font-bold text-red-700">-{formatCurrency(wepResult.wepReduction)}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Adjusted Benefit</div>
                    <div className="text-2xl font-bold text-green-700">{formatCurrency(wepResult.adjustedBenefit)}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">WEP Key Points</h4>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>WEP applies if you receive a pension from work not covered by Social Security</li>
                <li>Common examples: some state/local government jobs, foreign employment</li>
                <li>The maximum WEP reduction for 2024 is $558/month</li>
                <li>WEP reduction cannot be more than half your non-covered pension</li>
                <li>With 30+ years of substantial SS earnings, WEP does not apply</li>
                <li>Each year of substantial earnings between 21-29 reduces WEP impact</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">What Are Substantial Earnings?</h4>
              <p className="text-sm text-gray-600">
                For 2024, substantial earnings means earning at least $31,275 from work covered by
                Social Security. This amount increases each year. Having 30 or more years of substantial
                earnings eliminates WEP entirely.
              </p>
            </div>
          </div>
        )}

        {/* GPO Calculator */}
        {activeTab === "gpo" && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">Government Pension Offset (GPO) Calculator</h3>
              <p className="text-sm text-blue-700">Calculate how a government pension affects your Social Security spouse or survivor benefits.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Spouse/Survivor Benefit ($)</label>
                <input
                  type="number"
                  value={gpoSpouseBenefit}
                  onChange={(e) => setGpoSpouseBenefit(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 1500"
                />
                <p className="text-xs text-gray-500 mt-1">The SS benefit you would receive based on your spouse&apos;s record</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Government Pension ($)</label>
                <input
                  type="number"
                  value={gpoPensionAmount}
                  onChange={(e) => setGpoPensionAmount(e.target.value)}
                  className="calc-input"
                  placeholder="e.g., 2500"
                />
                <p className="text-xs text-gray-500 mt-1">Your pension from non-SS-covered government work</p>
              </div>
            </div>

            <button onClick={calculateGPO} className="calc-btn calc-btn-primary w-full">
              Calculate GPO Impact
            </button>

            {gpoResult && (
              <div className="result-box">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">GPO Calculation Results</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Original SS Benefit</div>
                    <div className="text-2xl font-bold text-gray-700">{formatCurrency(gpoResult.originalBenefit)}</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">GPO Reduction (2/3 of pension)</div>
                    <div className="text-2xl font-bold text-red-700">-{formatCurrency(gpoResult.gpoReduction)}</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-sm text-gray-600">Adjusted Benefit</div>
                    <div className="text-2xl font-bold text-green-700">{formatCurrency(gpoResult.adjustedBenefit)}</div>
                  </div>
                </div>

                {gpoResult.adjustedBenefit === 0 && (
                  <div className="mt-4 bg-red-100 p-4 rounded-lg">
                    <p className="text-sm text-red-700">
                      <strong>Note:</strong> Your government pension fully offsets your spouse/survivor benefit.
                      You would not receive any Social Security spouse or survivor benefits.
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">GPO Key Points</h4>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>GPO affects Social Security spouse or survivor benefits only</li>
                <li>It reduces these benefits by 2/3 of your government pension</li>
                <li>If 2/3 of your pension exceeds your SS benefit, you receive nothing from SS</li>
                <li>GPO applies to pensions from federal, state, or local government work not covered by SS</li>
                <li>GPO does NOT affect your own Social Security retirement benefits</li>
                <li>GPO is separate from WEP (which affects your own benefits)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">GPO vs WEP: What&apos;s the Difference?</h4>
              <p className="text-sm text-gray-600">
                <strong>WEP</strong> affects your own Social Security retirement or disability benefits
                if you have a pension from non-covered work. <strong>GPO</strong> affects the spouse
                or survivor benefits you might receive based on your spouse&apos;s Social Security record.
                Both can apply to the same person.
              </p>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">Important Disclaimer</h3>
          <p className="text-sm text-gray-600 mb-3">
            These calculators provide estimates only and should not be used as the sole basis for
            financial planning decisions. Actual Social Security benefits depend on your complete
            earnings history and other factors. For official estimates, create a my Social Security
            account at{" "}
            <a href="https://www.ssa.gov/myaccount/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              ssa.gov/myaccount
            </a>.
          </p>
          <p className="text-sm text-gray-600">
            The formulas and bend points used are based on 2024 values. Social Security adjusts these
            annually for inflation and wage growth. The 2024 maximum taxable earnings is $168,600.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
