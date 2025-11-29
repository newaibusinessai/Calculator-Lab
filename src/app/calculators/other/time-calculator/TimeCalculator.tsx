"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("time-calculator")!;

export default function TimeCalculator() {
  const [mode, setMode] = useState<"add" | "diff" | "convert">("add");

  // Add/Subtract mode
  const [hours1, setHours1] = useState("0");
  const [minutes1, setMinutes1] = useState("0");
  const [seconds1, setSeconds1] = useState("0");
  const [operation, setOperation] = useState<"+" | "-">("+");
  const [hours2, setHours2] = useState("0");
  const [minutes2, setMinutes2] = useState("0");
  const [seconds2, setSeconds2] = useState("0");

  // Difference mode
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // Convert mode
  const [convertValue, setConvertValue] = useState("");
  const [convertFrom, setConvertFrom] = useState("hours");

  const [addResult, setAddResult] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
  } | null>(null);

  const [diffResult, setDiffResult] = useState<{
    hours: number;
    minutes: number;
    seconds: number;
    totalMinutes: number;
  } | null>(null);

  const [convertResult, setConvertResult] = useState<{
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
  } | null>(null);

  const calculateAdd = () => {
    const total1 =
      parseInt(hours1) * 3600 + parseInt(minutes1) * 60 + parseInt(seconds1);
    const total2 =
      parseInt(hours2) * 3600 + parseInt(minutes2) * 60 + parseInt(seconds2);

    const totalSeconds = operation === "+" ? total1 + total2 : Math.abs(total1 - total2);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    setAddResult({ hours, minutes, seconds, totalSeconds });
  };

  const calculateDiff = () => {
    if (!startTime || !endTime) return;

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    let startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;

    // Handle crossing midnight
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }

    const totalMinutes = endMinutes - startMinutes;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    setDiffResult({ hours, minutes, seconds: 0, totalMinutes });
  };

  const calculateConvert = () => {
    const value = parseFloat(convertValue);
    if (isNaN(value)) return;

    let totalSeconds: number;

    switch (convertFrom) {
      case "seconds":
        totalSeconds = value;
        break;
      case "minutes":
        totalSeconds = value * 60;
        break;
      case "hours":
        totalSeconds = value * 3600;
        break;
      case "days":
        totalSeconds = value * 86400;
        break;
      default:
        return;
    }

    setConvertResult({
      seconds: totalSeconds,
      minutes: totalSeconds / 60,
      hours: totalSeconds / 3600,
      days: totalSeconds / 86400,
    });
  };

  const formatTime = (h: number, m: number, s: number) => {
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const formula = "Add/Subtract: Time1 ± Time2 | Difference: End Time - Start Time | Convert: Value × Conversion Factor";

  const faqs = [
    {
      question: "How do I add or subtract time?",
      answer: "In Add/Subtract mode, enter two time values (hours, minutes, seconds), choose + or -, and click Calculate. This is useful for adding multiple time periods together or finding the difference between durations."
    },
    {
      question: "What is the Time Difference mode for?",
      answer: "Time Difference mode calculates the duration between two clock times (e.g., 9:00 AM to 5:30 PM). It automatically handles times that cross midnight, making it perfect for calculating work hours or event durations."
    },
    {
      question: "How does the time converter work?",
      answer: "The Convert mode lets you convert a time value from one unit to another. Enter a value, select the unit (seconds, minutes, hours, or days), and see the equivalent in all other units instantly."
    },
    {
      question: "Can the calculator handle overnight shifts?",
      answer: "Yes! In Time Difference mode, if the end time is earlier than the start time, the calculator automatically assumes the end time is on the next day (e.g., 10:00 PM to 6:00 AM = 8 hours)."
    }
  ];

  const howTo = [
    "Choose a mode: Add/Subtract for time arithmetic, Time Difference for duration between clock times, or Convert for unit conversion",
    "For Add/Subtract: Enter hours, minutes, and seconds for both times, select + or -, then calculate",
    "For Time Difference: Enter start and end times (calculator handles overnight shifts automatically)",
    "For Convert: Enter a value and select the unit to convert from",
    "Results show in multiple formats for easy reference"
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
            onClick={() => setMode("add")}
            className={`calc-btn flex-1 text-sm ${
              mode === "add" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Add/Subtract
          </button>
          <button
            onClick={() => setMode("diff")}
            className={`calc-btn flex-1 text-sm ${
              mode === "diff" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Time Difference
          </button>
          <button
            onClick={() => setMode("convert")}
            className={`calc-btn flex-1 text-sm ${
              mode === "convert" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Convert
          </button>
        </div>

        {mode === "add" && (
          <>
            {/* Time 1 */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time 1
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <input
                    type="number"
                    value={hours1}
                    onChange={(e) => setHours1(e.target.value)}
                    className="calc-input text-center"
                    min="0"
                  />
                  <div className="text-xs text-center text-gray-500 mt-1">
                    Hours
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    value={minutes1}
                    onChange={(e) => setMinutes1(e.target.value)}
                    className="calc-input text-center"
                    min="0"
                    max="59"
                  />
                  <div className="text-xs text-center text-gray-500 mt-1">
                    Minutes
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    value={seconds1}
                    onChange={(e) => setSeconds1(e.target.value)}
                    className="calc-input text-center"
                    min="0"
                    max="59"
                  />
                  <div className="text-xs text-center text-gray-500 mt-1">
                    Seconds
                  </div>
                </div>
              </div>
            </div>

            {/* Operation */}
            <div className="flex justify-center gap-2 mb-4">
              <button
                onClick={() => setOperation("+")}
                className={`calc-btn px-6 ${
                  operation === "+" ? "bg-green-100 border-green-400" : ""
                }`}
              >
                + Add
              </button>
              <button
                onClick={() => setOperation("-")}
                className={`calc-btn px-6 ${
                  operation === "-" ? "bg-red-100 border-red-400" : ""
                }`}
              >
                - Subtract
              </button>
            </div>

            {/* Time 2 */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time 2
              </label>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <input
                    type="number"
                    value={hours2}
                    onChange={(e) => setHours2(e.target.value)}
                    className="calc-input text-center"
                    min="0"
                  />
                  <div className="text-xs text-center text-gray-500 mt-1">
                    Hours
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    value={minutes2}
                    onChange={(e) => setMinutes2(e.target.value)}
                    className="calc-input text-center"
                    min="0"
                    max="59"
                  />
                  <div className="text-xs text-center text-gray-500 mt-1">
                    Minutes
                  </div>
                </div>
                <div>
                  <input
                    type="number"
                    value={seconds2}
                    onChange={(e) => setSeconds2(e.target.value)}
                    className="calc-input text-center"
                    min="0"
                    max="59"
                  />
                  <div className="text-xs text-center text-gray-500 mt-1">
                    Seconds
                  </div>
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
                <div className="text-sm text-gray-600 mb-2">Result</div>
                <div className="text-3xl font-bold text-green-700 font-mono">
                  {formatTime(addResult.hours, addResult.minutes, addResult.seconds)}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Total: {addResult.totalSeconds.toLocaleString()} seconds
                </div>
              </div>
            )}
          </>
        )}

        {mode === "diff" && (
          <>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="calc-input"
                />
              </div>
            </div>

            <button
              onClick={calculateDiff}
              className="calc-btn calc-btn-primary w-full mb-6"
            >
              Calculate Difference
            </button>

            {diffResult && (
              <div className="result-box text-center">
                <div className="text-sm text-gray-600 mb-2">Time Difference</div>
                <div className="flex justify-center gap-4">
                  <div>
                    <div className="text-3xl font-bold text-green-700">
                      {diffResult.hours}
                    </div>
                    <div className="text-sm text-gray-500">Hours</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-700">
                      {diffResult.minutes}
                    </div>
                    <div className="text-sm text-gray-500">Minutes</div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Total: {diffResult.totalMinutes} minutes
                </div>
              </div>
            )}
          </>
        )}

        {mode === "convert" && (
          <>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Value
                </label>
                <input
                  type="number"
                  value={convertValue}
                  onChange={(e) => setConvertValue(e.target.value)}
                  className="calc-input"
                  placeholder="Enter value"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Convert From
                </label>
                <select
                  value={convertFrom}
                  onChange={(e) => setConvertFrom(e.target.value)}
                  className="calc-input"
                >
                  <option value="seconds">Seconds</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateConvert}
              className="calc-btn calc-btn-primary w-full mb-6"
            >
              Convert
            </button>

            {convertResult && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-700 mb-3">Results</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Seconds:</span>
                    <span className="font-semibold">
                      {convertResult.seconds.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Minutes:</span>
                    <span className="font-semibold">
                      {convertResult.minutes.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-gray-600">Hours:</span>
                    <span className="font-semibold">
                      {convertResult.hours.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Days:</span>
                    <span className="font-semibold">
                      {convertResult.days.toLocaleString(undefined, {
                        maximumFractionDigits: 6,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </CalculatorLayout>
  );
}
