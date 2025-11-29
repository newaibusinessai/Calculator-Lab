"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("countdown-calculator")!;

export default function CountdownCalculator() {
  const [targetDate, setTargetDate] = useState("");
  const [result, setResult] = useState<{
    days: number;
    hours: number;
    minutes: number;
    totalDays: number;
  } | null>(null);

  const calculate = () => {
    if (!targetDate) {
      alert("Please select a target date");
      return;
    }

    const target = new Date(targetDate);
    const now = new Date();

    // Calculate difference in milliseconds
    const diffMs = target.getTime() - now.getTime();

    if (diffMs < 0) {
      alert("Target date must be in the future");
      return;
    }

    // Convert to days, hours, minutes
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    setResult({
      days: totalDays,
      hours,
      minutes,
      totalDays
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Date
          </label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="calc-input"
          />
        </div>
        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Countdown
        </button>
        {result && (
          <div className="result-box">
            <div className="text-sm text-gray-600 mb-2 text-center">Time Until Target Date</div>
            <div className="text-3xl font-bold text-green-700 text-center mb-2">
              {result.days} Days
            </div>
            <div className="text-center text-gray-600">
              {result.hours} hours, {result.minutes} minutes
            </div>
          </div>
        )}
        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Countdown Calculator</h3>
          <p>Calculate the exact number of days, hours, and minutes until a future date. Perfect for tracking events, deadlines, or special occasions.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
