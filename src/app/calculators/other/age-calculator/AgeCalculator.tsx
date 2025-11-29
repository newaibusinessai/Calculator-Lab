"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("age-calculator")!;

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalMonths: number;
    totalHours: number;
    totalMinutes: number;
    nextBirthday: {
      date: string;
      daysUntil: number;
    };
  } | null>(null);

  const calculate = () => {
    if (!birthDate || !toDate) return;

    const birth = new Date(birthDate);
    const target = new Date(toDate);

    if (birth > target) {
      alert("Birth date cannot be after the target date");
      return;
    }

    // Calculate years, months, days
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Total calculations
    const diffTime = Math.abs(target.getTime() - birth.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next birthday calculation
    const thisYearBirthday = new Date(
      target.getFullYear(),
      birth.getMonth(),
      birth.getDate()
    );
    let nextBirthday = thisYearBirthday;

    if (thisYearBirthday <= target) {
      nextBirthday = new Date(
        target.getFullYear() + 1,
        birth.getMonth(),
        birth.getDate()
      );
    }

    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24)
    );

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      nextBirthday: {
        date: nextBirthday.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        daysUntil: daysUntilBirthday,
      },
    });
  };

  const formula = "Age = Target Date - Birth Date (calculated in years, months, and days)";

  const faqs = [
    {
      question: "How is age calculated?",
      answer: "Age is calculated by finding the difference between your birth date and the target date (usually today). The calculator shows your age in years, months, and days, as well as total days, weeks, months, hours, and minutes lived."
    },
    {
      question: "What is the next birthday countdown?",
      answer: "The calculator shows when your next birthday will occur and how many days remain until that date. This helps you plan birthday celebrations in advance."
    },
    {
      question: "Can I calculate age at a past or future date?",
      answer: "Yes! Simply change the 'Age at Date' field to any date in the past or future. This is useful for calculating how old you were on a specific date or will be in the future."
    },
    {
      question: "Why does my age show differently in different units?",
      answer: "Your age is the same, but expressed differently. For example, 25 years equals approximately 300 months, 9,125 days, or 219,000 hours. Different units provide different perspectives on time lived."
    }
  ];

  const howTo = [
    "Enter your date of birth in the first field",
    "The second field defaults to today's date, but you can change it to calculate age at any specific date",
    "Click 'Calculate Age' to see your exact age",
    "View your age in years, months, and days, plus alternative time units",
    "Check when your next birthday is and how many days away it is"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="max-w-lg mx-auto">
        {/* Input form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="calc-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age at Date (defaults to today)
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="calc-input"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="calc-btn calc-btn-primary w-full mb-6"
        >
          Calculate Age
        </button>

        {/* Results */}
        {result && (
          <>
            {/* Main result */}
            <div className="result-box text-center mb-6">
              <div className="text-sm text-gray-600 mb-2">Your Age</div>
              <div className="flex justify-center gap-4">
                <div>
                  <div className="text-4xl font-bold text-green-700">
                    {result.years}
                  </div>
                  <div className="text-sm text-gray-500">Years</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-700">
                    {result.months}
                  </div>
                  <div className="text-sm text-gray-500">Months</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-700">
                    {result.days}
                  </div>
                  <div className="text-sm text-gray-500">Days</div>
                </div>
              </div>
            </div>

            {/* Detailed breakdown */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Age in Different Units
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Total Months:</span>
                  <span className="font-semibold">
                    {result.totalMonths.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Total Weeks:</span>
                  <span className="font-semibold">
                    {result.totalWeeks.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Total Days:</span>
                  <span className="font-semibold">
                    {result.totalDays.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Total Hours:</span>
                  <span className="font-semibold">
                    {result.totalHours.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between col-span-2">
                  <span className="text-gray-600">Total Minutes:</span>
                  <span className="font-semibold">
                    {result.totalMinutes.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Next birthday */}
            <div className="border border-blue-200 bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-sm text-gray-600 mb-1">Next Birthday</div>
              <div className="font-semibold text-blue-700">
                {result.nextBirthday.date}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {result.nextBirthday.daysUntil === 0
                  ? "Happy Birthday! 🎂"
                  : `${result.nextBirthday.daysUntil} days away`}
              </div>
            </div>
          </>
        )}
      </div>
    </CalculatorLayout>
  );
}
