"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("calories-burned-calculator")!;

export default function CaloriesBurnedCalculator() {
  const [activity, setActivity] = useState("running");
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<number | null>(null);

  const metValues: Record<string, number> = {
    walking: 3.5,
    running: 9.8,
    cycling: 7.5,
    swimming: 8.0,
    hiking: 6.0,
    yoga: 2.5,
    weightlifting: 6.0,
    basketball: 6.5,
    soccer: 7.0,
    tennis: 7.3,
  };

  const calculate = () => {
    const w = parseFloat(weight);
    const d = parseFloat(duration);

    if (!w || !d) return;

    const weightKg = unit === "imperial" ? w * 0.453592 : w;
    const met = metValues[activity];
    const caloriesBurned = met * weightKg * (d / 60);

    setResult(Math.round(caloriesBurned));
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit System
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="metric"
                checked={unit === "metric"}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2"
              />
              Metric (kg)
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="imperial"
                checked={unit === "imperial"}
                onChange={(e) => setUnit(e.target.value)}
                className="mr-2"
              />
              Imperial (lbs)
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Activity
          </label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="calc-input"
          >
            <option value="walking">Walking (3.5 mph)</option>
            <option value="running">Running (6 mph)</option>
            <option value="cycling">Cycling (moderate)</option>
            <option value="swimming">Swimming (moderate)</option>
            <option value="hiking">Hiking</option>
            <option value="yoga">Yoga</option>
            <option value="weightlifting">Weight Lifting</option>
            <option value="basketball">Basketball</option>
            <option value="soccer">Soccer</option>
            <option value="tennis">Tennis</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="calc-input"
              placeholder={unit === "metric" ? "70" : "154"}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="calc-input"
              placeholder="30"
            />
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Calories Burned
        </button>

        {result !== null && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-2">Calories Burned</div>
            <div className="text-4xl font-bold text-orange-700">{result} cal</div>
            <div className="mt-4 text-sm text-gray-600">
              Based on MET (Metabolic Equivalent of Task) values
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Calories Burned Calculator</h3>
          <p>
            Estimate calories burned during various physical activities based on your weight, 
            activity type, and duration. Calculations use MET (Metabolic Equivalent of Task) values.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
