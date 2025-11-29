"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("time-card-calculator")!;

interface TimeEntry {
  id: number;
  day: string;
  clockIn: string;
  clockOut: string;
  breakMinutes: string;
}

export default function TimeCardCalculator() {
  const [entries, setEntries] = useState<TimeEntry[]>([
    { id: 1, day: "Monday", clockIn: "09:00", clockOut: "17:00", breakMinutes: "30" }
  ]);
  const [hourlyRate, setHourlyRate] = useState("15.00");
  const [result, setResult] = useState<{
    totalHours: number;
    totalMinutes: number;
    totalPay: number;
    dailyHours: { day: string; hours: number }[];
  } | null>(null);

  const addEntry = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const usedDays = entries.map(e => e.day);
    const nextDay = days.find(d => !usedDays.includes(d)) || "Day";

    setEntries([
      ...entries,
      { id: Date.now(), day: nextDay, clockIn: "", clockOut: "", breakMinutes: "0" }
    ]);
  };

  const removeEntry = (id: number) => {
    setEntries(entries.filter(e => e.id !== id));
  };

  const updateEntry = (id: number, field: keyof TimeEntry, value: string) => {
    setEntries(entries.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const calculate = () => {
    const validEntries = entries.filter(e =>
      e.clockIn.trim() && e.clockOut.trim()
    );

    if (validEntries.length === 0) {
      alert("Please enter at least one time entry");
      return;
    }

    const dailyHours = validEntries.map(entry => {
      const [inHour, inMin] = entry.clockIn.split(':').map(Number);
      const [outHour, outMin] = entry.clockOut.split(':').map(Number);

      let totalMinutes = (outHour * 60 + outMin) - (inHour * 60 + inMin);

      // Handle overnight shift
      if (totalMinutes < 0) {
        totalMinutes += 24 * 60;
      }

      // Subtract break time
      const breakMins = parseInt(entry.breakMinutes) || 0;
      totalMinutes -= breakMins;

      const hours = totalMinutes / 60;

      return {
        day: entry.day,
        hours
      };
    });

    const totalMinutes = dailyHours.reduce((sum, d) => sum + (d.hours * 60), 0);
    const totalHours = totalMinutes / 60;
    const rate = parseFloat(hourlyRate) || 0;
    const totalPay = totalHours * rate;

    setResult({
      totalHours,
      totalMinutes,
      totalPay,
      dailyHours
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hourly Rate ($)
          </label>
          <input
            type="number"
            value={hourlyRate}
            onChange={(e) => setHourlyRate(e.target.value)}
            className="calc-input"
            placeholder="15.00"
            step="0.01"
          />
        </div>

        <div className="space-y-3">
          {entries.map((entry) => (
            <div key={entry.id} className="p-4 bg-gray-50 rounded-lg space-y-2">
              <div className="flex justify-between items-center mb-2">
                <input
                  type="text"
                  placeholder="Day"
                  value={entry.day}
                  onChange={(e) => updateEntry(entry.id, 'day', e.target.value)}
                  className="font-medium text-gray-700 bg-transparent border-none focus:outline-none"
                />
                {entries.length > 1 && (
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Clock In</label>
                  <input
                    type="time"
                    value={entry.clockIn}
                    onChange={(e) => updateEntry(entry.id, 'clockIn', e.target.value)}
                    className="calc-input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Clock Out</label>
                  <input
                    type="time"
                    value={entry.clockOut}
                    onChange={(e) => updateEntry(entry.id, 'clockOut', e.target.value)}
                    className="calc-input"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Break (min)</label>
                  <input
                    type="number"
                    value={entry.breakMinutes}
                    onChange={(e) => updateEntry(entry.id, 'breakMinutes', e.target.value)}
                    className="calc-input"
                    min="0"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addEntry}
          className="calc-btn w-full border-2 border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
        >
          + Add Day
        </button>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Hours
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">Total Hours Worked</div>
              <div className="text-4xl font-bold text-green-700">
                {result.totalHours.toFixed(2)}
              </div>
              <div className="text-lg text-gray-600 mt-1">hours</div>
            </div>
            <div className="space-y-2 mb-3">
              {result.dailyHours.map((day, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{day.day}:</span>
                  <span className="font-semibold text-gray-800">
                    {day.hours.toFixed(2)} hrs
                  </span>
                </div>
              ))}
            </div>
            {parseFloat(hourlyRate) > 0 && (
              <div className="pt-3 border-t border-gray-200 text-center">
                <div className="text-sm text-gray-600 mb-1">Total Pay</div>
                <div className="text-2xl font-bold text-green-700">
                  ${result.totalPay.toFixed(2)}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Time Card Calculator</h3>
          <p>Calculate work hours from clock in/out times. Add break times and hourly rate to calculate total pay.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
