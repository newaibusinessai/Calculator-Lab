"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("body-type-calculator")!;

export default function BodyTypeCalculator() {
  const [wrist, setWrist] = useState("");
  const [height, setHeight] = useState("");
  const [shoulder, setShoulder] = useState("");
  const [waist, setWaist] = useState("");
  const [unit, setUnit] = useState("metric");
  const [result, setResult] = useState<{ type: string; description: string; characteristics: string[] } | null>(null);

  const calculate = () => {
    const w = parseFloat(wrist);
    const h = parseFloat(height);
    const s = parseFloat(shoulder);
    const wa = parseFloat(waist);

    if (!w || !h) return;

    const wristCm = unit === "imperial" ? w * 2.54 : w;
    const heightCm = unit === "imperial" ? h * 2.54 : h;
    const shoulderCm = s ? (unit === "imperial" ? s * 2.54 : s) : 0;
    const waistCm = wa ? (unit === "imperial" ? wa * 2.54 : wa) : 0;

    const frameIndex = heightCm / wristCm;
    const shoulderWaistRatio = shoulderCm && waistCm ? shoulderCm / waistCm : 0;

    let type = "Mesomorph";
    let description = "Athletic, muscular build";
    let characteristics = ["Medium bone structure", "Athletic build", "Gains muscle easily", "Moderate metabolism"];

    if (frameIndex > 10.9) {
      type = "Ectomorph";
      description = "Lean, long, and slender";
      characteristics = ["Small bone structure", "Lean build", "Fast metabolism", "Difficulty gaining weight"];
    } else if (frameIndex < 10.4 || (shoulderWaistRatio > 0 && shoulderWaistRatio < 1.4)) {
      type = "Endomorph";
      description = "Stocky, round, and soft";
      characteristics = ["Large bone structure", "Rounder build", "Slower metabolism", "Gains weight easily"];
    }

    setResult({ type, description, characteristics });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Unit System</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="metric" checked={unit === "metric"} onChange={(e) => setUnit(e.target.value)} className="mr-2" />
              Metric (cm)
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="imperial" checked={unit === "imperial"} onChange={(e) => setUnit(e.target.value)} className="mr-2" />
              Imperial (inches)
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Wrist Circumference ({unit === "metric" ? "cm" : "in"}) *</label>
            <input type="number" step="0.1" value={wrist} onChange={(e) => setWrist(e.target.value)} className="calc-input" placeholder={unit === "metric" ? "16" : "6.3"} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Height ({unit === "metric" ? "cm" : "in"}) *</label>
            <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="calc-input" placeholder={unit === "metric" ? "175" : "69"} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shoulder Width ({unit === "metric" ? "cm" : "in"})</label>
            <input type="number" step="0.1" value={shoulder} onChange={(e) => setShoulder(e.target.value)} className="calc-input" placeholder="Optional" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Waist Circumference ({unit === "metric" ? "cm" : "in"})</label>
            <input type="number" step="0.1" value={waist} onChange={(e) => setWaist(e.target.value)} className="calc-input" placeholder="Optional" />
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">Calculate Body Type</button>

        {result && (
          <div className="result-box">
            <div className="bg-blue-50 p-6 rounded-lg text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">Your Body Type</div>
              <div className="text-4xl font-bold text-blue-700">{result.type}</div>
              <div className="text-gray-600 mt-2">{result.description}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Characteristics:</h4>
              <ul className="space-y-2">
                {result.characteristics.map((char, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {char}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Body Type Calculator</h3>
          <p>
            Determine your somatotype (ectomorph, mesomorph, or endomorph) based on bone structure and body measurements. 
            This can help guide training and nutrition approaches.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}