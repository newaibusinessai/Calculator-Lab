"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("marathon-pace-calculator")!;

export default function MarathonPaceCalculator() {
  const [mode, setMode] = useState<"time" | "pace">("time");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [paceMin, setPaceMin] = useState("");
  const [paceSec, setPaceSec] = useState("");
  const [unit, setUnit] = useState<"km" | "miles">("miles");
  const [result, setResult] = useState<{
    pace?: string;
    time?: string;
    splits?: { distance: string; time: string }[];
  } | null>(null);

  const calculate = () => {
    const marathonDistance = unit === "miles" ? 26.2 : 42.195;

    if (mode === "time") {
      const h = parseInt(hours) || 0;
      const m = parseInt(minutes) || 0;
      const s = parseInt(seconds) || 0;
      const totalMinutes = h * 60 + m + s / 60;

      const paceMinutes = totalMinutes / marathonDistance;
      const paceM = Math.floor(paceMinutes);
      const paceS = Math.round((paceMinutes - paceM) * 60);

      // Calculate splits
      const splits = [];
      if (unit === "miles") {
        for (let i = 5; i <= 25; i += 5) {
          const splitTime = paceMinutes * i;
          const splitH = Math.floor(splitTime / 60);
          const splitM = Math.floor(splitTime % 60);
          const splitS = Math.round(((splitTime % 60) - splitM) * 60);
          splits.push({
            distance: `${i} miles`,
            time: splitH > 0 ? `${splitH}:${String(splitM).padStart(2, '0')}:${String(splitS).padStart(2, '0')}` : `${splitM}:${String(splitS).padStart(2, '0')}`,
          });
        }
      } else {
        for (let i = 10; i <= 40; i += 10) {
          const splitTime = paceMinutes * i;
          const splitH = Math.floor(splitTime / 60);
          const splitM = Math.floor(splitTime % 60);
          const splitS = Math.round(((splitTime % 60) - splitM) * 60);
          splits.push({
            distance: `${i} km`,
            time: splitH > 0 ? `${splitH}:${String(splitM).padStart(2, '0')}:${String(splitS).padStart(2, '0')}` : `${splitM}:${String(splitS).padStart(2, '0')}`,
          });
        }
      }

      setResult({
        pace: `${paceM}:${String(paceS).padStart(2, '0')} /${unit === "miles" ? "mile" : "km"}`,
        splits,
      });
    } else {
      const pM = parseInt(paceMin) || 0;
      const pS = parseInt(paceSec) || 0;
      const paceMinutes = pM + pS / 60;
      const totalMinutes = paceMinutes * marathonDistance;

      const h = Math.floor(totalMinutes / 60);
      const m = Math.floor(totalMinutes % 60);
      const s = Math.round(((totalMinutes % 60) - m) * 60);

      // Calculate splits
      const splits = [];
      if (unit === "miles") {
        for (let i = 5; i <= 25; i += 5) {
          const splitTime = paceMinutes * i;
          const splitH = Math.floor(splitTime / 60);
          const splitM = Math.floor(splitTime % 60);
          const splitS = Math.round(((splitTime % 60) - splitM) * 60);
          splits.push({
            distance: `${i} miles`,
            time: splitH > 0 ? `${splitH}:${String(splitM).padStart(2, '0')}:${String(splitS).padStart(2, '0')}` : `${splitM}:${String(splitS).padStart(2, '0')}`,
          });
        }
      } else {
        for (let i = 10; i <= 40; i += 10) {
          const splitTime = paceMinutes * i;
          const splitH = Math.floor(splitTime / 60);
          const splitM = Math.floor(splitTime % 60);
          const splitS = Math.round(((splitTime % 60) - splitM) * 60);
          splits.push({
            distance: `${i} km`,
            time: splitH > 0 ? `${splitH}:${String(splitM).padStart(2, '0')}:${String(splitS).padStart(2, '0')}` : `${splitM}:${String(splitS).padStart(2, '0')}`,
          });
        }
      }

      setResult({
        time: `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`,
        splits,
      });
    }
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Pace = Total Time / Distance; Time = Pace × Distance; Marathon = 26.2 miles / 42.195 km"
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
                checked={mode === "time"}
                onChange={() => setMode("time")}
                className="mr-2"
              />
              Pace from finish time
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={mode === "pace"}
                onChange={() => setMode("pace")}
                className="mr-2"
              />
              Finish time from pace
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
                checked={unit === "miles"}
                onChange={() => setUnit("miles")}
                className="mr-2"
              />
              Miles (26.2)
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={unit === "km"}
                onChange={() => setUnit("km")}
                className="mr-2"
              />
              Kilometers (42.195)
            </label>
          </div>
        </div>

        {mode === "time" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Finish Time
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
              Target Pace (per {unit === "miles" ? "mile" : "km"})
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {result.pace && (
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Average Pace</div>
                  <div className="text-2xl font-bold text-blue-700">{result.pace}</div>
                </div>
              )}
              {result.time && (
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600 mb-1">Finish Time</div>
                  <div className="text-2xl font-bold text-green-700">{result.time}</div>
                </div>
              )}
            </div>

            {result.splits && result.splits.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-3">Split Times</h4>
                <div className="space-y-2">
                  {result.splits.map((split, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border-b border-gray-200 pb-2"
                    >
                      <span className="text-gray-700">{split.distance}</span>
                      <span className="font-medium text-gray-800">{split.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">
            About Marathon Pace Calculator
          </h3>
          <p>
            Plan your marathon race strategy by calculating your target pace or finish time.
            The split times help you track your progress throughout the race and maintain
            consistent pacing.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
