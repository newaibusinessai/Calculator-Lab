"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("one-rep-max-calculator")!;

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [unit, setUnit] = useState("kg");
  const [result, setResult] = useState<{
    epley: number;
    brzycki: number;
    lombardi: number;
    percentages: { percent: number; weight: number }[];
  } | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const r = parseFloat(reps);

    if (!w || !r || r < 1) return;

    const epley = w * (1 + r / 30);
    const brzycki = w * (36 / (37 - r));
    const lombardi = w * Math.pow(r, 0.1);

    const average = (epley + brzycki + lombardi) / 3;

    const percentages = [95, 90, 85, 80, 75, 70, 65, 60].map(percent => ({
      percent,
      weight: Math.round((average * percent / 100) * 10) / 10,
    }));

    setResult({
      epley: Math.round(epley * 10) / 10,
      brzycki: Math.round(brzycki * 10) / 10,
      lombardi: Math.round(lombardi * 10) / 10,
      percentages,
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight Unit
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="kg"
                checked={unit === "kg"}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2"
              />
              Kilograms (kg)
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="lbs"
                checked={unit === "lbs"}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2"
              />
              Pounds (lbs)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight Lifted ({unit})
            </label>
            <input
              type="number"
              step="0.5"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="calc-input"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Repetitions
            </label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              className="calc-input"
              placeholder="8"
            />
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate 1RM
        </button>

        {result && (
          <div className="result-box">
            <h3 className="text-xl font-semibold mb-4">One Rep Max Estimates</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Epley Formula</div>
                <div className="text-2xl font-bold text-blue-700">{result.epley} {unit}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Brzycki Formula</div>
                <div className="text-2xl font-bold text-green-700">{result.brzycki} {unit}</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Lombardi Formula</div>
                <div className="text-2xl font-bold text-purple-700">{result.lombardi} {unit}</div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Training Percentages</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {result.percentages.map(({ percent, weight }) => (
                  <div key={percent} className="bg-white p-2 rounded border">
                    <div className="font-semibold">{percent}%</div>
                    <div className="text-gray-600">{weight} {unit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About One Rep Max Calculator</h3>
          <p>
            Calculate your estimated one-repetition maximum (1RM) using the Epley, Brzycki, and 
            Lombardi formulas. The 1RM is the maximum weight you can lift for one repetition.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
