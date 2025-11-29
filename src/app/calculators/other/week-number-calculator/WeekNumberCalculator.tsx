"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("week-number-calculator")!;

export default function WeekNumberCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{
    weekNumber: number;
    year: number;
  } | null>(null);

  const getWeekNumber = (d: Date): { weekNumber: number; year: number } => {
    // Copy date so we don't modify original
    const target = new Date(d.valueOf());
    const dayNum = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNum + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
    }
    const weekNumber = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
    return { weekNumber, year: target.getFullYear() };
  };

  const calculate = () => {
    if (!date) {
      alert("Please select a date");
      return;
    }

    const selectedDate = new Date(date);
    const { weekNumber, year } = getWeekNumber(selectedDate);

    setResult({ weekNumber, year });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="calc-input"
          />
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Find Week Number
        </button>
        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">ISO Week Number</div>
            <div className="text-3xl font-bold text-green-700">
              Week {result.weekNumber}, {result.year}
            </div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Week Number Calculator</h3>
          <p>Calculates the ISO 8601 week number for any date. Week 1 is the first week with a Thursday in the new year.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
