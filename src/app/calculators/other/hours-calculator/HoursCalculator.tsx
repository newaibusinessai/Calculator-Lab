"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("hours-calculator")!;

export default function HoursCalculator() {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [result, setResult] = useState<{
    hours: number;
    minutes: number;
    totalMinutes: number;
    decimal: number;
  } | null>(null);

  const calculate = () => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    let totalStartMinutes = startHour * 60 + startMin;
    let totalEndMinutes = endHour * 60 + endMin;

    // Handle overnight shift
    if (totalEndMinutes < totalStartMinutes) {
      totalEndMinutes += 24 * 60;
    }

    const diffMinutes = totalEndMinutes - totalStartMinutes;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    const decimal = diffMinutes / 60;

    setResult({
      hours,
      minutes,
      totalMinutes: diffMinutes,
      decimal
    });
  };

  const formula = "Hours = (End Time - Start Time), converted to hours, minutes, and decimal format";

  const faqs = [
    {
      question: "How do I calculate work hours?",
      answer: "Enter your start time and end time, then click 'Calculate Hours'. The calculator shows the time difference in hours and minutes, decimal hours, and total minutes. This is perfect for tracking work hours, shift durations, or event lengths."
    },
    {
      question: "What is decimal hours?",
      answer: "Decimal hours express time as a decimal number instead of hours and minutes. For example, 2 hours and 30 minutes equals 2.5 decimal hours. This format is often used for payroll and billing."
    },
    {
      question: "Can I calculate overnight shifts?",
      answer: "Yes! If your end time is earlier than your start time (e.g., 11:00 PM to 6:00 AM), the calculator automatically assumes the end time is on the next day and calculates the total hours correctly."
    },
    {
      question: "Why would I need total minutes?",
      answer: "Total minutes is useful for precise time tracking in systems that use minutes as the base unit, or for calculating rates that are charged per minute."
    }
  ];

  const howTo = [
    "Enter the start time using the time picker",
    "Enter the end time using the time picker",
    "Click 'Calculate Hours' to see the time difference",
    "View results in three formats: hours and minutes, decimal hours, and total minutes",
    "The calculator automatically handles overnight shifts when end time is before start time"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="calc-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="calc-input"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Hours
        </button>

        {result && (
          <div className="result-box">
            <div className="text-sm text-gray-600 mb-3">Time Difference</div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Hours and Minutes:</span>
                <span className="text-2xl font-bold text-green-700">
                  {result.hours}h {result.minutes}m
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Decimal Hours:</span>
                <span className="text-lg font-semibold text-gray-800">
                  {result.decimal.toFixed(2)} hours
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Total Minutes:</span>
                <span className="text-lg font-semibold text-gray-800">
                  {result.totalMinutes} minutes
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
