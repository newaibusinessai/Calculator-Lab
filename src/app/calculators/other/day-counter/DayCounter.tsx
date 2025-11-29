"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("day-counter")!;

export default function DayCounter() {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [result, setResult] = useState<{
    days: number;
    weeks: number;
    months: number;
    years: number;
  } | null>(null);

  const calculate = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      alert("Please enter valid dates");
      return;
    }

    // Calculate difference in milliseconds
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44); // Average month length
    const years = Math.floor(days / 365.25); // Account for leap years

    setResult({
      days,
      weeks,
      months,
      years
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="calc-input"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Count Days
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">Days Between</div>
              <div className="text-5xl font-bold text-green-700">
                {result.days}
              </div>
              <div className="text-lg text-gray-600 mt-1">days</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Weeks:</span>
                <span className="font-semibold text-gray-800">
                  {result.weeks}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Months:</span>
                <span className="font-semibold text-gray-800">
                  {result.months}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Years:</span>
                <span className="font-semibold text-gray-800">
                  {result.years}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Day Counter</h3>
          <p>Calculate the number of days between two dates. Useful for planning events, tracking milestones, or counting down to special occasions.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
