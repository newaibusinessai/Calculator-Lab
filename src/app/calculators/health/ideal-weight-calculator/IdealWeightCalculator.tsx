"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("ideal-weight-calculator")!;

export default function IdealWeightCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("imperial");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [heightCm, setHeightCm] = useState("");

  const [result, setResult] = useState<{
    robinson: number;
    miller: number;
    devine: number;
    hamwi: number;
    bmi: { min: number; max: number };
  } | null>(null);

  const calculate = () => {
    let heightInchesTotal: number;

    if (unit === "imperial") {
      const feet = parseFloat(heightFeet) || 0;
      const inches = parseFloat(heightInches) || 0;
      heightInchesTotal = feet * 12 + inches;
    } else {
      const cm = parseFloat(heightCm);
      if (isNaN(cm)) return;
      heightInchesTotal = cm / 2.54;
    }

    if (heightInchesTotal < 60) return; // Minimum 5 feet

    const inchesOver5Feet = heightInchesTotal - 60;

    let robinson: number;
    let miller: number;
    let devine: number;
    let hamwi: number;

    if (gender === "male") {
      // Robinson Formula (1983)
      robinson = 52 + 1.9 * inchesOver5Feet;
      // Miller Formula (1983)
      miller = 56.2 + 1.41 * inchesOver5Feet;
      // Devine Formula (1974)
      devine = 50 + 2.3 * inchesOver5Feet;
      // Hamwi Formula (1964)
      hamwi = 48 + 2.7 * inchesOver5Feet;
    } else {
      // Robinson Formula (1983)
      robinson = 49 + 1.7 * inchesOver5Feet;
      // Miller Formula (1983)
      miller = 53.1 + 1.36 * inchesOver5Feet;
      // Devine Formula (1974)
      devine = 45.5 + 2.3 * inchesOver5Feet;
      // Hamwi Formula (1964)
      hamwi = 45.5 + 2.2 * inchesOver5Feet;
    }

    // BMI-based healthy range (18.5 - 24.9)
    const heightM = heightInchesTotal * 0.0254;
    const bmiMin = 18.5 * heightM * heightM;
    const bmiMax = 24.9 * heightM * heightM;

    // Convert to display units
    const conversionFactor = unit === "imperial" ? 2.205 : 1;

    setResult({
      robinson: robinson * conversionFactor,
      miller: miller * conversionFactor,
      devine: devine * conversionFactor,
      hamwi: hamwi * conversionFactor,
      bmi: {
        min: bmiMin * conversionFactor,
        max: bmiMax * conversionFactor,
      },
    });
  };

  const formatWeight = (value: number) => {
    return `${value.toFixed(1)} ${unit === "imperial" ? "lbs" : "kg"}`;
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Robinson: Male = 52kg + 1.9kg per inch over 5 feet; Female = 49kg + 1.7kg per inch over 5 feet; Miller: Male = 56.2kg + 1.41kg per inch over 5 feet; Female = 53.1kg + 1.36kg per inch over 5 feet; Devine: Male = 50kg + 2.3kg per inch over 5 feet; Female = 45.5kg + 2.3kg per inch over 5 feet; Hamwi: Male = 48kg + 2.7kg per inch over 5 feet; Female = 45.5kg + 2.2kg per inch over 5 feet; BMI Range: Weight for BMI 18.5-24.9"
      faqs={[
        {
          question: "Which ideal weight formula is most accurate?",
          answer: "The Robinson formula (1983) is most commonly used in modern practice. However, the BMI-based healthy weight range (18.5-24.9) is generally considered more reliable as it provides a range rather than a single number and is based on extensive population health data."
        },
        {
          question: "Why do different formulas give different results?",
          answer: "Each formula was developed for different purposes and populations. Devine and Hamwi were created for drug dosing calculations. Robinson and Miller aimed to update these for modern populations. Differences of 5-15 pounds between formulas are normal."
        },
        {
          question: "Do these formulas account for muscle mass?",
          answer: "No, these formulas only use height and gender. They don't account for body composition, muscle mass, bone density, age, or ethnicity. Athletes and very muscular individuals may have an 'ideal weight' above these estimates."
        },
        {
          question: "Should I aim for the ideal weight shown?",
          answer: "Use these as rough guidelines, not strict targets. The healthy BMI range is more useful. Your ideal weight depends on body composition, health markers, fitness level, and how you feel. Consult a healthcare provider for personalized advice."
        }
      ]}
      howTo={[
        "Choose between US Units (pounds/feet/inches) or Metric (kg/cm)",
        "Select your biological gender",
        "Enter your height (feet and inches for US, cm for metric)",
        "Click 'Calculate Ideal Weight' to see results",
        "Review the healthy BMI-based weight range (most reliable)",
        "Compare results from four different medical formulas",
        "See the average of all formulas for a middle estimate",
        "Remember these are estimates - consider your body composition and health"
      ]}
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
            US Units
          </button>
          <button
            onClick={() => setUnit("metric")}
            className={`calc-btn flex-1 ${
              unit === "metric" ? "bg-blue-100 border-blue-400" : ""
            }`}
          >
            Metric
          </button>
        </div>

        {/* Input form */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value as "male" | "female")}
              className="calc-input"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {unit === "imperial" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  className="calc-input flex-1"
                  placeholder="Feet"
                />
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  className="calc-input flex-1"
                  placeholder="Inches"
                />
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
              />
            </div>
          )}
        </div>

        <button
          onClick={calculate}
          className="calc-btn calc-btn-primary w-full mb-6"
        >
          Calculate Ideal Weight
        </button>

        {/* Results */}
        {result && (
          <>
            {/* BMI-based range */}
            <div className="result-box text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">
                Healthy Weight Range (BMI 18.5 - 24.9)
              </div>
              <div className="result-value">
                {formatWeight(result.bmi.min)} - {formatWeight(result.bmi.max)}
              </div>
            </div>

            {/* Formula results */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-700 mb-3">
                Ideal Weight by Formula
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">Robinson Formula</div>
                    <div className="text-xs text-gray-500">1983 - Most commonly used</div>
                  </div>
                  <div className="text-lg font-semibold text-green-600">
                    {formatWeight(result.robinson)}
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">Miller Formula</div>
                    <div className="text-xs text-gray-500">1983</div>
                  </div>
                  <div className="text-lg font-semibold">
                    {formatWeight(result.miller)}
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <div>
                    <div className="font-medium">Devine Formula</div>
                    <div className="text-xs text-gray-500">1974 - Originally for drug dosing</div>
                  </div>
                  <div className="text-lg font-semibold">
                    {formatWeight(result.devine)}
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <div className="font-medium">Hamwi Formula</div>
                    <div className="text-xs text-gray-500">1964</div>
                  </div>
                  <div className="text-lg font-semibold">
                    {formatWeight(result.hamwi)}
                  </div>
                </div>
              </div>
            </div>

            {/* Average */}
            <div className="border rounded-lg p-4 text-center mb-6">
              <div className="text-sm text-gray-600 mb-1">Average of All Formulas</div>
              <div className="text-2xl font-bold text-blue-600">
                {formatWeight(
                  (result.robinson + result.miller + result.devine + result.hamwi) / 4
                )}
              </div>
            </div>
          </>
        )}

        {/* Info */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About These Formulas</h3>
          <p className="mb-2">
            Ideal body weight (IBW) formulas were originally developed for
            medical dosage calculations. They provide estimates based on height
            and gender but don't account for:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Muscle mass and body composition</li>
            <li>Age and bone density</li>
            <li>Ethnic and genetic variations</li>
            <li>Individual health conditions</li>
          </ul>
          <p className="mt-2 text-xs">
            The BMI-based healthy range is generally considered more reliable.
            Consult a healthcare professional for personalized advice.
          </p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
