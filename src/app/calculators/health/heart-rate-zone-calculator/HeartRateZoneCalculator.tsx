"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("heart-rate-zone-calculator")!;

export default function HeartRateZoneCalculator() {
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [method, setMethod] = useState<"simple" | "karvonen">("simple");
  const [result, setResult] = useState<{
    maxHR: number;
    zones: { name: string; range: string; purpose: string }[];
  } | null>(null);

  const calculate = () => {
    const ageNum = parseInt(age);
    if (!ageNum) return;

    const maxHR = 220 - ageNum;

    if (method === "simple") {
      const zones = [
        {
          name: "Zone 1 - Very Light",
          range: `${Math.round(maxHR * 0.5)}-${Math.round(maxHR * 0.6)} bpm`,
          purpose: "Warm-up, recovery",
        },
        {
          name: "Zone 2 - Light",
          range: `${Math.round(maxHR * 0.6)}-${Math.round(maxHR * 0.7)} bpm`,
          purpose: "Fat burning, endurance",
        },
        {
          name: "Zone 3 - Moderate",
          range: `${Math.round(maxHR * 0.7)}-${Math.round(maxHR * 0.8)} bpm`,
          purpose: "Aerobic capacity",
        },
        {
          name: "Zone 4 - Hard",
          range: `${Math.round(maxHR * 0.8)}-${Math.round(maxHR * 0.9)} bpm`,
          purpose: "Anaerobic capacity",
        },
        {
          name: "Zone 5 - Maximum",
          range: `${Math.round(maxHR * 0.9)}-${maxHR} bpm`,
          purpose: "Peak performance",
        },
      ];

      setResult({ maxHR, zones });
    } else {
      const rhr = parseInt(restingHR);
      if (!rhr) return;

      const hrReserve = maxHR - rhr;
      const zones = [
        {
          name: "Zone 1 - Very Light",
          range: `${Math.round(hrReserve * 0.5 + rhr)}-${Math.round(hrReserve * 0.6 + rhr)} bpm`,
          purpose: "Warm-up, recovery",
        },
        {
          name: "Zone 2 - Light",
          range: `${Math.round(hrReserve * 0.6 + rhr)}-${Math.round(hrReserve * 0.7 + rhr)} bpm`,
          purpose: "Fat burning, endurance",
        },
        {
          name: "Zone 3 - Moderate",
          range: `${Math.round(hrReserve * 0.7 + rhr)}-${Math.round(hrReserve * 0.8 + rhr)} bpm`,
          purpose: "Aerobic capacity",
        },
        {
          name: "Zone 4 - Hard",
          range: `${Math.round(hrReserve * 0.8 + rhr)}-${Math.round(hrReserve * 0.9 + rhr)} bpm`,
          purpose: "Anaerobic capacity",
        },
        {
          name: "Zone 5 - Maximum",
          range: `${Math.round(hrReserve * 0.9 + rhr)}-${maxHR} bpm`,
          purpose: "Peak performance",
        },
      ];

      setResult({ maxHR, zones });
    }
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Max HR = 220 - Age; Karvonen: Target HR = ((Max HR - Resting HR) × %Intensity) + Resting HR"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Calculation Method
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={method === "simple"}
                onChange={() => setMethod("simple")}
                className="mr-2"
              />
              Simple (% of Max HR)
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                checked={method === "karvonen"}
                onChange={() => setMethod("karvonen")}
                className="mr-2"
              />
              Karvonen (Heart Rate Reserve)
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

        {method === "karvonen" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resting Heart Rate (bpm)
            </label>
            <input
              type="number"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              className="calc-input"
              placeholder="60"
            />
            <p className="text-xs text-gray-500 mt-1">
              Measure your pulse first thing in the morning before getting out of bed
            </p>
          </div>
        )}

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate
        </button>

        {result && (
          <div className="result-box">
            <div className="bg-blue-50 p-4 rounded-lg text-center mb-4">
              <div className="text-sm text-gray-600 mb-1">Maximum Heart Rate</div>
              <div className="text-2xl font-bold text-blue-700">{result.maxHR} bpm</div>
            </div>

            <div className="space-y-3">
              {result.zones.map((zone, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 bg-white"
                >
                  <div className="font-semibold text-gray-800">{zone.name}</div>
                  <div className="text-lg text-blue-600 font-medium">{zone.range}</div>
                  <div className="text-sm text-gray-600">{zone.purpose}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">
            About Heart Rate Zone Calculator
          </h3>
          <p>
            Training in different heart rate zones helps you achieve specific fitness goals.
            The Karvonen method is more personalized as it accounts for your resting heart rate,
            making it more accurate for individual training plans.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
