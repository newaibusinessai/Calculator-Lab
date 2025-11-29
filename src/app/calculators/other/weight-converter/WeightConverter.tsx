"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("weight-converter")!;

type WeightUnit = "kg" | "lbs" | "oz" | "g" | "stones";

const weightConversions: Record<WeightUnit, number> = {
  kg: 1,
  lbs: 2.20462,
  oz: 35.274,
  g: 1000,
  stones: 0.157473,
};

const unitLabels: Record<WeightUnit, string> = {
  kg: "Kilograms (kg)",
  lbs: "Pounds (lbs)",
  oz: "Ounces (oz)",
  g: "Grams (g)",
  stones: "Stones (st)",
};

export default function WeightConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<WeightUnit>("kg");
  const [toUnit, setToUnit] = useState<WeightUnit>("lbs");

  const convert = (): string => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "0";

    // Convert to kg first, then to target unit
    const inKg = numValue / weightConversions[fromUnit];
    const result = inKg * weightConversions[toUnit];

    return result.toFixed(6).replace(/\.?0+$/, "");
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
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as WeightUnit)}
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
              onChange={(e) => setToUnit(e.target.value as WeightUnit)}
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
