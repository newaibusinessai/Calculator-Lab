"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("target-heart-rate-calculator")!;

export default function TargetHeartRateCalculator() {
  const [age, setAge] = useState("");
  const [restingHR, setRestingHR] = useState("");
  const [result, setResult] = useState<{
    maxHR: number;
    zones: { name: string; min: number; max: number; description: string }[];
  } | null>(null);

  const calculate = () => {
    const a = parseFloat(age);
    const rhr = parseFloat(restingHR) || 70;

    if (!a || a < 1 || a > 120) return;

    const maxHR = 220 - a;
    const hrReserve = maxHR - rhr;

    const zones = [
      {
        name: "Warm Up",
        min: Math.round(rhr + hrReserve * 0.50),
        max: Math.round(rhr + hrReserve * 0.60),
        description: "Light activity, recovery",
      },
      {
        name: "Fat Burn",
        min: Math.round(rhr + hrReserve * 0.60),
        max: Math.round(rhr + hrReserve * 0.70),
        description: "Moderate intensity, fat burning",
      },
      {
        name: "Cardio",
        min: Math.round(rhr + hrReserve * 0.70),
        max: Math.round(rhr + hrReserve * 0.80),
        description: "Aerobic endurance training",
      },
      {
        name: "Peak",
        min: Math.round(rhr + hrReserve * 0.80),
        max: Math.round(rhr + hrReserve * 0.90),
        description: "High intensity, performance",
      },
      {
        name: "Maximum",
        min: Math.round(rhr + hrReserve * 0.90),
        max: maxHR,
        description: "Maximum effort, short bursts",
      },
    ];

    setResult({ maxHR, zones });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Maximum Heart Rate = 220 - Age; Heart Rate Reserve = Max HR - Resting HR; Target HR = (Heart Rate Reserve × Intensity %) + Resting HR (Karvonen Formula); Zone 1 (50-60%): Warm-up; Zone 2 (60-70%): Fat burn; Zone 3 (70-80%): Cardio; Zone 4 (80-90%): Peak; Zone 5 (90-100%): Maximum"
      faqs={[
        {
          question: "What is target heart rate and why does it matter?",
          answer: "Target heart rate is the ideal heart rate range for different exercise intensities. Training in specific zones optimizes different benefits: lower zones burn more fat percentage, middle zones improve aerobic capacity, higher zones boost anaerobic performance and VO2 max."
        },
        {
          question: "How do I measure my resting heart rate?",
          answer: "Measure first thing in the morning before getting out of bed. Use your index and middle fingers on your wrist or neck, count beats for 60 seconds (or 30 seconds × 2). Do this for 3-5 consecutive mornings and take the average. Normal resting HR is 60-100 bpm; athletes often have 40-60 bpm."
        },
        {
          question: "Which heart rate zone is best for fat loss?",
          answer: "While the 'fat burn zone' (60-70% max HR) uses a higher percentage of fat for fuel, higher intensity zones burn more total calories. For fat loss, focus on total calorie burn and consistency. Mix moderate cardio (Zone 2-3) with some higher intensity intervals (Zone 4-5)."
        },
        {
          question: "Is the 220-age formula accurate for everyone?",
          answer: "The 220-age formula is a general estimate with a standard deviation of ±10-12 bpm. It's less accurate for very fit individuals and older adults. More accurate formulas exist (Tanaka: 208 - 0.7×age), but the differences are usually small. The best method is a laboratory max HR test."
        }
      ]}
      howTo={[
        "Enter your age in years",
        "Optionally, measure and enter your resting heart rate (see FAQ for how to measure)",
        "If you don't know your resting HR, leave it blank - it will use a default of 70 bpm",
        "Click 'Calculate Heart Rate Zones' to see results",
        "Review your maximum heart rate (220 - age)",
        "See your five training zones with specific heart rate ranges",
        "Use these zones during workouts by monitoring with a heart rate monitor or fitness tracker",
        "Warm up in Zone 1, do steady cardio in Zones 2-3, intervals in Zones 4-5"
      ]}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age (years)
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="calc-input"
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resting Heart Rate (optional, bpm)
            </label>
            <input
              type="number"
              value={restingHR}
              onChange={(e) => setRestingHR(e.target.value)}
              className="calc-input"
              placeholder="70"
            />
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Heart Rate Zones
        </button>

        {result && (
          <div className="result-box">
            <div className="bg-red-50 p-4 rounded-lg text-center mb-4">
              <div className="text-sm text-gray-600 mb-1">Maximum Heart Rate</div>
              <div className="text-3xl font-bold text-red-700">{result.maxHR} bpm</div>
              <div className="text-xs text-gray-500 mt-1">220 - {age} years</div>
            </div>

            <h3 className="text-lg font-semibold mb-3">Training Zones (Karvonen Method)</h3>
            <div className="space-y-3">
              {result.zones.map((zone, index) => (
                <div
                  key={zone.name}
                  className={'p-4 rounded-lg ' + (
                    index === 0 ? 'bg-green-50' :
                    index === 1 ? 'bg-yellow-50' :
                    index === 2 ? 'bg-orange-50' :
                    index === 3 ? 'bg-red-50' :
                    'bg-purple-50'
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800">{zone.name}</div>
                      <div className="text-sm text-gray-600">{zone.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">{zone.min}-{zone.max}</div>
                      <div className="text-xs text-gray-600">bpm</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Target Heart Rate Calculator</h3>
          <p>
            Calculate your target heart rate zones for different training intensities. Uses the 
            Karvonen formula which accounts for resting heart rate for more accurate zones.
            Maximum heart rate is estimated as 220 - age.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
