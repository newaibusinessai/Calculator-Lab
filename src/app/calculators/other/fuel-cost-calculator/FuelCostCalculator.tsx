"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("fuel-cost-calculator")!;

export default function FuelCostCalculator() {
  const [distance, setDistance] = useState("300");
  const [mpg, setMpg] = useState("25");
  const [gasPrice, setGasPrice] = useState("3.50");
  const [result, setResult] = useState<{
    gallonsNeeded: number;
    totalCost: number;
    costPerMile: number;
  } | null>(null);

  const calculate = () => {
    const dist = parseFloat(distance);
    const milesPerGallon = parseFloat(mpg);
    const pricePerGallon = parseFloat(gasPrice);

    if (isNaN(dist) || isNaN(milesPerGallon) || isNaN(pricePerGallon)) {
      alert("Please enter valid numbers");
      return;
    }

    if (milesPerGallon <= 0) {
      alert("MPG must be greater than 0");
      return;
    }

    const gallonsNeeded = dist / milesPerGallon;
    const totalCost = gallonsNeeded * pricePerGallon;
    const costPerMile = totalCost / dist;

    setResult({
      gallonsNeeded,
      totalCost,
      costPerMile
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distance (miles)
          </label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="calc-input"
            placeholder="300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fuel Efficiency (MPG)
          </label>
          <input
            type="number"
            value={mpg}
            onChange={(e) => setMpg(e.target.value)}
            className="calc-input"
            placeholder="25"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gas Price ($ per gallon)
          </label>
          <input
            type="number"
            value={gasPrice}
            onChange={(e) => setGasPrice(e.target.value)}
            className="calc-input"
            placeholder="3.50"
            step="0.01"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Fuel Cost
        </button>

        {result && (
          <div className="result-box">
            <div className="text-sm text-gray-600 mb-3">Trip Fuel Cost</div>
            <div className="space-y-3">
              <div className="text-center pb-3 border-b border-gray-200">
                <div className="text-3xl font-bold text-green-700">
                  ${result.totalCost.toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Cost</div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Gallons Needed:</span>
                <span className="font-semibold text-gray-800">
                  {result.gallonsNeeded.toFixed(2)} gal
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Cost Per Mile:</span>
                <span className="font-semibold text-gray-800">
                  ${result.costPerMile.toFixed(3)}/mi
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Fuel Cost Calculator</h3>
          <p>Calculate the total fuel cost for your trip based on distance, fuel efficiency (MPG), and current gas prices.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
