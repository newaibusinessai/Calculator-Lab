"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("quadratic-formula-calculator")!;

export default function QuadraticFormulaCalculator() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);

    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal)) {
      alert("Please enter valid numbers for all coefficients");
      return;
    }

    if (aVal === 0) {
      alert("Coefficient 'a' cannot be zero (this would not be a quadratic equation)");
      return;
    }

    const discriminant = bVal * bVal - 4 * aVal * cVal;
    const vertex_x = -bVal / (2 * aVal);
    const vertex_y = aVal * vertex_x * vertex_x + bVal * vertex_x + cVal;

    let x1, x2, solutionType;

    if (discriminant > 0) {
      x1 = (-bVal + Math.sqrt(discriminant)) / (2 * aVal);
      x2 = (-bVal - Math.sqrt(discriminant)) / (2 * aVal);
      solutionType = "Two real solutions";
    } else if (discriminant === 0) {
      x1 = x2 = -bVal / (2 * aVal);
      solutionType = "One real solution (repeated root)";
    } else {
      const realPart = -bVal / (2 * aVal);
      const imagPart = Math.sqrt(-discriminant) / (2 * aVal);
      x1 = `${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`;
      x2 = `${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`;
      solutionType = "Two complex solutions";
    }

    setResults({
      x1,
      x2,
      discriminant,
      solutionType,
      vertex: { x: vertex_x, y: vertex_y },
      axis: vertex_x,
      opens: aVal > 0 ? "upward" : "downward"
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="For ax² + bx + c = 0: x = [-b ± √(b² - 4ac)] / (2a). Discriminant Δ = b² - 4ac determines solution type: Δ > 0 (two real roots), Δ = 0 (one repeated root), Δ < 0 (two complex roots). Vertex: (-b/2a, f(-b/2a))"
      faqs={[
        { question: "What is the discriminant?", answer: "The discriminant is b² - 4ac. It determines the nature of the roots: positive means two real solutions, zero means one repeated solution, and negative means two complex (imaginary) solutions." },
        { question: "What does it mean when a parabola opens upward or downward?", answer: "When coefficient 'a' is positive, the parabola opens upward (U-shape). When 'a' is negative, it opens downward (∩-shape). This affects whether the vertex is a minimum or maximum point." },
        { question: "What is the vertex of a parabola?", answer: "The vertex is the turning point of the parabola - either the minimum point (if opening upward) or maximum point (if opening downward). It's located at x = -b/(2a)." },
        { question: "Can the quadratic formula be used for all quadratic equations?", answer: "Yes! The quadratic formula works for all quadratic equations where a ≠ 0. It always produces the correct solutions, whether they're real, repeated, or complex numbers." }
      ]}
      howTo={[
        "Write your quadratic equation in standard form: ax² + bx + c = 0",
        "Enter the coefficient 'a' (the number multiplying x²)",
        "Enter the coefficient 'b' (the number multiplying x)",
        "Enter the constant term 'c' (the number without any variable)",
        "Click Calculate to find the solutions and additional properties like vertex and discriminant"
      ]}
    >
      <div className="space-y-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Quadratic Equation: ax² + bx + c = 0</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coefficient a (x²)
              </label>
              <input
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                className="calc-input w-full"
                placeholder="e.g., 1"
                step="any"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Coefficient b (x)
              </label>
              <input
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                className="calc-input w-full"
                placeholder="e.g., -3"
                step="any"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Constant c
              </label>
              <input
                type="number"
                value={c}
                onChange={(e) => setC(e.target.value)}
                className="calc-input w-full"
                placeholder="e.g., 2"
                step="any"
              />
            </div>
          </div>
          <button onClick={calculate} className="calc-btn calc-btn-primary w-full mt-4">
            Solve Quadratic Equation
          </button>
        </div>

        {results && (
          <div className="result-box space-y-4">
            <h3 className="font-semibold text-gray-800">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Solution Type:</p>
                <p className="result-value text-sm">{results.solutionType}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Discriminant (Δ):</p>
                <p className="result-value text-sm">{results.discriminant.toFixed(4)}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">x₁ =</p>
                <p className="result-value text-sm">{typeof results.x1 === 'number' ? results.x1.toFixed(4) : results.x1}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">x₂ =</p>
                <p className="result-value text-sm">{typeof results.x2 === 'number' ? results.x2.toFixed(4) : results.x2}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Vertex:</p>
                <p className="result-value text-sm">({results.vertex.x.toFixed(4)}, {results.vertex.y.toFixed(4)})</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Parabola Opens:</p>
                <p className="result-value text-sm capitalize">{results.opens}</p>
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded">
              <p className="text-sm text-blue-800">
                <strong>Axis of Symmetry:</strong> x = {results.axis.toFixed(4)}
              </p>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Example</h3>
          <p className="mb-2">For the equation x² - 5x + 6 = 0:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>a = 1, b = -5, c = 6</li>
            <li>Discriminant = (-5)² - 4(1)(6) = 25 - 24 = 1</li>
            <li>x = [5 ± √1] / 2 = [5 ± 1] / 2</li>
            <li>Solutions: x₁ = 3, x₂ = 2</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
