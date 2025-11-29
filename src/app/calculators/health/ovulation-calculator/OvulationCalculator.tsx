"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("ovulation-calculator")!;

export default function OvulationCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [result, setResult] = useState<{
    ovulationDate: string;
    fertileWindowStart: string;
    fertileWindowEnd: string;
    nextPeriodDate: string;
    testDate: string;
  } | null>(null);

  const calculate = () => {
    if (!lastPeriodDate) return;

    const lmp = new Date(lastPeriodDate);
    const cycle = parseInt(cycleLength) || 28;

    // Ovulation typically occurs 14 days before next period
    const ovulationDay = cycle - 14;
    const ovulationDate = new Date(lmp);
    ovulationDate.setDate(ovulationDate.getDate() + ovulationDay);

    // Fertile window is 5 days before ovulation to 1 day after
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    // Next period date
    const nextPeriod = new Date(lmp);
    nextPeriod.setDate(nextPeriod.getDate() + cycle);

    // Best day to take pregnancy test (first day of missed period)
    const testDate = new Date(nextPeriod);

    setResult({
      ovulationDate: ovulationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      fertileWindowStart: fertileStart.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      fertileWindowEnd: fertileEnd.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      nextPeriodDate: nextPeriod.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      testDate: testDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Ovulation Date = LMP + (Cycle Length - 14) days; Fertile Window = Ovulation Date ± 5-6 days; Next Period = LMP + Cycle Length; Most Fertile Days = 2 days before ovulation to day of ovulation"
      faqs={[
        {
          question: "When am I most fertile?",
          answer: "You're most fertile during the 6-day window ending on ovulation day. The highest pregnancy rates occur when intercourse happens 2 days before ovulation, the day before ovulation, and on ovulation day. Sperm can survive up to 5 days, while the egg lives 12-24 hours."
        },
        {
          question: "How accurate is the ovulation calculator?",
          answer: "This calculator assumes ovulation occurs 14 days before your next period, which is accurate for most women with regular cycles. However, ovulation timing can vary by ±2 days. For precise ovulation detection, use ovulation predictor kits (OPKs) or track basal body temperature."
        },
        {
          question: "What if my cycle is irregular?",
          answer: "If your cycle length varies by more than 7-9 days month to month, this calculator may be less accurate. Track your cycles for 3-6 months to find your average length. Consider using ovulation predictor kits, cervical mucus monitoring, or consulting a healthcare provider."
        },
        {
          question: "When should I take a pregnancy test?",
          answer: "For most accurate results, take a pregnancy test on or after the first day of your missed period (shown in the results). Some sensitive tests can detect pregnancy 8-10 days after ovulation, but false negatives are common if testing too early."
        }
      ]}
      howTo={[
        "Remember the first day of your last menstrual period",
        "Select that date using the date picker",
        "Enter your average cycle length (number of days from first day of one period to first day of next)",
        "If unsure, use 28 days as a typical average",
        "Click 'Calculate Ovulation' to see your results",
        "Review your estimated ovulation date",
        "Note your fertile window (best days for conception)",
        "See your next expected period date",
        "Check when to take a pregnancy test if needed"
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Day of Last Period
          </label>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            className="calc-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Cycle Length (days)
          </label>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            className="calc-input"
            placeholder="28"
            min="21"
            max="45"
          />
          <p className="text-xs text-gray-500 mt-1">
            Typical range: 21-35 days. Average is 28 days.
          </p>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Ovulation
        </button>

        {result && (
          <div className="result-box">
            <h3 className="text-xl font-semibold mb-4">Your Ovulation Calendar</h3>

            <div className="bg-pink-50 p-4 rounded-lg text-center mb-4">
              <div className="text-sm text-gray-600 mb-1">Estimated Ovulation Date</div>
              <div className="text-2xl font-bold text-pink-700">{result.ovulationDate}</div>
              <div className="text-xs text-gray-500 mt-1">Most likely day to ovulate</div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <div className="text-sm text-gray-600 mb-2 font-medium">Fertile Window (Best Days for Conception)</div>
              <div className="text-center">
                <div className="text-lg font-semibold text-purple-700">
                  {result.fertileWindowStart}
                </div>
                <div className="text-sm text-gray-500 my-1">to</div>
                <div className="text-lg font-semibold text-purple-700">
                  {result.fertileWindowEnd}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-center">
                Peak fertility: 2 days before ovulation
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Next Period Expected</div>
                <div className="text-lg font-semibold text-blue-700">{result.nextPeriodDate}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Pregnancy Test Date</div>
                <div className="text-lg font-semibold text-green-700">{result.testDate}</div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Ovulation</h3>
          <p className="mb-2">
            Ovulation is when an ovary releases an egg. This typically occurs about 14 days before
            your next period starts. The fertile window is the 6 days leading up to and including ovulation day.
          </p>
          <p className="text-xs">
            Note: This calculator provides estimates based on average cycles. For precise tracking,
            consider using ovulation predictor kits or monitoring basal body temperature.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
