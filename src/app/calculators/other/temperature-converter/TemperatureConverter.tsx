"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("temperature-converter")!;

type TempUnit = "celsius" | "fahrenheit" | "kelvin";

const unitLabels: Record<TempUnit, string> = {
  celsius: "Celsius (°C)",
  fahrenheit: "Fahrenheit (°F)",
  kelvin: "Kelvin (K)",
};

export default function TemperatureConverter() {
  const [value, setValue] = useState<string>("0");
  const [fromUnit, setFromUnit] = useState<TempUnit>("celsius");
  const [toUnit, setToUnit] = useState<TempUnit>("fahrenheit");

  const convert = (): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "0";

    let celsius: number;

    // Convert to Celsius first
    if (fromUnit === "celsius") {
      celsius = numValue;
    } else if (fromUnit === "fahrenheit") {
      celsius = (numValue - 32) * (5 / 9);
    } else {
      celsius = numValue - 273.15;
    }

    // Convert from Celsius to target unit
    let result: number;
    if (toUnit === "celsius") {
      result = celsius;
    } else if (toUnit === "fahrenheit") {
      result = celsius * (9 / 5) + 32;
    } else {
      result = celsius + 273.15;
    }

    return result.toFixed(2).replace(/\.?0+$/, "");
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter value"
              step="0.1"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as TempUnit)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(unitLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={convert()}
              readOnly
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-semibold"
            />
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value as TempUnit)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(unitLabels).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Result</h3>
          <p className="text-2xl font-bold text-blue-700">
            {value || "0"} {unitLabels[fromUnit]} = {convert()} {unitLabels[toUnit]}
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
