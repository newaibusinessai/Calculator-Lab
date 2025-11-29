"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("concrete-calculator")!;

export default function ConcreteCalculator() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [result, setResult] = useState<{
    cubicYards: number;
    cubicFeet: number;
    bags80lb: number;
    bags60lb: number;
  } | null>(null);

  const calculate = () => {
    const len = parseFloat(length);
    const wid = parseFloat(width);
    const dep = parseFloat(depth);

    if (isNaN(len) || isNaN(wid) || isNaN(dep)) {
      alert("Please enter valid numbers");
      return;
    }

    if (len <= 0 || wid <= 0 || dep <= 0) {
      alert("All dimensions must be greater than 0");
      return;
    }

    // Calculate volume in cubic feet
    const cubicFeet = len * wid * (dep / 12); // depth is in inches, convert to feet

    // Convert to cubic yards (1 cubic yard = 27 cubic feet)
    const cubicYards = cubicFeet / 27;

    // Calculate number of bags needed
    // 80lb bag covers approximately 0.6 cubic feet
    // 60lb bag covers approximately 0.45 cubic feet
    const bags80lb = Math.ceil(cubicFeet / 0.6);
    const bags60lb = Math.ceil(cubicFeet / 0.45);

    setResult({
      cubicYards,
      cubicFeet,
      bags80lb,
      bags60lb
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Length (feet)
          </label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="calc-input"
            placeholder="10"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Width (feet)
          </label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="calc-input"
            placeholder="10"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Depth (inches)
          </label>
          <input
            type="number"
            value={depth}
            onChange={(e) => setDepth(e.target.value)}
            className="calc-input"
            placeholder="4"
            step="0.5"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Concrete
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">Concrete Needed</div>
              <div className="text-4xl font-bold text-green-700">
                {result.cubicYards.toFixed(2)}
              </div>
              <div className="text-lg text-gray-600 mt-1">cubic yards</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Cubic Feet:</span>
                <span className="font-semibold text-gray-800">
                  {result.cubicFeet.toFixed(2)} ft³
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200"></div>
              <div className="text-sm text-gray-600 font-semibold mb-1">Pre-mixed Bags Needed:</div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">80 lb bags:</span>
                <span className="font-semibold text-gray-800">
                  {result.bags80lb} bags
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">60 lb bags:</span>
                <span className="font-semibold text-gray-800">
                  {result.bags60lb} bags
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Concrete Calculator</h3>
          <p>Calculate the amount of concrete needed for a slab or pad. Enter dimensions and get the volume in cubic yards plus the number of pre-mixed bags required.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
