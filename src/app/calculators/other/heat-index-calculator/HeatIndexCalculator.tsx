"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("heat-index-calculator")!;

export default function HeatIndexCalculator() {
  const [temperature, setTemperature] = useState("90");
  const [humidity, setHumidity] = useState("60");
  const [result, setResult] = useState<{
    heatIndex: number;
    category: string;
    color: string;
  } | null>(null);

  const getCategory = (heatIndex: number) => {
    if (heatIndex < 80) return { category: "Caution", color: "text-yellow-600" };
    if (heatIndex < 90) return { category: "Extreme Caution", color: "text-orange-600" };
    if (heatIndex < 103) return { category: "Danger", color: "text-red-600" };
    return { category: "Extreme Danger", color: "text-red-800" };
  };

  const calculate = () => {
    const temp = parseFloat(temperature);
    const rh = parseFloat(humidity);

    if (isNaN(temp) || isNaN(rh)) {
      alert("Please enter valid numbers");
      return;
    }

    if (rh < 0 || rh > 100) {
      alert("Humidity must be between 0 and 100%");
      return;
    }

    // Heat Index formula (Rothfusz regression)
    const c1 = -42.379;
    const c2 = 2.04901523;
    const c3 = 10.14333127;
    const c4 = -0.22475541;
    const c5 = -0.00683783;
    const c6 = -0.05481717;
    const c7 = 0.00122874;
    const c8 = 0.00085282;
    const c9 = -0.00000199;

    const heatIndex = c1 + (c2 * temp) + (c3 * rh) + (c4 * temp * rh) +
                      (c5 * temp * temp) + (c6 * rh * rh) + (c7 * temp * temp * rh) +
                      (c8 * temp * rh * rh) + (c9 * temp * temp * rh * rh);

    const { category, color } = getCategory(heatIndex);

    setResult({
      heatIndex,
      category,
      color
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Temperature (°F)
          </label>
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            className="calc-input"
            placeholder="90"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Relative Humidity (%): {humidity}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Heat Index
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">Heat Index</div>
              <div className="text-5xl font-bold text-green-700">
                {result.heatIndex.toFixed(1)}°F
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Warning Level</div>
              <div className={`text-xl font-bold ${result.color}`}>
                {result.category}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Heat Index Calculator</h3>
          <p>Calculate the heat index (apparent temperature) based on actual temperature and relative humidity. The heat index shows what the temperature feels like to the human body.</p>
          <div className="mt-2 text-xs">
            <strong>Categories:</strong>
            <ul className="list-disc ml-5 mt-1">
              <li>80-90°F: Extreme Caution (fatigue possible)</li>
              <li>90-103°F: Danger (heat exhaustion possible)</li>
              <li>103°F+: Extreme Danger (heat stroke likely)</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
