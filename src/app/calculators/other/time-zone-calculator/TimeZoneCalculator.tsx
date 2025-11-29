"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("time-zone-calculator")!;

const timeZones = [
  { name: "EST (UTC-5)", offset: -5 },
  { name: "CST (UTC-6)", offset: -6 },
  { name: "MST (UTC-7)", offset: -7 },
  { name: "PST (UTC-8)", offset: -8 },
  { name: "GMT/UTC (UTC+0)", offset: 0 },
  { name: "CET (UTC+1)", offset: 1 },
  { name: "EET (UTC+2)", offset: 2 },
  { name: "IST (UTC+5:30)", offset: 5.5 },
  { name: "CST China (UTC+8)", offset: 8 },
  { name: "JST (UTC+9)", offset: 9 },
  { name: "AEST (UTC+10)", offset: 10 },
  { name: "NZST (UTC+12)", offset: 12 },
];

export default function TimeZoneCalculator() {
  const [time, setTime] = useState("12:00");
  const [fromZone, setFromZone] = useState(timeZones[0]);
  const [toZone, setToZone] = useState(timeZones[4]);
  const [result, setResult] = useState<{
    convertedTime: string;
    timeDifference: number;
  } | null>(null);

  const calculate = () => {
    const [hours, minutes] = time.split(':').map(Number);

    // Convert to UTC
    const utcHours = hours - fromZone.offset;

    // Convert from UTC to target timezone
    let targetHours = utcHours + toZone.offset;
    const targetMinutes = minutes;

    // Handle day overflow
    while (targetHours < 0) targetHours += 24;
    while (targetHours >= 24) targetHours -= 24;

    const convertedTime = `${String(Math.floor(targetHours)).padStart(2, '0')}:${String(targetMinutes).padStart(2, '0')}`;
    const timeDifference = toZone.offset - fromZone.offset;

    setResult({
      convertedTime,
      timeDifference
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="calc-input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Time Zone
          </label>
          <select
            value={timeZones.indexOf(fromZone)}
            onChange={(e) => setFromZone(timeZones[parseInt(e.target.value)])}
            className="calc-input"
          >
            {timeZones.map((tz, index) => (
              <option key={index} value={index}>
                {tz.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Time Zone
          </label>
          <select
            value={timeZones.indexOf(toZone)}
            onChange={(e) => setToZone(timeZones[parseInt(e.target.value)])}
            className="calc-input"
          >
            {timeZones.map((tz, index) => (
              <option key={index} value={index}>
                {tz.name}
              </option>
            ))}
          </select>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Convert Time
        </button>

        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-2">Converted Time</div>
            <div className="text-5xl font-bold text-green-700 mb-4">
              {result.convertedTime}
            </div>
            <div className="text-gray-600">
              {toZone.name}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Time Difference: {result.timeDifference > 0 ? '+' : ''}{result.timeDifference} hours
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Time Zone Calculator</h3>
          <p>Convert time between different time zones around the world. Useful for scheduling international meetings and calls.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
