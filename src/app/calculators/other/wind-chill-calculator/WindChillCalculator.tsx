"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("wind-chill-calculator")!;

export default function WindChillCalculator() {
  const [temperature, setTemperature] = useState("30");
  const [windSpeed, setWindSpeed] = useState("15");
  const [result, setResult] = useState<{
    windChill: number;
    difference: number;
  } | null>(null);

  const calculate = () => {
    const temp = parseFloat(temperature);
    const wind = parseFloat(windSpeed);

    if (isNaN(temp) || isNaN(wind)) {
      alert("Please enter valid numbers");
      return;
    }

    if (wind < 0) {
      alert("Wind speed cannot be negative");
      return;
    }

    // Wind Chill formula (NWS formula)
    // Valid for temps at or below 50°F and wind speeds above 3 mph
    let windChill: number;

    if (temp > 50 || wind < 3) {
      windChill = temp; // Wind chill not applicable
    } else {
      windChill = 35.74 + (0.6215 * temp) - (35.75 * Math.pow(wind, 0.16)) + (0.4275 * temp * Math.pow(wind, 0.16));
    }

    const difference = temp - windChill;

    setResult({
      windChill,
      difference
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
            placeholder="30"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Wind Speed (mph)
          </label>
          <input
            type="number"
            value={windSpeed}
            onChange={(e) => setWindSpeed(e.target.value)}
            className="calc-input"
            placeholder="15"
            step="1"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Wind Chill
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">Wind Chill Temperature</div>
              <div className="text-5xl font-bold text-green-700">
                {result.windChill.toFixed(1)}°F
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">
                Feels {result.difference.toFixed(1)}°F colder
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Wind Chill Calculator</h3>
          <p>Calculate the wind chill temperature based on actual temperature and wind speed. Wind chill describes how cold it feels when wind is factored in with the actual temperature.</p>
          <p className="mt-2 text-xs">Note: Wind chill is only applicable for temperatures at or below 50°F and wind speeds above 3 mph.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
