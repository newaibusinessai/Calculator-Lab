"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("sleep-calculator")!;

export default function SleepCalculator() {
  const [mode, setMode] = useState<"wakeup" | "bedtime">("wakeup");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<string[]>([]);

  const calculate = () => {
    if (!time) return;

    const [hours, minutes] = time.split(":").map(Number);
    const baseTime = new Date();
    baseTime.setHours(hours, minutes, 0, 0);

    const cycleDuration = 90;
    const fallAsleepTime = 15;
    const times: string[] = [];

    if (mode === "wakeup") {
      for (let cycles = 6; cycles >= 4; cycles--) {
        const sleepMinutes = cycles * cycleDuration + fallAsleepTime;
        const bedtime = new Date(baseTime.getTime() - sleepMinutes * 60000);
        times.push(bedtime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) + " (" + cycles + " cycles)");
      }
    } else {
      for (let cycles = 4; cycles <= 6; cycles++) {
        const sleepMinutes = cycles * cycleDuration - fallAsleepTime;
        const wakeTime = new Date(baseTime.getTime() + sleepMinutes * 60000);
        times.push(wakeTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) + " (" + cycles + " cycles)");
      }
    }

    setResult(times);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">I want to calculate</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" checked={mode === "wakeup"} onChange={() => setMode("wakeup")} className="mr-2" />
              When to go to bed
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" checked={mode === "bedtime"} onChange={() => setMode("bedtime")} className="mr-2" />
              When to wake up
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === "wakeup" ? "What time do you want to wake up?" : "What time do you plan to go to bed?"}
          </label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="calc-input" />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">Calculate Sleep Times</button>

        {result.length > 0 && (
          <div className="result-box">
            <h3 className="text-lg font-semibold mb-4">
              {mode === "wakeup" ? "Recommended Bedtimes" : "Recommended Wake Times"}
            </h3>
            <div className="space-y-3">
              {result.map((t, i) => (
                <div key={i} className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-blue-700">{t}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded">
              <p>Times include 15 minutes to fall asleep. Each sleep cycle is 90 minutes. Waking at the end of a cycle helps you feel refreshed.</p>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Sleep Calculator</h3>
          <p>
            Calculate optimal sleep and wake times based on 90-minute sleep cycles. Waking up at the end of a sleep cycle (rather than in the middle) can help you feel more rested and alert.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}