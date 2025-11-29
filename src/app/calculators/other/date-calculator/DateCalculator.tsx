"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("date-calculator")!;

export default function DateCalculator() {
  const [mode, setMode] = useState<"diff" | "add">("diff");

  // Difference mode
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Add/Subtract mode
  const [baseDate, setBaseDate] = useState(new Date().toISOString().split("T")[0]);
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [years, setYears] = useState("0");
  const [months, setMonths] = useState("0");
  const [weeks, setWeeks] = useState("0");
  const [days, setDays] = useState("0");

  const [diffResult, setDiffResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    totalBusinessDays: number;
  } | null>(null);

  const [addResult, setAddResult] = useState<{
    resultDate: string;
    formattedDate: string;
    dayOfWeek: string;
  } | null>(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    const earlier = start < end ? start : end;
    const later = start < end ? end : start;

    // Calculate years, months, days
    let yrs = later.getFullYear() - earlier.getFullYear();
    let mos = later.getMonth() - earlier.getMonth();
    let dys = later.getDate() - earlier.getDate();

    if (dys < 0) {
      mos--;
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      dys += prevMonth.getDate();
    }

    if (mos < 0) {
      yrs--;
      mos += 12;
    }

    // Total days
    const diffTime = Math.abs(later.getTime() - earlier.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // Business days (excluding weekends)
    let businessDays = 0;
    const current = new Date(earlier);
    while (current < later) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
      current.setDate(current.getDate() + 1);
    }

    setDiffResult({
      years: yrs,
      months: mos,
      days: dys,
      totalDays,
      totalWeeks,
      totalBusinessDays: businessDays,
    });
  };

  const calculateAdd = () => {
    if (!baseDate) return;

    const date = new Date(baseDate);
    const multiplier = operation === "add" ? 1 : -1;

    const yrs = parseInt(years) || 0;
    const mos = parseInt(months) || 0;
    const wks = parseInt(weeks) || 0;
    const dys = parseInt(days) || 0;

    // Add years and months first
    date.setFullYear(date.getFullYear() + yrs * multiplier);
    date.setMonth(date.getMonth() + mos * multiplier);

    // Add weeks and days
    const totalDays = wks * 7 + dys;
    date.setDate(date.getDate() + totalDays * multiplier);

    setAddResult({
      resultDate: date.toISOString().split("T")[0],
      formattedDate: date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      dayOfWeek: date.toLocaleDateString("en-US", { weekday: "long" }),
    });
  };

  const formula = "Date Difference: End Date - Start Date | Add/Subtract: Base Date ± (Years + Months + Weeks + Days)";

  const faqs = [
    {
      question: "How do I calculate the difference between two dates?",
      answer: "Select the 'Date Difference' mode, enter your start and end dates, and click 'Calculate Difference'. The calculator will show the time between dates in years, months, days, weeks, and business days."
    },
    {
      question: "What are business days?",
      answer: "Business days exclude weekends (Saturday and Sunday). This is useful for calculating working days between dates for project planning, billing, or employee time tracking."
    },
    {
      question: "How do I add or subtract time from a date?",
      answer: "Switch to 'Add/Subtract' mode, select your base date, choose whether to add or subtract, enter the amount of time (years, months, weeks, days), and calculate. This is useful for finding future deadlines or past dates."
    },
    {
      question: "Can I add different time units together?",
      answer: "Yes! You can combine years, months, weeks, and days in a single calculation. For example, add 1 year, 3 months, 2 weeks, and 5 days all at once."
    }
  ];

  const howTo = [
    "Choose between 'Date Difference' mode to calculate time between dates, or 'Add/Subtract' mode to calculate a new date",
    "For Date Difference: Enter start and end dates, then click 'Calculate Difference'",
    "For Add/Subtract: Enter a base date, choose add or subtract, enter time values, then click 'Calculate'",
    "View results showing the calculated difference or new date",
    "Business days calculation automatically excludes weekends"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="max-w-lg mx-auto">
        {/* Mode toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode("diff")}
            className={`calc-btn flex-1 ${
              mode === "diff" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Date Difference
          </button>
          <button
            onClick={() => setMode("add")}
            className={`calc-btn flex-1 ${
              mode === "add" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Add/Subtract
          </button>
        </div>

        {mode === "diff" ? (
          <>
            {/* Difference calculator */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="calc-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="calc-input"
                />
              </div>
            </div>

            <button
              onClick={calculateDifference}
              className="calc-btn calc-btn-primary w-full mb-6"
            >
              Calculate Difference
            </button>

            {diffResult && (
              <>
                <div className="result-box text-center mb-6">
                  <div className="text-sm text-gray-600 mb-2">
                    Time Between Dates
                  </div>
                  <div className="flex justify-center gap-4">
                    <div>
                      <div className="text-3xl font-bold text-green-700">
                        {diffResult.years}
                      </div>
                      <div className="text-sm text-gray-500">Years</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-700">
                        {diffResult.months}
                      </div>
                      <div className="text-sm text-gray-500">Months</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-700">
                        {diffResult.days}
                      </div>
                      <div className="text-sm text-gray-500">Days</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-700 mb-3">
                    Alternative Representations
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Days:</span>
                      <span className="font-semibold">
                        {diffResult.totalDays.toLocaleString()} days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Weeks:</span>
                      <span className="font-semibold">
                        {diffResult.totalWeeks.toLocaleString()} weeks
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Business Days:</span>
                      <span className="font-semibold">
                        {diffResult.totalBusinessDays.toLocaleString()} days
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {/* Add/Subtract calculator */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  className="calc-input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Operation
                </label>
                <select
                  value={operation}
                  onChange={(e) =>
                    setOperation(e.target.value as "add" | "subtract")
                  }
                  className="calc-input"
                >
                  <option value="add">Add (+)</option>
                  <option value="subtract">Subtract (-)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years
                  </label>
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="calc-input"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Months
                  </label>
                  <input
                    type="number"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    className="calc-input"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weeks
                  </label>
                  <input
                    type="number"
                    value={weeks}
                    onChange={(e) => setWeeks(e.target.value)}
                    className="calc-input"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Days
                  </label>
                  <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="calc-input"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={calculateAdd}
              className="calc-btn calc-btn-primary w-full mb-6"
            >
              Calculate
            </button>

            {addResult && (
              <div className="result-box text-center">
                <div className="text-sm text-gray-600 mb-2">Result Date</div>
                <div className="text-2xl font-bold text-green-700">
                  {addResult.formattedDate}
                </div>
                <div className="text-gray-500">{addResult.dayOfWeek}</div>
              </div>
            )}
          </>
        )}
      </div>
    </CalculatorLayout>
  );
}
