"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("day-of-week-calculator")!;

export default function DayOfWeekCalculator() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [result, setResult] = useState<{
    dayOfWeek: string;
    dayNumber: number;
    monthName: string;
    year: number;
  } | null>(null);

  const calculate = () => {
    const date = new Date(selectedDate);

    if (isNaN(date.getTime())) {
      alert("Please enter a valid date");
      return;
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const dayOfWeek = days[date.getDay()];
    const dayNumber = date.getDay();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    setResult({
      dayOfWeek,
      dayNumber,
      monthName,
      year
    });
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
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="calc-input"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Find Day of Week
        </button>

        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-2">Day of the Week</div>
            <div className="text-5xl font-bold text-green-700 mb-4">
              {result.dayOfWeek}
            </div>
            <div className="text-xl text-gray-700">
              {result.monthName} {selectedDate.split('-')[2]}, {result.year}
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Day of Week Calculator</h3>
          <p>Find out what day of the week any date falls on. Useful for planning events, checking historical dates, or finding future weekdays.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
