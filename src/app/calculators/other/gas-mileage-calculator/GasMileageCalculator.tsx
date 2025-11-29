"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("gas-mileage-calculator")!;

export default function GasMileageCalculator() {
  const [milesDriven, setMilesDriven] = useState("");
  const [gallonsUsed, setGallonsUsed] = useState("");
  const [result, setResult] = useState<{
    mpg: number;
    kmPerLiter: number;
  } | null>(null);

  const calculate = () => {
    const miles = parseFloat(milesDriven);
    const gallons = parseFloat(gallonsUsed);

    if (isNaN(miles) || isNaN(gallons)) {
      alert("Please enter valid numbers");
      return;
    }

    if (gallons <= 0) {
      alert("Gallons must be greater than 0");
      return;
    }

    const mpg = miles / gallons;
    const kmPerLiter = mpg * 0.425144; // Convert MPG to km/L

    setResult({
      mpg,
      kmPerLiter
    });
  };

  const formula = "MPG = Miles Driven ÷ Gallons Used | km/L = MPG × 0.425144";

  const faqs = [
    {
      question: "What is MPG and why does it matter?",
      answer: "MPG (Miles Per Gallon) measures your vehicle's fuel efficiency - how many miles you can drive on one gallon of gas. Higher MPG means better fuel economy, which saves money and is better for the environment."
    },
    {
      question: "How do I measure miles driven and gallons used?",
      answer: "Fill your tank completely, note your odometer reading, drive normally, then fill up again. The gallons needed to refill is your 'gallons used', and the difference in odometer readings is your 'miles driven'."
    },
    {
      question: "What's a good MPG?",
      answer: "It varies by vehicle type. Compact cars: 30-40 MPG is good. Sedans: 25-35 MPG. SUVs: 20-28 MPG. Trucks: 15-25 MPG. Hybrids can achieve 40-60 MPG or more. Compare your results to your vehicle's EPA rating."
    },
    {
      question: "What is km/L?",
      answer: "Kilometers per liter (km/L) is the metric equivalent of MPG, commonly used outside the United States. The calculator automatically converts your MPG to km/L for international comparison."
    }
  ];

  const howTo = [
    "Enter the total miles driven since your last fill-up",
    "Enter the gallons of fuel used to refill your tank",
    "Click 'Calculate MPG' to see your fuel efficiency",
    "View results in both MPG (miles per gallon) and km/L (kilometers per liter)",
    "Compare your result to your vehicle's EPA rating to assess performance"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Miles Driven
          </label>
          <input
            type="number"
            value={milesDriven}
            onChange={(e) => setMilesDriven(e.target.value)}
            className="calc-input"
            placeholder="300"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallons Used
          </label>
          <input
            type="number"
            value={gallonsUsed}
            onChange={(e) => setGallonsUsed(e.target.value)}
            className="calc-input"
            placeholder="12"
            step="0.01"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate MPG
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">Fuel Efficiency</div>
              <div className="text-4xl font-bold text-green-700">
                {result.mpg.toFixed(2)}
              </div>
              <div className="text-lg text-gray-600 mt-1">MPG</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Metric Equivalent</div>
              <div className="text-2xl font-semibold text-gray-800">
                {result.kmPerLiter.toFixed(2)} km/L
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
