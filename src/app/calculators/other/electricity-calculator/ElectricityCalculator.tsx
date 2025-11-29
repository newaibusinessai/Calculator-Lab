"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("electricity-calculator")!;

export default function ElectricityCalculator() {
  const [watts, setWatts] = useState("100");
  const [hoursPerDay, setHoursPerDay] = useState("8");
  const [rate, setRate] = useState("0.12");
  const [result, setResult] = useState<{
    dailyCost: number;
    monthlyCost: number;
    yearlyCost: number;
    dailyKwh: number;
    monthlyKwh: number;
  } | null>(null);

  const calculate = () => {
    const wattage = parseFloat(watts);
    const hours = parseFloat(hoursPerDay);
    const costPerKwh = parseFloat(rate);

    if (isNaN(wattage) || isNaN(hours) || isNaN(costPerKwh)) {
      alert("Please enter valid numbers");
      return;
    }

    if (wattage <= 0 || hours <= 0 || costPerKwh <= 0) {
      alert("All values must be greater than 0");
      return;
    }

    // Calculate kWh per day
    const dailyKwh = (wattage * hours) / 1000;
    const monthlyKwh = dailyKwh * 30;

    // Calculate costs
    const dailyCost = dailyKwh * costPerKwh;
    const monthlyCost = dailyCost * 30;
    const yearlyCost = monthlyCost * 12;

    setResult({
      dailyCost,
      monthlyCost,
      yearlyCost,
      dailyKwh,
      monthlyKwh
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Power Consumption (Watts)
          </label>
          <input
            type="number"
            value={watts}
            onChange={(e) => setWatts(e.target.value)}
            className="calc-input"
            placeholder="100"
            step="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours Used Per Day
          </label>
          <input
            type="number"
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(e.target.value)}
            className="calc-input"
            placeholder="8"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Electricity Rate ($ per kWh)
          </label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="calc-input"
            placeholder="0.12"
            step="0.01"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Cost
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">Monthly Cost</div>
              <div className="text-4xl font-bold text-green-700">
                ${result.monthlyCost.toFixed(2)}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Daily Cost:</span>
                <span className="font-semibold text-gray-800">
                  ${result.dailyCost.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Yearly Cost:</span>
                <span className="font-semibold text-gray-800">
                  ${result.yearlyCost.toFixed(2)}
                </span>
              </div>
              <div className="pt-2 border-t border-gray-200"></div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Daily Usage:</span>
                <span className="text-gray-800">
                  {result.dailyKwh.toFixed(2)} kWh
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Monthly Usage:</span>
                <span className="text-gray-800">
                  {result.monthlyKwh.toFixed(2)} kWh
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Electricity Calculator</h3>
          <p>Calculate electricity costs based on wattage, daily usage hours, and your electricity rate. Useful for estimating appliance running costs.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
