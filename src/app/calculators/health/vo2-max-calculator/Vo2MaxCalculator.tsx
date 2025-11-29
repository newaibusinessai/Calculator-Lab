"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("vo2-max-calculator")!;

export default function Vo2MaxCalculator() {
  const [method, setMethod] = useState<"cooper" | "rockport">("cooper");
  const [distance, setDistance] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [time, setTime] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [result, setResult] = useState<{
    vo2max?: number;
    fitnessLevel?: string;
  } | null>(null);

  const getFitnessLevel = (vo2: number, age: number, gender: string) => {
    if (gender === "male") {
      if (age < 30) {
        if (vo2 >= 55) return "Excellent";
        if (vo2 >= 50) return "Good";
        if (vo2 >= 45) return "Above Average";
        if (vo2 >= 40) return "Average";
        if (vo2 >= 35) return "Below Average";
        return "Poor";
      } else if (age < 40) {
        if (vo2 >= 52) return "Excellent";
        if (vo2 >= 47) return "Good";
        if (vo2 >= 42) return "Above Average";
        if (vo2 >= 37) return "Average";
        if (vo2 >= 33) return "Below Average";
        return "Poor";
      } else {
        if (vo2 >= 48) return "Excellent";
        if (vo2 >= 43) return "Good";
        if (vo2 >= 38) return "Above Average";
        if (vo2 >= 35) return "Average";
        if (vo2 >= 30) return "Below Average";
        return "Poor";
      }
    } else {
      if (age < 30) {
        if (vo2 >= 49) return "Excellent";
        if (vo2 >= 43) return "Good";
        if (vo2 >= 39) return "Above Average";
        if (vo2 >= 35) return "Average";
        if (vo2 >= 31) return "Below Average";
        return "Poor";
      } else if (age < 40) {
        if (vo2 >= 45) return "Excellent";
        if (vo2 >= 40) return "Good";
        if (vo2 >= 36) return "Above Average";
        if (vo2 >= 32) return "Average";
        if (vo2 >= 28) return "Below Average";
        return "Poor";
      } else {
        if (vo2 >= 42) return "Excellent";
        if (vo2 >= 37) return "Good";
        if (vo2 >= 33) return "Above Average";
        if (vo2 >= 30) return "Average";
        if (vo2 >= 26) return "Below Average";
        return "Poor";
      }
    }
  };

  const calculate = () => {
    if (method === "cooper") {
      const dist = parseFloat(distance);
      if (!dist) return;

      // Cooper test formula: VO2max = (distance in meters - 504.9) / 44.73
      const vo2max = (dist - 504.9) / 44.73;
      const ageNum = parseInt(age) || 25;
      const fitnessLevel = getFitnessLevel(vo2max, ageNum, gender);

      setResult({
        vo2max: parseFloat(vo2max.toFixed(1)),
        fitnessLevel,
      });
    } else {
      // Rockport Walking Test
      const w = parseFloat(weight);
      const t = parseFloat(time);
      const hr = parseFloat(heartRate);
      const a = parseInt(age) || 25;

      if (!w || !t || !hr) return;

      // Rockport formula
      const vo2max = gender === "male"
        ? 132.853 - (0.0769 * w) - (0.3877 * a) + (6.315 * 1) - (3.2649 * t) - (0.1565 * hr)
        : 132.853 - (0.0769 * w) - (0.3877 * a) + (6.315 * 0) - (3.2649 * t) - (0.1565 * hr);

      const fitnessLevel = getFitnessLevel(vo2max, a, gender);

      setResult({
        vo2max: parseFloat(vo2max.toFixed(1)),
        fitnessLevel,
      });
    }
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Cooper Test: VO2max = (distance in meters - 504.9) / 44.73; Rockport: VO2max = 132.853 - (0.0769 × weight) - (0.3877 × age) + (6.315 × gender) - (3.2649 × time) - (0.1565 × HR)"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Method
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={method === "cooper"}
                onChange={() => setMethod("cooper")}
                className="mr-2"
              />
              Cooper 12-Minute Test
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={method === "rockport"}
                onChange={() => setMethod("rockport")}
                className="mr-2"
              />
              Rockport Walking Test
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={gender === "male"}
                onChange={() => setGender("male")}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={gender === "female"}
                onChange={() => setGender("female")}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="calc-input"
            placeholder="30"
          />
        </div>

        {method === "cooper" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Distance Covered in 12 Minutes (meters)
            </label>
            <input
              type="number"
              step="0.1"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="calc-input"
              placeholder="2400"
            />
            <p className="text-xs text-gray-500 mt-1">
              Run or walk as far as you can in 12 minutes
            </p>
          </div>
        ) : (
          <>
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
                Time to Walk 1 Mile (minutes)
              </label>
              <input
                type="number"
                step="0.01"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="calc-input"
                placeholder="15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Heart Rate at End of Walk (bpm)
              </label>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(e.target.value)}
                className="calc-input"
                placeholder="120"
              />
            </div>
          </>
        )}

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>

        {result && (
          <div className="result-box">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">VO2 Max</div>
                <div className="text-2xl font-bold text-blue-700">
                  {result.vo2max} mL/kg/min
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 mb-1">Fitness Level</div>
                <div className="text-2xl font-bold text-green-700">
                  {result.fitnessLevel}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About VO2 Max Calculator</h3>
          <p>
            VO2 max is the maximum amount of oxygen your body can utilize during exercise.
            It's a key indicator of cardiovascular fitness and aerobic endurance. Higher values
            indicate better fitness levels.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
