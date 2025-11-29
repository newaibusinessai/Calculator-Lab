"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("cycling-calorie-calculator")!;

export default function CyclingCalorieCalculator() {
  const [weight, setWeight] = useState("");
  const [duration, setDuration] = useState("");
  const [speed, setSpeed] = useState("");
  const [terrain, setTerrain] = useState<"flat" | "hilly">("flat");
  const [result, setResult] = useState<{
    calories: number;
    distance: number;
  } | null>(null);

  const calculate = () => {
    const weightNum = parseFloat(weight);
    const durationNum = parseFloat(duration);
    const speedNum = parseFloat(speed);

    if (!weightNum || !durationNum || !speedNum) return;

    // MET values for cycling at different speeds
    let met = 4.0; // Very light cycling
    if (speedNum < 10) {
      met = 4.0;
    } else if (speedNum < 12) {
      met = 6.8;
    } else if (speedNum < 14) {
      met = 8.0;
    } else if (speedNum < 16) {
      met = 10.0;
    } else if (speedNum < 20) {
      met = 12.0;
    } else {
      met = 15.8;
    }

    // Adjust for terrain
    if (terrain === "hilly") {
      met *= 1.2;
    }

    // Calories = MET × weight (kg) × time (hours)
    const weightKg = weightNum / 2.205;
    const durationHours = durationNum / 60;
    const calories = met * weightKg * durationHours;

    // Distance = speed × time
    const distance = speedNum * durationHours;

    setResult({
      calories: parseFloat(calories.toFixed(1)),
      distance: parseFloat(distance.toFixed(2)),
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Calories = MET × Weight (kg) × Duration (hours); MET varies by speed (4.0-15.8); 1 lb = 0.453592 kg"
    >
      <div className="space-y-6">
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
            placeholder="60"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Average Speed (mph)
          </label>
          <input
            type="number"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="calc-input"
            placeholder="15"
          />
          <p className="text-xs text-gray-500 mt-1">
            Leisure: 10-12 mph, Moderate: 12-14 mph, Vigorous: 14-16 mph, Racing: 16+ mph
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Terrain
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={terrain === "flat"}
                onChange={() => setTerrain("flat")}
                className="mr-2"
              />
              Flat
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={terrain === "hilly"}
                onChange={() => setTerrain("hilly")}
                className="mr-2"
              />
              Hilly
            </label>
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>

        {result && (
          <div className="result-box">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Calories Burned</div>
                <div className="text-2xl font-bold text-orange-700">
                  {result.calories} cal
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Distance Cycled</div>
                <div className="text-2xl font-bold text-blue-700">
                  {result.distance} miles
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">
            About Cycling Calorie Calculator
          </h3>
          <p>
            Calculate calories burned while cycling based on your weight, duration, average speed,
            and terrain. This calculator uses MET (Metabolic Equivalent of Task) values that
            increase with cycling speed and intensity.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
