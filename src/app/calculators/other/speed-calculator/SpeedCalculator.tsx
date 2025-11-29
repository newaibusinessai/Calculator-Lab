"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("speed-calculator")!;

export default function SpeedCalculator() {
  const [mode, setMode] = useState<'speed' | 'distance' | 'time'>('speed');
  const [distance, setDistance] = useState("100");
  const [time, setTime] = useState("2");
  const [speed, setSpeed] = useState("50");
  const [result, setResult] = useState<{
    value: number;
    unit: string;
  } | null>(null);

  const calculate = () => {
    if (mode === 'speed') {
      const dist = parseFloat(distance);
      const t = parseFloat(time);

      if (isNaN(dist) || isNaN(t) || t <= 0) {
        alert("Please enter valid numbers");
        return;
      }

      const calculatedSpeed = dist / t;
      setResult({ value: calculatedSpeed, unit: 'mph' });
    } else if (mode === 'distance') {
      const s = parseFloat(speed);
      const t = parseFloat(time);

      if (isNaN(s) || isNaN(t)) {
        alert("Please enter valid numbers");
        return;
      }

      const calculatedDistance = s * t;
      setResult({ value: calculatedDistance, unit: 'miles' });
    } else {
      const dist = parseFloat(distance);
      const s = parseFloat(speed);

      if (isNaN(dist) || isNaN(s) || s <= 0) {
        alert("Please enter valid numbers");
        return;
      }

      const calculatedTime = dist / s;
      setResult({ value: calculatedTime, unit: 'hours' });
    }
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculate
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setMode('speed')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                mode === 'speed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Speed
            </button>
            <button
              onClick={() => setMode('distance')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                mode === 'distance'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Distance
            </button>
            <button
              onClick={() => setMode('time')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                mode === 'time'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Time
            </button>
          </div>
        </div>

        {mode === 'speed' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (miles)
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="calc-input"
                placeholder="100"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time (hours)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="calc-input"
                placeholder="2"
                step="0.1"
              />
            </div>
          </>
        )}

        {mode === 'distance' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speed (mph)
              </label>
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="calc-input"
                placeholder="50"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time (hours)
              </label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="calc-input"
                placeholder="2"
                step="0.1"
              />
            </div>
          </>
        )}

        {mode === 'time' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance (miles)
              </label>
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="calc-input"
                placeholder="100"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Speed (mph)
              </label>
              <input
                type="number"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
                className="calc-input"
                placeholder="50"
                step="0.1"
              />
            </div>
          </>
        )}

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>

        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-2">
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </div>
            <div className="text-4xl font-bold text-green-700">
              {result.value.toFixed(2)}
            </div>
            <div className="text-lg text-gray-600 mt-1">{result.unit}</div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Speed Calculator</h3>
          <p>Calculate speed, distance, or time using the formula: Speed = Distance / Time. Select what you want to calculate and enter the known values.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
