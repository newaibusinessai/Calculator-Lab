"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("perimeter-calculator")!;

export default function PerimeterCalculator() {
  const [shape, setShape] = useState("square");
  const [side, setSide] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [radius, setRadius] = useState("");
  const [base, setBase] = useState("");
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    let perimeter: number;

    switch (shape) {
      case "square":
        const s = parseFloat(side);
        if (isNaN(s)) {
          setResult("Please enter a valid side length");
          return;
        }
        perimeter = 4 * s;
        break;

      case "rectangle":
        const l = parseFloat(length);
        const w = parseFloat(width);
        if (isNaN(l) || isNaN(w)) {
          setResult("Please enter valid length and width");
          return;
        }
        perimeter = 2 * (l + w);
        break;

      case "circle":
        const r = parseFloat(radius);
        if (isNaN(r)) {
          setResult("Please enter a valid radius");
          return;
        }
        perimeter = 2 * Math.PI * r;
        break;

      case "triangle":
        const a = parseFloat(sideA);
        const b = parseFloat(sideB);
        const c = parseFloat(sideC);
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
          setResult("Please enter all three sides");
          return;
        }
        perimeter = a + b + c;
        break;

      default:
        setResult("Invalid shape selected");
        return;
    }

    const unit = shape === "circle" ? " (circumference)" : "";
    setResult(`${perimeter.toFixed(2)}${unit}`);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shape
          </label>
          <select
            value={shape}
            onChange={(e) => {
              setShape(e.target.value);
              setResult(null);
            }}
            className="calc-input"
          >
            <option value="square">Square</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
            <option value="triangle">Triangle</option>
          </select>
        </div>

        {shape === "square" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Side Length
            </label>
            <input
              type="number"
              step="any"
              value={side}
              onChange={(e) => setSide(e.target.value)}
              className="calc-input"
              placeholder="Enter side length"
            />
          </div>
        )}

        {shape === "rectangle" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Length
              </label>
              <input
                type="number"
                step="any"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="calc-input"
                placeholder="Enter length"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Width
              </label>
              <input
                type="number"
                step="any"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="calc-input"
                placeholder="Enter width"
              />
            </div>
          </div>
        )}

        {shape === "circle" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Radius
            </label>
            <input
              type="number"
              step="any"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="calc-input"
              placeholder="Enter radius"
            />
          </div>
        )}

        {shape === "triangle" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Side A
              </label>
              <input
                type="number"
                step="any"
                value={sideA}
                onChange={(e) => setSideA(e.target.value)}
                className="calc-input"
                placeholder="Side A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Side B
              </label>
              <input
                type="number"
                step="any"
                value={sideB}
                onChange={(e) => setSideB(e.target.value)}
                className="calc-input"
                placeholder="Side B"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Side C
              </label>
              <input
                type="number"
                step="any"
                value={sideC}
                onChange={(e) => setSideC(e.target.value)}
                className="calc-input"
                placeholder="Side C"
              />
            </div>
          </div>
        )}

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Perimeter
        </button>

        {result && (
          <div className="result-box text-center">
            <div className="text-sm text-gray-600 mb-1">Perimeter</div>
            <div className="text-3xl font-bold text-green-700">{result}</div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Perimeter Calculator</h3>
          <p>Calculate the perimeter of various shapes including squares, rectangles, circles (circumference), and triangles.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
