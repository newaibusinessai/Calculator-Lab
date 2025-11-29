"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("running-calorie-calculator")!;

export default function RunningCalorieCalculator() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [paceMin, setPaceMin] = useState("");
  const [paceSec, setPaceSec] = useState("");
  const [unit, setUnit] = useState<"km" | "miles">("miles");
  const [incline, setIncline] = useState("");
  const [result, setResult] = useState<{
    calories: number;
    distance: number;
    speed: number;
  } | null>(null);

  const calculate = () => {
    const weightNum = parseFloat(weight);
    const durationNum = parseFloat(duration);
    const pM = parseInt(paceMin) || 0;
    const pS = parseInt(paceSec) || 0;

    if (!weightNum || !durationNum || (!pM && !pS)) return;

    // Calculate speed from pace
    const paceMinutes = pM + pS / 60;
    const speed = 60 / paceMinutes; // speed in distance/hour

    // Calculate distance
    const durationHours = durationNum / 60;
    const distance = speed * durationHours;

    // MET value based on speed (mph for miles, km/h for km)
    let met = 6.0;
    const speedMph = unit === "miles" ? speed : speed * 0.621371;

    if (speedMph < 5) {
      met = 6.0;
    } else if (speedMph < 5.2) {
      met = 8.3;
    } else if (speedMph < 6) {
      met = 9.8;
    } else if (speedMph < 6.7) {
      met = 10.5;
    } else if (speedMph < 7) {
      met = 11.0;
    } else if (speedMph < 7.5) {
      met = 11.5;
    } else if (speedMph < 8) {
      met = 11.8;
    } else if (speedMph < 8.6) {
      met = 12.3;
    } else if (speedMph < 9) {
      met = 12.8;
    } else if (speedMph < 10) {
      met = 14.5;
    } else {
      met = 16.0;
    }

    // Adjust for incline
    const inclineNum = parseFloat(incline) || 0;
    if (inclineNum > 0) {
      met *= 1 + (inclineNum / 100) * 0.5;
    }

    // Calories = MET × weight (kg) × time (hours)
    const weightKg = weightNum / 2.205;
    const calories = met * weightKg * durationHours;

    setResult({
      calories: parseFloat(calories.toFixed(1)),
      distance: parseFloat(distance.toFixed(2)),
      speed: parseFloat(speed.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Speed = 60 / Pace; Distance = Speed × Time; Calories = MET × Weight (kg) × Duration (hours); MET varies by speed (6.0-16.0)"
    >
      <div className="space-y-6">
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
              Miles
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={unit === "km"}
                onChange={() => setUnit("km")}
                className="mr-2"
              />
              Kilometers
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (lbs)
          </label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="calc-input"
            placeholder="150"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            step="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="calc-input"
            placeholder="30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pace (per {unit})
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
          <p className="text-xs text-gray-500 mt-1">
            Example: 8:00 pace = 8 minutes, 0 seconds per {unit}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Incline (%) - Optional
          </label>
          <input
            type="number"
            step="0.1"
            value={incline}
            onChange={(e) => setIncline(e.target.value)}
            className="calc-input"
            placeholder="0"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leave at 0 for flat running
          </p>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>

        {result && (
          <div className="result-box">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Calories Burned</div>
                <div className="text-2xl font-bold text-orange-700">
                  {result.calories} cal
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Distance</div>
                <div className="text-2xl font-bold text-blue-700">
                  {result.distance} {unit}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Average Speed</div>
                <div className="text-2xl font-bold text-green-700">
                  {result.speed} {unit}/h
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">
            About Running Calorie Calculator
          </h3>
          <p>
            Calculate calories burned while running based on your weight, duration, pace, and
            incline. The calculator uses MET values that increase with running speed to provide
            accurate calorie estimates for your workout.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
