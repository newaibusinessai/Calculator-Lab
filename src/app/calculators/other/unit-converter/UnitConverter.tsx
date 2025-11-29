"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("unit-converter")!;

type ConversionCategory = "length" | "weight" | "temperature" | "volume" | "area" | "speed";

const conversions: Record<ConversionCategory, { units: string[]; base: string; toBase: Record<string, number> }> = {
  length: {
    units: ["meters", "kilometers", "centimeters", "millimeters", "miles", "yards", "feet", "inches"],
    base: "meters",
    toBase: {
      meters: 1,
      kilometers: 1000,
      centimeters: 0.01,
      millimeters: 0.001,
      miles: 1609.344,
      yards: 0.9144,
      feet: 0.3048,
      inches: 0.0254,
    },
  },
  weight: {
    units: ["kilograms", "grams", "milligrams", "pounds", "ounces", "stones", "metric tons"],
    base: "kilograms",
    toBase: {
      kilograms: 1,
      grams: 0.001,
      milligrams: 0.000001,
      pounds: 0.453592,
      ounces: 0.0283495,
      stones: 6.35029,
      "metric tons": 1000,
    },
  },
  temperature: {
    units: ["celsius", "fahrenheit", "kelvin"],
    base: "celsius",
    toBase: {}, // Special handling
  },
  volume: {
    units: ["liters", "milliliters", "gallons (US)", "quarts", "pints", "cups", "fluid ounces", "cubic meters"],
    base: "liters",
    toBase: {
      liters: 1,
      milliliters: 0.001,
      "gallons (US)": 3.78541,
      quarts: 0.946353,
      pints: 0.473176,
      cups: 0.236588,
      "fluid ounces": 0.0295735,
      "cubic meters": 1000,
    },
  },
  area: {
    units: ["square meters", "square kilometers", "square feet", "square yards", "acres", "hectares", "square miles"],
    base: "square meters",
    toBase: {
      "square meters": 1,
      "square kilometers": 1000000,
      "square feet": 0.092903,
      "square yards": 0.836127,
      acres: 4046.86,
      hectares: 10000,
      "square miles": 2589988.11,
    },
  },
  speed: {
    units: ["m/s", "km/h", "mph", "knots", "ft/s"],
    base: "m/s",
    toBase: {
      "m/s": 1,
      "km/h": 0.277778,
      mph: 0.44704,
      knots: 0.514444,
      "ft/s": 0.3048,
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState<ConversionCategory>("length");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState(conversions.length.units[0]);
  const [toUnit, setToUnit] = useState(conversions.length.units[1]);
  const [result, setResult] = useState<number | null>(null);

  const handleCategoryChange = (newCategory: ConversionCategory) => {
    setCategory(newCategory);
    setFromUnit(conversions[newCategory].units[0]);
    setToUnit(conversions[newCategory].units[1]);
    setResult(null);
  };

  const convert = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) return;

    let convertedValue: number;

    if (category === "temperature") {
      // Special handling for temperature
      let celsius: number;

      // Convert to Celsius first
      switch (fromUnit) {
        case "celsius":
          celsius = inputValue;
          break;
        case "fahrenheit":
          celsius = (inputValue - 32) * (5 / 9);
          break;
        case "kelvin":
          celsius = inputValue - 273.15;
          break;
        default:
          return;
      }

      // Convert from Celsius to target
      switch (toUnit) {
        case "celsius":
          convertedValue = celsius;
          break;
        case "fahrenheit":
          convertedValue = celsius * (9 / 5) + 32;
          break;
        case "kelvin":
          convertedValue = celsius + 273.15;
          break;
        default:
          return;
      }
    } else {
      // Standard conversion through base unit
      const toBaseValue = inputValue * conversions[category].toBase[fromUnit];
      convertedValue = toBaseValue / conversions[category].toBase[toUnit];
    }

    setResult(convertedValue);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    if (result !== null) {
      setValue(result.toString());
      setResult(parseFloat(value));
    }
  };

  const formatResult = (num: number) => {
    if (Math.abs(num) < 0.0001 || Math.abs(num) >= 1000000) {
      return num.toExponential(6);
    }
    return num.toLocaleString(undefined, { maximumFractionDigits: 6 });
  };

  const formula = "Converted Value = Input Value × (From Unit to Base) ÷ (To Unit to Base)";

  const faqs = [
    {
      question: "How does unit conversion work?",
      answer: "The converter first converts your input value to a base unit (e.g., meters for length), then converts from that base unit to your target unit. This ensures accurate conversions between any two units in a category."
    },
    {
      question: "What categories of units can I convert?",
      answer: "The converter supports 6 categories: Length (meters, feet, miles, etc.), Weight (kg, pounds, ounces), Temperature (Celsius, Fahrenheit, Kelvin), Volume (liters, gallons, cups), Area (square meters, acres), and Speed (m/s, mph, km/h)."
    },
    {
      question: "Why is temperature conversion different?",
      answer: "Temperature uses formulas rather than simple multiplication because the scales have different zero points. For example, °F = (°C × 9/5) + 32. The calculator handles this automatically."
    },
    {
      question: "Can I swap the from and to units?",
      answer: "Yes! Click the swap button (⇄) between the unit dropdowns to instantly switch the from and to units along with their values."
    }
  ];

  const howTo = [
    "Select a category (length, weight, temperature, volume, area, or speed)",
    "Enter the value you want to convert",
    "Choose the unit you're converting from",
    "Choose the unit you're converting to",
    "Click 'Convert' to see the result",
    "Use the swap button to quickly reverse the conversion"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="max-w-lg mx-auto">
        {/* Category selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(Object.keys(conversions) as ConversionCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`calc-btn text-sm capitalize ${
                  category === cat ? "bg-blue-100 border-blue-400" : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Converter */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Value
            </label>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="calc-input"
              placeholder="Enter value"
            />
          </div>

          <div className="grid grid-cols-5 gap-2 items-end">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="calc-input capitalize"
              >
                {conversions[category].units.map((unit) => (
                  <option key={unit} value={unit} className="capitalize">
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-center">
              <button
                onClick={swapUnits}
                className="calc-btn p-2"
                title="Swap units"
              >
                ⇄
              </button>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="calc-input capitalize"
              >
                {conversions[category].units.map((unit) => (
                  <option key={unit} value={unit} className="capitalize">
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={convert}
          className="calc-btn calc-btn-primary w-full mb-6"
        >
          Convert
        </button>

        {/* Result */}
        {result !== null && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-2">Result</div>
            <div className="text-lg">
              <span className="text-gray-600">{value} {fromUnit}</span>
              <span className="mx-2">=</span>
            </div>
            <div className="text-3xl font-bold text-green-700">
              {formatResult(result)}
            </div>
            <div className="text-lg text-gray-600 capitalize">{toUnit}</div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
