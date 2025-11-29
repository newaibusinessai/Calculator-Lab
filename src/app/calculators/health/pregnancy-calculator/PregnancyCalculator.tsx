"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("pregnancy-calculator")!;

export default function PregnancyCalculator() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [result, setResult] = useState<{
    dueDate: string;
    daysPregnant: number;
    weeksPregnant: number;
    trimester: number;
    daysRemaining: number;
  } | null>(null);

  const calculate = () => {
    if (!lastPeriodDate) return;

    const lmp = new Date(lastPeriodDate);
    const dueDate = new Date(lmp);
    dueDate.setDate(dueDate.getDate() + 280);

    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - lmp.getTime()) / (1000 * 60 * 60 * 24));
    const weeksDiff = Math.floor(daysDiff / 7);
    const daysRemaining = 280 - daysDiff;

    let trimester = 1;
    if (weeksDiff >= 27) trimester = 3;
    else if (weeksDiff >= 13) trimester = 2;

    setResult({
      dueDate: dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      daysPregnant: daysDiff,
      weeksPregnant: weeksDiff,
      trimester,
      daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Due Date = LMP (Last Menstrual Period) + 280 days (40 weeks); Conception Date ≈ LMP + 14 days; Weeks Pregnant = (Today - LMP) / 7; Trimester 1: Weeks 1-13; Trimester 2: Weeks 14-27; Trimester 3: Weeks 28-40"
      faqs={[
        {
          question: "How accurate is the pregnancy due date?",
          answer: "Due dates calculated from LMP are accurate within ±2 weeks for most women with regular 28-day cycles. Only about 5% of babies are born on their exact due date. Most babies are born between 37-42 weeks. Your healthcare provider may adjust the date based on ultrasound measurements."
        },
        {
          question: "What if I have irregular periods?",
          answer: "If you have irregular cycles, the LMP method may be less accurate. In this case, your healthcare provider will use early ultrasound measurements (ideally 8-13 weeks) to more accurately determine your due date and conception date."
        },
        {
          question: "When does each trimester start and end?",
          answer: "First trimester: Weeks 1-13 (months 1-3). Second trimester: Weeks 14-27 (months 4-6). Third trimester: Weeks 28-40 (months 7-9). Some sources use slightly different week ranges, but these are the most commonly used divisions."
        },
        {
          question: "How is pregnancy dated if I know my conception date?",
          answer: "If you know your conception date, your due date is approximately 266 days (38 weeks) from conception. However, medical dating still typically uses LMP, which is about 2 weeks before conception for most women."
        }
      ]}
      howTo={[
        "Remember the first day of your last menstrual period (LMP)",
        "Select that date using the date picker",
        "Click 'Calculate Due Date' to see your pregnancy timeline",
        "Review your estimated due date (EDD)",
        "Check how many weeks and days pregnant you currently are",
        "See which trimester you're in (1st, 2nd, or 3rd)",
        "Note the days remaining until your due date",
        "Confirm this information with your healthcare provider and ultrasound"
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

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Due Date
        </button>

        {result && (
          <div className="result-box">
            <h3 className="text-xl font-semibold mb-4">Pregnancy Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-pink-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Estimated Due Date</div>
                <div className="text-xl font-bold text-pink-700">{result.dueDate}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Current Progress</div>
                <div className="text-xl font-bold text-purple-700">{result.weeksPregnant} weeks, {result.daysPregnant % 7} days</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Trimester</div>
                <div className="text-xl font-bold text-blue-700">{result.trimester}{result.trimester === 1 ? 'st' : result.trimester === 2 ? 'nd' : 'rd'} Trimester</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600 mb-1">Days Remaining</div>
                <div className="text-xl font-bold text-green-700">{result.daysRemaining} days</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Pregnancy Calculator</h3>
          <p>
            Calculate your estimated due date based on the first day of your last menstrual period (LMP). 
            The due date is estimated by adding 280 days (40 weeks) to the LMP date.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
