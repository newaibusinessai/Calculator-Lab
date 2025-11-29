"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("area-calculator")!;

export default function AreaCalculator() {
  const [shape, setShape] = useState("rectangle");

  // Rectangle/Square
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");

  // Circle
  const [radius, setRadius] = useState("");

  // Triangle
  const [base, setBase] = useState("");
  const [height, setHeight] = useState("");

  // Trapezoid
  const [base1, setBase1] = useState("");
  const [base2, setBase2] = useState("");
  const [trapHeight, setTrapHeight] = useState("");

  // Ellipse
  const [majorAxis, setMajorAxis] = useState("");
  const [minorAxis, setMinorAxis] = useState("");

  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let area = 0;
    let perimeter = 0;
    let formula = "";

    if (shape === "rectangle") {
      const l = parseFloat(length);
      const w = parseFloat(width);
      if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) {
        alert("Please enter valid positive dimensions");
        return;
      }
      area = l * w;
      perimeter = 2 * (l + w);
      formula = `${l} × ${w}`;
    } else if (shape === "square") {
      const s = parseFloat(length);
      if (isNaN(s) || s <= 0) {
        alert("Please enter a valid positive side length");
        return;
      }
      area = s * s;
      perimeter = 4 * s;
      formula = `${s}²`;
    } else if (shape === "circle") {
      const r = parseFloat(radius);
      if (isNaN(r) || r <= 0) {
        alert("Please enter a valid positive radius");
        return;
      }
      area = Math.PI * r * r;
      perimeter = 2 * Math.PI * r;
      formula = `π × ${r}²`;
    } else if (shape === "triangle") {
      const b = parseFloat(base);
      const h = parseFloat(height);
      if (isNaN(b) || isNaN(h) || b <= 0 || h <= 0) {
        alert("Please enter valid positive dimensions");
        return;
      }
      area = 0.5 * b * h;
      formula = `½ × ${b} × ${h}`;
      perimeter = 0; // Can't calculate perimeter without all three sides
    } else if (shape === "trapezoid") {
      const b1 = parseFloat(base1);
      const b2 = parseFloat(base2);
      const h = parseFloat(trapHeight);
      if (isNaN(b1) || isNaN(b2) || isNaN(h) || b1 <= 0 || b2 <= 0 || h <= 0) {
        alert("Please enter valid positive dimensions");
        return;
      }
      area = 0.5 * (b1 + b2) * h;
      formula = `½ × (${b1} + ${b2}) × ${h}`;
      perimeter = 0;
    } else if (shape === "ellipse") {
      const a = parseFloat(majorAxis);
      const b = parseFloat(minorAxis);
      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        alert("Please enter valid positive dimensions");
        return;
      }
      area = Math.PI * a * b;
      perimeter = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));
      formula = `π × ${a} × ${b}`;
    }

    setResult({ area, perimeter, formula, shape });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Rectangle: A = l×w | Square: A = s² | Circle: A = πr² | Triangle: A = ½bh | Trapezoid: A = ½(b₁+b₂)h | Ellipse: A = πab"
      faqs={[
        { question: "What is area?", answer: "Area measures the amount of two-dimensional space inside a shape's boundaries, expressed in square units (e.g., square meters, square feet). It tells you how much surface the shape covers." },
        { question: "Why is the triangle area formula ½bh?", answer: "A triangle is exactly half of a parallelogram with the same base and height. Since a parallelogram's area is base × height, a triangle's area is ½ × base × height." },
        { question: "What's the difference between perimeter and area?", answer: "Perimeter is the distance around the outside of a shape (measured in linear units like meters), while area is the space inside the shape (measured in square units like square meters)." },
        { question: "How do you calculate the area of irregular shapes?", answer: "For irregular shapes, you can divide them into regular shapes (triangles, rectangles, etc.), calculate each area separately, and then add or subtract them as needed." }
      ]}
      howTo={[
        "Select the shape you want to calculate the area for from the available options",
        "Enter the required dimensions for your chosen shape (length, width, radius, base, height, etc.)",
        "Click Calculate to compute the area and perimeter (when applicable)",
        "The result will show the area in square units and the formula used for the calculation"
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setShape("rectangle"); setResult(null); }} className={`calc-btn ${shape === "rectangle" ? "calc-btn-primary" : "calc-btn-secondary"}`}>Rectangle</button>
          <button onClick={() => { setShape("square"); setResult(null); }} className={`calc-btn ${shape === "square" ? "calc-btn-primary" : "calc-btn-secondary"}`}>Square</button>
          <button onClick={() => { setShape("circle"); setResult(null); }} className={`calc-btn ${shape === "circle" ? "calc-btn-primary" : "calc-btn-secondary"}`}>Circle</button>
          <button onClick={() => { setShape("triangle"); setResult(null); }} className={`calc-btn ${shape === "triangle" ? "calc-btn-primary" : "calc-btn-secondary"}`}>Triangle</button>
          <button onClick={() => { setShape("trapezoid"); setResult(null); }} className={`calc-btn ${shape === "trapezoid" ? "calc-btn-primary" : "calc-btn-secondary"}`}>Trapezoid</button>
          <button onClick={() => { setShape("ellipse"); setResult(null); }} className={`calc-btn ${shape === "ellipse" ? "calc-btn-primary" : "calc-btn-secondary"}`}>Ellipse</button>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          {shape === "rectangle" && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Rectangle</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Length</label>
                  <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="calc-input w-full" placeholder="e.g., 10" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                  <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="calc-input w-full" placeholder="e.g., 5" step="any" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Formula: A = length × width</p>
            </div>
          )}

          {shape === "square" && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Square</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Side Length</label>
                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} className="calc-input w-full" placeholder="e.g., 6" step="any" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Formula: A = side²</p>
            </div>
          )}

          {shape === "circle" && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Circle</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Radius</label>
                <input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} className="calc-input w-full" placeholder="e.g., 4" step="any" />
              </div>
              <p className="text-xs text-gray-500 mt-2">Formula: A = πr²</p>
            </div>
          )}

          {shape === "triangle" && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Triangle</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base</label>
                  <input type="number" value={base} onChange={(e) => setBase(e.target.value)} className="calc-input w-full" placeholder="e.g., 8" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="calc-input w-full" placeholder="e.g., 6" step="any" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Formula: A = ½ × base × height</p>
            </div>
          )}

          {shape === "trapezoid" && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Trapezoid</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base 1</label>
                    <input type="number" value={base1} onChange={(e) => setBase1(e.target.value)} className="calc-input w-full" placeholder="e.g., 10" step="any" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Base 2</label>
                    <input type="number" value={base2} onChange={(e) => setBase2(e.target.value)} className="calc-input w-full" placeholder="e.g., 6" step="any" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <input type="number" value={trapHeight} onChange={(e) => setTrapHeight(e.target.value)} className="calc-input w-full" placeholder="e.g., 4" step="any" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Formula: A = ½ × (base₁ + base₂) × height</p>
            </div>
          )}

          {shape === "ellipse" && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Ellipse</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semi-major Axis (a)</label>
                  <input type="number" value={majorAxis} onChange={(e) => setMajorAxis(e.target.value)} className="calc-input w-full" placeholder="e.g., 5" step="any" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semi-minor Axis (b)</label>
                  <input type="number" value={minorAxis} onChange={(e) => setMinorAxis(e.target.value)} className="calc-input w-full" placeholder="e.g., 3" step="any" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Formula: A = π × a × b</p>
            </div>
          )}

          <button onClick={calculate} className="calc-btn calc-btn-primary w-full mt-4">
            Calculate Area
          </button>
        </div>

        {result && (
          <div className="result-box space-y-3">
            <h3 className="font-semibold text-gray-800">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-gray-600 mb-1">Area:</p>
                <p className="result-value text-2xl font-bold text-blue-900">
                  {result.area.toFixed(4)} sq units
                </p>
                <p className="text-xs text-gray-500 mt-1">Formula: {result.formula}</p>
              </div>
              {result.perimeter > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Perimeter:</p>
                  <p className="result-value text-xl font-bold text-green-900">
                    {result.perimeter.toFixed(4)} units
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Common Area Formulas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <ul className="list-disc list-inside space-y-1">
              <li>Rectangle: l × w</li>
              <li>Square: s²</li>
              <li>Circle: πr²</li>
            </ul>
            <ul className="list-disc list-inside space-y-1">
              <li>Triangle: ½bh</li>
              <li>Trapezoid: ½(b₁+b₂)h</li>
              <li>Ellipse: πab</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
