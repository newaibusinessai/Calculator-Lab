"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("volume-calculator")!;

export default function VolumeCalculator() {
  const [shape, setShape] = useState("sphere");
  const [sphereR, setSphereR] = useState("");
  const [cubeSide, setCubeSide] = useState("");
  const [cylR, setCylR] = useState("");
  const [cylH, setCylH] = useState("");
  const [coneR, setConeR] = useState("");
  const [coneH, setConeH] = useState("");
  const [rectL, setRectL] = useState("");
  const [rectW, setRectW] = useState("");
  const [rectH, setRectH] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    let vol = 0;
    if (shape === "sphere") {
      const r = parseFloat(sphereR);
      if (isNaN(r) || r <= 0) { alert("Invalid radius"); return; }
      vol = (4/3) * Math.PI * r * r * r;
    } else if (shape === "cube") {
      const s = parseFloat(cubeSide);
      if (isNaN(s) || s <= 0) { alert("Invalid side"); return; }
      vol = s * s * s;
    } else if (shape === "cylinder") {
      const r = parseFloat(cylR), h = parseFloat(cylH);
      if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) { alert("Invalid values"); return; }
      vol = Math.PI * r * r * h;
    } else if (shape === "cone") {
      const r = parseFloat(coneR), h = parseFloat(coneH);
      if (isNaN(r) || isNaN(h) || r <= 0 || h <= 0) { alert("Invalid values"); return; }
      vol = (1/3) * Math.PI * r * r * h;
    } else if (shape === "rectangular") {
      const l = parseFloat(rectL), w = parseFloat(rectW), h = parseFloat(rectH);
      if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) { alert("Invalid values"); return; }
      vol = l * w * h;
    }
    setResult(vol);
  };

  const getButtonClass = (s: string) => {
    return `calc-btn ${shape === s ? "calc-btn-primary" : "calc-btn-secondary"}`;
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Sphere: V = (4/3)πr³ | Cube: V = s³ | Cylinder: V = πr²h | Cone: V = (1/3)πr²h | Rectangular Prism: V = l×w×h"
      faqs={[
        { question: "What is volume?", answer: "Volume measures the amount of three-dimensional space occupied by an object, expressed in cubic units (e.g., cubic meters, cubic feet)." },
        { question: "Why is the cone volume 1/3 of a cylinder?", answer: "A cone with the same base and height as a cylinder occupies exactly one-third of the cylinder's volume. This relationship can be proven using calculus or by filling a cone with water three times to fill a cylinder." },
        { question: "How is sphere volume derived?", answer: "The sphere volume formula V = (4/3)πr³ is derived using integral calculus by rotating a circle around its diameter. The 4/3 factor comes from this integration." },
        { question: "What's the difference between volume and surface area?", answer: "Volume measures the space inside a 3D object (cubic units), while surface area measures the total area of all outer surfaces (square units)." }
      ]}
      howTo={[
        "Select the 3D shape you want to calculate volume for (sphere, cube, cylinder, cone, or rectangular prism)",
        "Enter the required dimensions: radius for sphere, side for cube, radius and height for cylinder/cone, or length, width, and height for rectangular prism",
        "Click Calculate to compute the volume in cubic units",
        "The result shows the volume based on the formula specific to your selected shape"
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setShape("sphere"); setResult(null); }} className={getButtonClass("sphere")}>Sphere</button>
          <button onClick={() => { setShape("cube"); setResult(null); }} className={getButtonClass("cube")}>Cube</button>
          <button onClick={() => { setShape("cylinder"); setResult(null); }} className={getButtonClass("cylinder")}>Cylinder</button>
          <button onClick={() => { setShape("cone"); setResult(null); }} className={getButtonClass("cone")}>Cone</button>
          <button onClick={() => { setShape("rectangular"); setResult(null); }} className={getButtonClass("rectangular")}>Rect. Prism</button>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          {shape === "sphere" && (
            <div><h3 className="font-semibold mb-3">Sphere</h3>
            <label className="block text-sm mb-1">Radius</label>
            <input type="number" value={sphereR} onChange={(e) => setSphereR(e.target.value)} className="calc-input w-full" step="any" />
            <p className="text-xs text-gray-500 mt-1">V = (4/3)πr³</p></div>
          )}
          {shape === "cube" && (
            <div><h3 className="font-semibold mb-3">Cube</h3>
            <label className="block text-sm mb-1">Side Length</label>
            <input type="number" value={cubeSide} onChange={(e) => setCubeSide(e.target.value)} className="calc-input w-full" step="any" />
            <p className="text-xs text-gray-500 mt-1">V = s³</p></div>
          )}
          {shape === "cylinder" && (
            <div><h3 className="font-semibold mb-3">Cylinder</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm mb-1">Radius</label><input type="number" value={cylR} onChange={(e) => setCylR(e.target.value)} className="calc-input w-full" step="any" /></div>
              <div><label className="block text-sm mb-1">Height</label><input type="number" value={cylH} onChange={(e) => setCylH(e.target.value)} className="calc-input w-full" step="any" /></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">V = πr²h</p></div>
          )}
          {shape === "cone" && (
            <div><h3 className="font-semibold mb-3">Cone</h3>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm mb-1">Radius</label><input type="number" value={coneR} onChange={(e) => setConeR(e.target.value)} className="calc-input w-full" step="any" /></div>
              <div><label className="block text-sm mb-1">Height</label><input type="number" value={coneH} onChange={(e) => setConeH(e.target.value)} className="calc-input w-full" step="any" /></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">V = (1/3)πr²h</p></div>
          )}
          {shape === "rectangular" && (
            <div><h3 className="font-semibold mb-3">Rectangular Prism</h3>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-sm mb-1">Length</label><input type="number" value={rectL} onChange={(e) => setRectL(e.target.value)} className="calc-input w-full" step="any" /></div>
              <div><label className="block text-sm mb-1">Width</label><input type="number" value={rectW} onChange={(e) => setRectW(e.target.value)} className="calc-input w-full" step="any" /></div>
              <div><label className="block text-sm mb-1">Height</label><input type="number" value={rectH} onChange={(e) => setRectH(e.target.value)} className="calc-input w-full" step="any" /></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">V = l × w × h</p></div>
          )}
          <button onClick={calculate} className="calc-btn calc-btn-primary w-full mt-4">Calculate</button>
        </div>
        {result !== null && (
          <div className="result-box">
            <p className="text-gray-600">Volume:</p>
            <p className="result-value">{result.toFixed(4)} cubic units</p>
          </div>
        )}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Volume Formulas</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Sphere: V = (4/3)πr³</li>
            <li>Cube: V = s³</li>
            <li>Cylinder: V = πr²h</li>
            <li>Cone: V = (1/3)πr²h</li>
            <li>Rect. Prism: V = l × w × h</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
