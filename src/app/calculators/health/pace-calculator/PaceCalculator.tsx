"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("pace-calculator")!;

export default function PaceCalculator() {
  const [mode, setMode] = useState<"pace" | "time">("pace");
  const [distance, setDistance] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [paceMin, setPaceMin] = useState("");
  const [paceSec, setPaceSec] = useState("");
  const [unit, setUnit] = useState<"km" | "miles">("km");
  const [result, setResult] = useState<{
    pace?: string;
    time?: string;
    speed?: number;
  } | null>(null);

  const calculate = () => {
    const dist = parseFloat(distance);
    if (!dist) return;

    if (mode === "pace") {
      const h = parseInt(hours) || 0;
      const m = parseInt(minutes) || 0;
      const s = parseInt(seconds) || 0;
      const totalMinutes = h * 60 + m + s / 60;

      const paceMinutes = totalMinutes / dist;
      const paceM = Math.floor(paceMinutes);
      const paceS = Math.round((paceMinutes - paceM) * 60);
      const speed = (dist / totalMinutes) * 60;

      setResult({
        pace: paceM + ":" + String(paceS).padStart(2, '0') + " /" + unit,
        speed: parseFloat(speed.toFixed(2)),
      });
    } else {
      const pM = parseInt(paceMin) || 0;
      const pS = parseInt(paceSec) || 0;
      const paceMinutes = pM + pS / 60;
      const totalMinutes = paceMinutes * dist;

      const h = Math.floor(totalMinutes / 60);
      const m = Math.floor(totalMinutes % 60);
      const s = Math.round(((totalMinutes % 60) - m) * 60);
      const speed = (dist / totalMinutes) * 60;

      setResult({
        time: h > 0 ? h + "h " + m + "m " + s + "s" : m + "m " + s + "s",
        speed: parseFloat(speed.toFixed(2)),
      });
    }
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Pace (min/distance) = Total Time (minutes) / Distance; Speed = Distance / Time; Time = Pace × Distance; 1 mile = 1.60934 km"
      faqs={[
        {
          question: "What is a good running pace?",
          answer: "A good pace depends on fitness level and distance. For casual joggers: 10-12 min/mile (6-7.5 min/km). For intermediate runners: 8-10 min/mile (5-6 min/km). For advanced runners: 6-8 min/mile (3.7-5 min/km). Elite marathoners run at ~4:40-5:30 min/mile pace."
        },
        {
          question: "How do I improve my pace?",
          answer: "Improve pace through: interval training (alternating fast and slow periods), tempo runs (sustained faster pace), hill training, strength training, consistent mileage buildup, proper rest and recovery, and good running form. Aim to improve gradually by 10-15 seconds per mile every few weeks."
        },
        {
          question: "Should my pace be the same for all distances?",
          answer: "No, pace varies by distance. You'll run faster per mile/km for shorter distances (5K) versus longer ones (marathon). A typical 5K pace might be 30-60 seconds per mile faster than your 10K pace, and 60-90 seconds faster than your half marathon pace."
        },
        {
          question: "What's the difference between pace and speed?",
          answer: "Pace is time per unit distance (e.g., 8 min/mile or 5 min/km) - commonly used in running. Speed is distance per unit time (e.g., 7.5 mph or 12 km/h) - commonly used for biking and other activities. They're inverse measures of the same thing."
        }
      ]}
      howTo={[
        "Choose what you want to calculate: pace from time/distance, or time from pace/distance",
        "Select your distance unit (kilometers or miles)",
        "Enter your distance (e.g., 5 for a 5K, 26.2 for a marathon)",
        "If calculating pace: enter your time in hours, minutes, and seconds",
        "If calculating time: enter your target pace in minutes and seconds per km/mile",
        "Click 'Calculate' to see results",
        "Review your pace (min per distance) and average speed",
        "Use this information to plan training runs or race strategies"
      ]}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={mode === "pace"}
                onChange={() => setMode("pace")}
                className="mr-2"
              />
              Pace from distance and time
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={mode === "time"}
                onChange={() => setMode("time")}
                className="mr-2"
              />
              Time from distance and pace
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance Unit
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="km"
                checked={unit === "km"}
                onChange={(e) => setUnit(e.target.value as "km")}
                className="mr-2"
              />
              Kilometers
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="miles"
                checked={unit === "miles"}
                onChange={(e) => setUnit(e.target.value as "miles")}
                className="mr-2"
              />
              Miles
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance ({unit})
          </label>
          <input
            type="number"
            step="0.01"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="calc-input"
            placeholder="5"
          />
        </div>

        {mode === "pace" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="calc-input"
                placeholder="Hours"
              />
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="calc-input"
                placeholder="Minutes"
              />
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                className="calc-input"
                placeholder="Seconds"
              />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pace (min/{unit})
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={paceMin}
                onChange={(e) => setPaceMin(e.target.value)}
                className="calc-input"
                placeholder="Minutes"
              />
              <input
                type="number"
                value={paceSec}
                onChange={(e) => setPaceSec(e.target.value)}
                className="calc-input"
                placeholder="Seconds"
              />
            </div>
          </div>
        )}

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>

        {result && (
          <div className="result-box">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.pace && (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Pace</div>
                  <div className="text-2xl font-bold text-blue-700">{result.pace}</div>
                </div>
              )}
              {result.time && (
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Time</div>
                  <div className="text-2xl font-bold text-green-700">{result.time}</div>
                </div>
              )}
              {result.speed && (
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Average Speed</div>
                  <div className="text-2xl font-bold text-purple-700">{result.speed} {unit}/h</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Pace Calculator</h3>
          <p>
            Calculate your running or walking pace from distance and time, or calculate the time 
            needed to cover a distance at a specific pace. Useful for planning training runs and races.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
