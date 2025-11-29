"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("btu-calculator")!;

export default function BtuCalculator() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [ceilingHeight, setCeilingHeight] = useState("8");
  const [insulation, setInsulation] = useState<'poor' | 'average' | 'good'>('average');
  const [sunExposure, setSunExposure] = useState<'shaded' | 'average' | 'sunny'>('average');
  const [result, setResult] = useState<{
    btu: number;
    squareFeet: number;
    cubicFeet: number;
    tons: number;
  } | null>(null);

  const calculate = () => {
    const length = parseFloat(roomLength);
    const width = parseFloat(roomWidth);
    const height = parseFloat(ceilingHeight);

    if (isNaN(length) || isNaN(width) || isNaN(height)) {
      alert("Please enter valid numbers");
      return;
    }

    if (length <= 0 || width <= 0 || height <= 0) {
      alert("All dimensions must be greater than 0");
      return;
    }

    // Calculate room volume
    const squareFeet = length * width;
    const cubicFeet = squareFeet * height;

    // Base BTU calculation (25-30 BTU per square foot)
    let btu = squareFeet * 25;

    // Adjust for ceiling height
    if (height > 8) {
      btu = btu * (height / 8);
    }

    // Adjust for insulation
    if (insulation === 'poor') {
      btu *= 1.3;
    } else if (insulation === 'good') {
      btu *= 0.9;
    }

    // Adjust for sun exposure
    if (sunExposure === 'shaded') {
      btu *= 0.9;
    } else if (sunExposure === 'sunny') {
      btu *= 1.15;
    }

    // Convert to tons (12,000 BTU = 1 ton)
    const tons = btu / 12000;

    setResult({
      btu: Math.round(btu),
      squareFeet,
      cubicFeet,
      tons
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Length (feet)
            </label>
            <input
              type="number"
              value={roomLength}
              onChange={(e) => setRoomLength(e.target.value)}
              className="calc-input"
              placeholder="20"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width (feet)
            </label>
            <input
              type="number"
              value={roomWidth}
              onChange={(e) => setRoomWidth(e.target.value)}
              className="calc-input"
              placeholder="15"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ceiling Height (feet)
          </label>
          <input
            type="number"
            value={ceilingHeight}
            onChange={(e) => setCeilingHeight(e.target.value)}
            className="calc-input"
            placeholder="8"
            step="0.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insulation Quality
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setInsulation('poor')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                insulation === 'poor'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Poor
            </button>
            <button
              onClick={() => setInsulation('average')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                insulation === 'average'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Average
            </button>
            <button
              onClick={() => setInsulation('good')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                insulation === 'good'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Good
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sun Exposure
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setSunExposure('shaded')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                sunExposure === 'shaded'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Shaded
            </button>
            <button
              onClick={() => setSunExposure('average')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                sunExposure === 'average'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Average
            </button>
            <button
              onClick={() => setSunExposure('sunny')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                sunExposure === 'sunny'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Sunny
            </button>
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate BTU
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">BTU Needed</div>
              <div className="text-4xl font-bold text-green-700">
                {result.btu.toLocaleString()}
              </div>
              <div className="text-lg text-gray-600 mt-1">BTU/hour</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Room Size:</span>
                <span className="font-semibold text-gray-800">
                  {result.squareFeet.toFixed(0)} sq ft
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Room Volume:</span>
                <span className="font-semibold text-gray-800">
                  {result.cubicFeet.toFixed(0)} cu ft
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">AC Tons:</span>
                <span className="font-semibold text-gray-800">
                  {result.tons.toFixed(2)} tons
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About BTU Calculator</h3>
          <p>Calculate the BTU (British Thermal Units) needed to heat or cool a room. Factors include room size, ceiling height, insulation quality, and sun exposure.</p>
          <p className="mt-2 text-xs">Note: 12,000 BTU = 1 ton of cooling capacity. This is an estimate; consult an HVAC professional for precise sizing.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
