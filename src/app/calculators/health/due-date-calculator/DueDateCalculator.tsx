"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("due-date-calculator")!;

export default function DueDateCalculator() {
  const [method, setMethod] = useState<"lmp" | "conception">("lmp");
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{
    dueDate: string;
    weeksPregnant: number;
    daysPregnant: number;
    trimester: number;
    conceptionDate: string;
  } | null>(null);

  const calculate = () => {
    if (!date) return;

    const inputDate = new Date(date);
    let dueDate: Date;
    let conceptionDate: Date;

    if (method === "lmp") {
      dueDate = new Date(inputDate);
      dueDate.setDate(dueDate.getDate() + 280);
      conceptionDate = new Date(inputDate);
      conceptionDate.setDate(conceptionDate.getDate() + 14);
    } else {
      conceptionDate = inputDate;
      dueDate = new Date(inputDate);
      dueDate.setDate(dueDate.getDate() + 266);
    }

    const today = new Date();
    const lmpDate = method === "lmp" ? inputDate : new Date(inputDate.getTime() - 14 * 24 * 60 * 60 * 1000);
    const daysDiff = Math.floor((today.getTime() - lmpDate.getTime()) / (1000 * 60 * 60 * 24));
    const weeksDiff = Math.floor(daysDiff / 7);

    let trimester = 1;
    if (weeksDiff >= 27) trimester = 3;
    else if (weeksDiff >= 13) trimester = 2;

    setResult({
      dueDate: dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      weeksPregnant: weeksDiff,
      daysPregnant: daysDiff,
      trimester,
      conceptionDate: conceptionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="From LMP: Due Date = LMP + 280 days (40 weeks); From Conception: Due Date = Conception Date + 266 days (38 weeks); Gestational Age = (Today - LMP) / 7 weeks; Conception Date ≈ LMP + 14 days"
      faqs={[
        {
          question: "What's the difference between LMP and conception dating?",
          answer: "LMP (Last Menstrual Period) dating adds 280 days from the first day of your last period. Conception dating adds 266 days from the actual conception date. LMP is used medically because it's easier to remember, even though conception typically occurs about 2 weeks after LMP."
        },
        {
          question: "Which method is more accurate?",
          answer: "If you know your exact conception date (from IVF, IUI, or confirmed ovulation), that method is more accurate. For most pregnancies, LMP dating is standard. Early ultrasound (8-13 weeks) is the most accurate method and may adjust your due date."
        },
        {
          question: "What is considered full-term pregnancy?",
          answer: "Full-term is now categorized as: Early term (37-38 weeks), Full term (39-40 weeks), Late term (41 weeks), Post term (42+ weeks). The ideal delivery time is 39-40 weeks when the baby is fully developed and lowest risk of complications."
        },
        {
          question: "How do ultrasounds determine due dates?",
          answer: "Early ultrasounds (8-13 weeks) measure the crown-rump length (CRL) or biparietal diameter. These measurements are compared to standardized growth charts to estimate gestational age within ±5-7 days, making them more accurate than LMP dating alone."
        }
      ]}
      howTo={[
        "Choose your calculation method: Last Menstrual Period (LMP) or Conception Date",
        "If using LMP: select the first day of your last period",
        "If using conception date: select the date you conceived or ovulated",
        "Click 'Calculate Due Date' to see your results",
        "Review your estimated due date",
        "Check your current week of pregnancy",
        "See which trimester you're currently in",
        "Note your estimated conception date",
        "Review the trimester breakdown for pregnancy milestones"
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Method
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="lmp"
                checked={method === "lmp"}
                onChange={(e) => setMethod(e.target.value as "lmp")}
                className="mr-2"
              />
              Last Menstrual Period
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="conception"
                checked={method === "conception"}
                onChange={(e) => setMethod(e.target.value as "conception")}
                className="mr-2"
              />
              Conception Date
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {method === "lmp" ? "First Day of Last Period" : "Conception Date"}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="calc-input"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Due Date
        </button>

        {result && (
          <div className="result-box">
            <h3 className="text-xl font-semibold mb-4">Pregnancy Timeline</h3>
            <div className="space-y-4">
              <div className="bg-pink-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Estimated Due Date</div>
                <div className="text-2xl font-bold text-pink-700">{result.dueDate}</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Current Week</div>
                  <div className="text-xl font-bold text-purple-700">{result.weeksPregnant} weeks</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Trimester</div>
                  <div className="text-xl font-bold text-blue-700">{result.trimester}{result.trimester === 1 ? 'st' : result.trimester === 2 ? 'nd' : 'rd'}</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Conception Date</div>
                  <div className="text-sm font-semibold text-green-700">{result.conceptionDate}</div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                <strong>Trimester Breakdown:</strong>
                <ul className="mt-2 space-y-1 ml-4 list-disc">
                  <li>1st Trimester: Weeks 1-13</li>
                  <li>2nd Trimester: Weeks 14-27</li>
                  <li>3rd Trimester: Weeks 28-40</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Due Date Calculator</h3>
          <p>
            Calculate your due date and current trimester based on either your last menstrual period (LMP) 
            or conception date. Full-term pregnancy is approximately 40 weeks from LMP or 38 weeks from conception.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
