"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("slope-calculator")!;

export default function SlopeCalculator() {
  const [x1, setX1] = useState("");
  const [y1, setY1] = useState("");
  const [x2, setX2] = useState("");
  const [y2, setY2] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
      alert("Please enter valid numbers for all coordinates");
      return;
    }

    if (x1Val === x2Val && y1Val === y2Val) {
      alert("The two points cannot be the same");
      return;
    }

    const deltaX = x2Val - x1Val;
    const deltaY = y2Val - y1Val;

    let slope, slopeType, angle, perpSlope;

    if (deltaX === 0) {
      slope = "undefined";
      slopeType = "Vertical line";
      angle = 90;
      perpSlope = 0;
    } else {
      slope = deltaY / deltaX;
      angle = Math.atan(slope) * (180 / Math.PI);

      if (deltaY === 0) {
        slopeType = "Horizontal line";
        perpSlope = "undefined";
      } else {
        slopeType = slope > 0 ? "Positive slope (rising)" : "Negative slope (falling)";
        perpSlope = -1 / slope;
      }
    }

    // Calculate y-intercept (b) using point-slope form: y = mx + b
    let yIntercept;
    if (typeof slope === "number") {
      yIntercept = y1Val - slope * x1Val;
    } else {
      yIntercept = "N/A";
    }

    // Distance between points
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Midpoint
    const midpoint = {
      x: (x1Val + x2Val) / 2,
      y: (y1Val + y2Val) / 2
    };

    setResults({
      slope,
      slopeType,
      angle,
      perpSlope,
      yIntercept,
      distance,
      midpoint,
      deltaX,
      deltaY
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Slope m = (y₂ - y₁) / (x₂ - x₁) = Δy / Δx (rise over run). Angle θ = arctan(m). Perpendicular slope = -1/m. Line equation: y = mx + b where b = y₁ - mx₁"
      faqs={[
        { question: "What does slope represent?", answer: "Slope measures the steepness and direction of a line. It's the ratio of vertical change (rise) to horizontal change (run). Positive slope means the line rises from left to right, negative means it falls." },
        { question: "What is an undefined slope?", answer: "An undefined slope occurs when the line is vertical (x₂ = x₁). Division by zero is undefined, so we say the slope is undefined. The line equation is x = constant." },
        { question: "How do I find the perpendicular slope?", answer: "Perpendicular lines have slopes that are negative reciprocals. If one line has slope m, the perpendicular line has slope -1/m. For example, if m = 2, the perpendicular slope is -1/2." },
        { question: "What is the y-intercept?", answer: "The y-intercept (b) is where the line crosses the y-axis (when x = 0). Using point-slope form with the calculated slope and one point: b = y - mx." }
      ]}
      howTo={[
        "Identify two points on the line: Point 1 (x₁, y₁) and Point 2 (x₂, y₂)",
        "Enter the coordinates of the first point in the x₁ and y₁ fields",
        "Enter the coordinates of the second point in the x₂ and y₂ fields",
        "Click Calculate to find the slope, angle, perpendicular slope, y-intercept, distance, and midpoint",
        "The calculator also shows whether the line is rising, falling, horizontal, or vertical"
      ]}
    >
      <div className="space-y-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Enter Two Points</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Point 1 (x₁, y₁)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">x₁</label>
                  <input
                    type="number"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                    className="calc-input w-full"
                    placeholder="e.g., 2"
                    step="any"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">y₁</label>
                  <input
                    type="number"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                    className="calc-input w-full"
                    placeholder="e.g., 3"
                    step="any"
                  />
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Point 2 (x₂, y₂)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">x₂</label>
                  <input
                    type="number"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                    className="calc-input w-full"
                    placeholder="e.g., 5"
                    step="any"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">y₂</label>
                  <input
                    type="number"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                    className="calc-input w-full"
                    placeholder="e.g., 9"
                    step="any"
                  />
                </div>
              </div>
            </div>
          </div>
          <button onClick={calculate} className="calc-btn calc-btn-primary w-full mt-4">
            Calculate Slope
          </button>
        </div>

        {results && (
          <div className="result-box space-y-4">
            <h3 className="font-semibold text-gray-800">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Slope (m):</p>
                <p className="result-value text-lg font-bold">
                  {typeof results.slope === "number" ? results.slope.toFixed(4) : results.slope}
                </p>
                <p className="text-xs text-gray-500 mt-1">{results.slopeType}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Angle with x-axis:</p>
                <p className="result-value text-lg font-bold">{results.angle.toFixed(2)}°</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Perpendicular Slope:</p>
                <p className="result-value text-sm">
                  {typeof results.perpSlope === "number" ? results.perpSlope.toFixed(4) : results.perpSlope}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Y-Intercept (b):</p>
                <p className="result-value text-sm">
                  {typeof results.yIntercept === "number" ? results.yIntercept.toFixed(4) : results.yIntercept}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Distance:</p>
                <p className="result-value text-sm">{results.distance.toFixed(4)} units</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Midpoint:</p>
                <p className="result-value text-sm">
                  ({results.midpoint.x.toFixed(4)}, {results.midpoint.y.toFixed(4)})
                </p>
              </div>
            </div>
            {typeof results.slope === "number" && typeof results.yIntercept === "number" && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">
                  <strong>Line Equation:</strong> y = {results.slope.toFixed(4)}x {results.yIntercept >= 0 ? '+' : ''} {results.yIntercept.toFixed(4)}
                </p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Rise (Δy):</p>
                <p className="font-medium">{results.deltaY.toFixed(4)}</p>
              </div>
              <div>
                <p className="text-gray-600">Run (Δx):</p>
                <p className="font-medium">{results.deltaX.toFixed(4)}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Example</h3>
          <p className="mb-2">Find the slope between points (1, 2) and (4, 8):</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Slope = (8 - 2) / (4 - 1) = 6 / 3 = 2</li>
            <li>For every 1 unit right, the line goes up 2 units</li>
            <li>Perpendicular slope = -1/2 = -0.5</li>
            <li>Line equation: y = 2x + 0</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
