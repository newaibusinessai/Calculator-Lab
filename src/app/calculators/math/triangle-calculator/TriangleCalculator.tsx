"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("triangle-calculator")!;

export default function TriangleCalculator() {
  const [mode, setMode] = useState<"SSS" | "SAS" | "ASA">("SSS");
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [sideC, setSideC] = useState("");
  const [side1, setSide1] = useState("");
  const [angle1, setAngle1] = useState("");
  const [side2, setSide2] = useState("");
  const [angleA, setAngleA] = useState("");
  const [sideS, setSideS] = useState("");
  const [angleB, setAngleB] = useState("");
  const [results, setResults] = useState<any>(null);

  const calculateSSS = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      alert("Please enter valid positive numbers");
      return;
    }
    if (a + b <= c || a + c <= b || b + c <= a) {
      alert("Sides cannot form a triangle");
      return;
    }
    const angleArad = Math.acos((b * b + c * c - a * a) / (2 * b * c));
    const angleBrad = Math.acos((a * a + c * c - b * b) / (2 * a * c));
    const angleCrad = Math.acos((a * a + b * b - c * c) / (2 * a * b));
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    setResults({
      area, perimeter: a + b + c,
      angleA: angleArad * 180 / Math.PI,
      angleB: angleBrad * 180 / Math.PI,
      angleC: angleCrad * 180 / Math.PI,
      sideA: a, sideB: b, sideC: c
    });
  };

  const calculateSAS = () => {
    const a = parseFloat(side1);
    const angleC = parseFloat(angle1);
    const b = parseFloat(side2);
    if (isNaN(a) || isNaN(b) || isNaN(angleC) || a <= 0 || b <= 0 || angleC <= 0 || angleC >= 180) {
      alert("Please enter valid values");
      return;
    }
    const angleCrad = angleC * Math.PI / 180;
    const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(angleCrad));
    const angleArad = Math.acos((b * b + c * c - a * a) / (2 * b * c));
    const angleBrad = Math.acos((a * a + c * c - b * b) / (2 * a * c));
    const area = 0.5 * a * b * Math.sin(angleCrad);
    setResults({
      area, perimeter: a + b + c,
      angleA: angleArad * 180 / Math.PI,
      angleB: angleBrad * 180 / Math.PI,
      angleC: angleC,
      sideA: a, sideB: b, sideC: c
    });
  };

  const calculateASA = () => {
    const angleAVal = parseFloat(angleA);
    const c = parseFloat(sideS);
    const angleBVal = parseFloat(angleB);
    if (isNaN(angleAVal) || isNaN(c) || isNaN(angleBVal) || c <= 0 || angleAVal + angleBVal >= 180) {
      alert("Invalid values");
      return;
    }
    const angleCVal = 180 - angleAVal - angleBVal;
    const angleArad = angleAVal * Math.PI / 180;
    const angleBrad = angleBVal * Math.PI / 180;
    const angleCrad = angleCVal * Math.PI / 180;
    const a = c * Math.sin(angleArad) / Math.sin(angleCrad);
    const b = c * Math.sin(angleBrad) / Math.sin(angleCrad);
    const area = 0.5 * a * b * Math.sin(angleCrad);
    setResults({
      area, perimeter: a + b + c,
      angleA: angleAVal, angleB: angleBVal, angleC: angleCVal,
      sideA: a, sideB: b, sideC: c
    });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="SSS: Uses Heron's formula A = √[s(s-a)(s-b)(s-c)] where s = (a+b+c)/2. Angles found using Law of Cosines: cos(A) = (b²+c²-a²)/(2bc). SAS: A = (1/2)ab·sin(C), then use Law of Cosines for third side. ASA: Uses Law of Sines: a/sin(A) = b/sin(B) = c/sin(C)."
      faqs={[
        { question: "What is the triangle inequality theorem?", answer: "The sum of any two sides of a triangle must be greater than the third side. This ensures the three sides can actually form a triangle." },
        { question: "What's the difference between SSS, SAS, and ASA?", answer: "SSS (Side-Side-Side) uses three sides, SAS (Side-Angle-Side) uses two sides with the included angle between them, and ASA (Angle-Side-Angle) uses two angles with the included side between them." },
        { question: "Why do angles always sum to 180 degrees?", answer: "This is a fundamental property of Euclidean geometry. The internal angles of any triangle in a flat plane always add up to exactly 180 degrees." },
        { question: "What is Heron's formula?", answer: "Heron's formula calculates triangle area using only the three side lengths: A = √[s(s-a)(s-b)(s-c)], where s is the semi-perimeter (a+b+c)/2." }
      ]}
      howTo={[
        "Select the calculation mode (SSS, SAS, or ASA) based on what information you know about the triangle",
        "Enter the known values: three sides for SSS, two sides and the included angle for SAS, or two angles and the included side for ASA",
        "Click Calculate to compute all triangle properties including area, perimeter, all sides, and all angles",
        "Verify the triangle inequality holds - the sum of any two sides must exceed the third side"
      ]}
    >
      <div className="space-y-6">
        <div className="flex gap-2">
          <button onClick={() => { setMode("SSS"); setResults(null); }} className={`calc-btn ${mode === "SSS" ? "calc-btn-primary" : "calc-btn-secondary"}`}>SSS</button>
          <button onClick={() => { setMode("SAS"); setResults(null); }} className={`calc-btn ${mode === "SAS" ? "calc-btn-primary" : "calc-btn-secondary"}`}>SAS</button>
          <button onClick={() => { setMode("ASA"); setResults(null); }} className={`calc-btn ${mode === "ASA" ? "calc-btn-primary" : "calc-btn-secondary"}`}>ASA</button>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          {mode === "SSS" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 mb-4">Three Sides</h3>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Side a</label><input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} className="calc-input w-full" step="any" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Side b</label><input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} className="calc-input w-full" step="any" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Side c</label><input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} className="calc-input w-full" step="any" /></div>
              </div>
              <button onClick={calculateSSS} className="calc-btn calc-btn-primary w-full mt-4">Calculate</button>
            </div>
          )}
          {mode === "SAS" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 mb-4">Two Sides and Angle</h3>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Side a</label><input type="number" value={side1} onChange={(e) => setSide1(e.target.value)} className="calc-input w-full" step="any" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Angle C (°)</label><input type="number" value={angle1} onChange={(e) => setAngle1(e.target.value)} className="calc-input w-full" step="any" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Side b</label><input type="number" value={side2} onChange={(e) => setSide2(e.target.value)} className="calc-input w-full" step="any" /></div>
              </div>
              <button onClick={calculateSAS} className="calc-btn calc-btn-primary w-full mt-4">Calculate</button>
            </div>
          )}
          {mode === "ASA" && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-800 mb-4">Two Angles and Side</h3>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Angle A (°)</label><input type="number" value={angleA} onChange={(e) => setAngleA(e.target.value)} className="calc-input w-full" step="any" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Side c</label><input type="number" value={sideS} onChange={(e) => setSideS(e.target.value)} className="calc-input w-full" step="any" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Angle B (°)</label><input type="number" value={angleB} onChange={(e) => setAngleB(e.target.value)} className="calc-input w-full" step="any" /></div>
              </div>
              <button onClick={calculateASA} className="calc-btn calc-btn-primary w-full mt-4">Calculate</button>
            </div>
          )}
        </div>
        {results && (
          <div className="result-box space-y-3">
            <h3 className="font-semibold text-gray-800">Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-gray-600">Area:</p><p className="result-value">{results.area.toFixed(4)} sq units</p></div>
              <div><p className="text-gray-600">Perimeter:</p><p className="result-value">{results.perimeter.toFixed(4)} units</p></div>
              <div><p className="text-gray-600">Sides:</p><p className="result-value">a={results.sideA.toFixed(2)}, b={results.sideB.toFixed(2)}, c={results.sideC.toFixed(2)}</p></div>
              <div><p className="text-gray-600">Angles:</p><p className="result-value">A={results.angleA.toFixed(2)}°, B={results.angleB.toFixed(2)}°, C={results.angleC.toFixed(2)}°</p></div>
            </div>
          </div>
        )}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Triangle Calculator</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>SSS</strong>: Calculate from 3 sides</li>
            <li><strong>SAS</strong>: Calculate from 2 sides + included angle</li>
            <li><strong>ASA</strong>: Calculate from 2 angles + included side</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}