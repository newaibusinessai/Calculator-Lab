"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("bmi-calculator")!;

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [weight, setWeight] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    healthyWeightRange: { min: number; max: number };
  } | null>(null);

  const calculate = () => {
    let weightKg: number;
    let heightM: number;

    if (unit === "imperial") {
      const lbs = parseFloat(weight);
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      const totalInches = feet * 12 + inches;

      if (isNaN(lbs) || totalInches <= 0) return;

      weightKg = lbs * 0.453592;
      heightM = totalInches * 0.0254;
    } else {
      const kg = parseFloat(weight);
      const cm = parseFloat(heightCm);

      if (isNaN(kg) || isNaN(cm) || cm <= 0) return;

      weightKg = kg;
      heightM = cm / 100;
    }

    const bmi = weightKg / (heightM * heightM);

    let category: string;
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal weight";
    } else if (bmi < 30) {
      category = "Overweight";
    } else if (bmi < 35) {
      category = "Obese (Class I)";
    } else if (bmi < 40) {
      category = "Obese (Class II)";
    } else {
      category = "Obese (Class III)";
    }

    // Calculate healthy weight range (BMI 18.5 - 24.9)
    const minWeight = 18.5 * heightM * heightM;
    const maxWeight = 24.9 * heightM * heightM;

    const healthyWeightRange = {
      min: unit === "imperial" ? minWeight / 0.453592 : minWeight,
      max: unit === "imperial" ? maxWeight / 0.453592 : maxWeight,
    };

    setResult({ bmi, category, healthyWeightRange });
  };

  const getBMIColor = (bmi: number) => {
    if (bmi < 18.5) return "text-blue-600";
    if (bmi < 25) return "text-green-600";
    if (bmi < 30) return "text-yellow-600";
    return "text-red-600";
  };

  const getBMIBarPosition = (bmi: number) => {
    // Scale BMI to percentage (15-40 range)
    const min = 15;
    const max = 40;
    const percentage = ((Math.min(Math.max(bmi, min), max) - min) / (max - min)) * 100;
    return percentage;
  };

  const formula = "BMI = weight (kg) / height (m)²";

  const faqs = [
    {
      question: "What is BMI?",
      answer: "BMI (Body Mass Index) is a measure of body fat based on height and weight. It's calculated by dividing your weight in kilograms by your height in meters squared. BMI is used as a screening tool to identify potential weight problems in adults."
    },
    {
      question: "What is a healthy BMI range?",
      answer: "A healthy BMI is generally considered to be between 18.5 and 24.9. Below 18.5 is classified as underweight, 25-29.9 as overweight, and 30 or above as obese. However, BMI doesn't account for factors like muscle mass, bone density, age, and gender."
    },
    {
      question: "Is BMI accurate for athletes?",
      answer: "BMI may not be accurate for athletes or people with high muscle mass. Since muscle weighs more than fat, athletes may have a high BMI despite having low body fat. Other measurements like body fat percentage may be more appropriate for these individuals."
    },
    {
      question: "Does BMI apply to children?",
      answer: "For children and teens, BMI is calculated the same way but interpreted differently. It's compared to growth charts that account for age and gender, resulting in a BMI percentile. A healthcare provider should interpret children's BMI."
    },
    {
      question: "How often should I check my BMI?",
      answer: "Checking your BMI once every few months is generally sufficient unless you're actively trying to change your weight. Focus on overall health habits rather than daily BMI fluctuations."
    }
  ];

  const howTo = [
    "Select your preferred unit system (US or Metric)",
    "Enter your weight in pounds or kilograms",
    "Enter your height in feet/inches or centimeters",
    "Click 'Calculate BMI' to see your result",
    "Review your BMI category and healthy weight range"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="max-w-lg mx-auto">
        {/* Unit toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setUnit("imperial")}
            className={`calc-btn flex-1 ${
              unit === "imperial" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            US Units (lbs, ft/in)
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={`calc-btn flex-1 ${
              unit === "metric" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Metric (kg, cm)
          </button>
        </div>

        {/* Input form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Weight ({unit === "imperial" ? "lbs" : "kg"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="calc-input"
              placeholder={unit === "imperial" ? "e.g., 150" : "e.g., 70"}
            />
          </div>

          {unit === "imperial" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height
              </label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    className="calc-input"
                    placeholder="Feet"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    className="calc-input"
                    placeholder="Inches"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="calc-input"
                placeholder="e.g., 175"
              />
            </div>
          )}
        </div>

        <button
          onClick={calculate}
          className="calc-btn calc-btn-primary w-full mb-6"
        >
          Calculate BMI
        </button>

        {/* Results */}
        {result && (
          <>
            <div className="result-box text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">Your BMI</div>
              <div className={`text-4xl font-bold ${getBMIColor(result.bmi)}`}>
                {result.bmi.toFixed(1)}
              </div>
              <div className={`text-lg font-medium mt-1 ${getBMIColor(result.bmi)}`}>
                {result.category}
              </div>
            </div>

            {/* BMI Scale */}
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">
                BMI Scale
              </div>
              <div className="relative h-8 rounded-full overflow-hidden flex">
                <div className="w-[14%] bg-blue-400" title="Underweight" />
                <div className="w-[26%] bg-green-400" title="Normal" />
                <div className="w-[20%] bg-yellow-400" title="Overweight" />
                <div className="w-[40%] bg-red-400" title="Obese" />
                {/* Indicator */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-black"
                  style={{ left: `${getBMIBarPosition(result.bmi)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
              </div>
            </div>

            {/* Healthy weight range */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Healthy Weight Range
              </div>
              <div className="text-lg">
                <span className="font-semibold text-green-600">
                  {result.healthyWeightRange.min.toFixed(1)} -{" "}
                  {result.healthyWeightRange.max.toFixed(1)}
                </span>
                <span className="text-gray-600">
                  {" "}
                  {unit === "imperial" ? "lbs" : "kg"}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                For your height (BMI 18.5 - 24.9)
              </div>
            </div>
          </>
        )}

        {/* BMI Categories */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm">
          <h3 className="font-semibold text-gray-800 mb-3">BMI Categories</h3>
          <table className="w-full">
            <tbody>
              <tr className="border-b">
                <td className="py-2 text-blue-600">Underweight</td>
                <td className="text-right">Below 18.5</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-green-600">Normal weight</td>
                <td className="text-right">18.5 - 24.9</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-yellow-600">Overweight</td>
                <td className="text-right">25 - 29.9</td>
              </tr>
              <tr>
                <td className="py-2 text-red-600">Obese</td>
                <td className="text-right">30 and above</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-xs text-gray-500">
          <strong>Note:</strong> BMI is a general indicator and does not account
          for muscle mass, bone density, age, or gender. Consult a healthcare
          professional for personalized advice.
        </div>
      </div>
    </CalculatorLayout>
  );
}
