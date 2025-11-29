"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("tile-calculator")!;

export default function TileCalculator() {
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [tileLength, setTileLength] = useState("12");
  const [tileWidth, setTileWidth] = useState("12");
  const [wasteFactor, setWasteFactor] = useState("10");
  const [result, setResult] = useState<{
    tilesNeeded: number;
    roomArea: number;
    tileArea: number;
    tilesWithWaste: number;
  } | null>(null);

  const calculate = () => {
    const rLength = parseFloat(roomLength);
    const rWidth = parseFloat(roomWidth);
    const tLength = parseFloat(tileLength);
    const tWidth = parseFloat(tileWidth);
    const waste = parseFloat(wasteFactor);

    if (isNaN(rLength) || isNaN(rWidth) || isNaN(tLength) || isNaN(tWidth) || isNaN(waste)) {
      alert("Please enter valid numbers");
      return;
    }

    if (rLength <= 0 || rWidth <= 0 || tLength <= 0 || tWidth <= 0) {
      alert("All dimensions must be greater than 0");
      return;
    }

    // Calculate areas
    const roomArea = rLength * rWidth;
    const tileArea = (tLength / 12) * (tWidth / 12); // Convert inches to feet

    // Calculate tiles needed
    const tilesNeeded = Math.ceil(roomArea / tileArea);

    // Add waste factor
    const wasteMultiplier = 1 + (waste / 100);
    const tilesWithWaste = Math.ceil(tilesNeeded * wasteMultiplier);

    setResult({
      tilesNeeded,
      roomArea,
      tileArea,
      tilesWithWaste
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Length (ft)
            </label>
            <input
              type="number"
              value={roomLength}
              onChange={(e) => setRoomLength(e.target.value)}
              className="calc-input"
              placeholder="10"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Width (ft)
            </label>
            <input
              type="number"
              value={roomWidth}
              onChange={(e) => setRoomWidth(e.target.value)}
              className="calc-input"
              placeholder="12"
              step="0.1"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tile Length (in)
            </label>
            <input
              type="number"
              value={tileLength}
              onChange={(e) => setTileLength(e.target.value)}
              className="calc-input"
              placeholder="12"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tile Width (in)
            </label>
            <input
              type="number"
              value={tileWidth}
              onChange={(e) => setTileWidth(e.target.value)}
              className="calc-input"
              placeholder="12"
              step="0.1"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Waste Factor (%): {wasteFactor}%
          </label>
          <input
            type="range"
            min="0"
            max="25"
            value={wasteFactor}
            onChange={(e) => setWasteFactor(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>25%</span>
          </div>
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Calculate Tiles
        </button>

        {result && (
          <div className="result-box">
            <div className="text-center pb-3 border-b border-gray-200 mb-3">
              <div className="text-sm text-gray-600 mb-1">Tiles Needed (with {wasteFactor}% waste)</div>
              <div className="text-5xl font-bold text-green-700">
                {result.tilesWithWaste}
              </div>
              <div className="text-lg text-gray-600 mt-1">tiles</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Room Area:</span>
                <span className="font-semibold text-gray-800">
                  {result.roomArea.toFixed(2)} sq ft
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Tile Area:</span>
                <span className="font-semibold text-gray-800">
                  {result.tileArea.toFixed(2)} sq ft
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Tiles (no waste):</span>
                <span className="font-semibold text-gray-800">
                  {result.tilesNeeded} tiles
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Tile Calculator</h3>
          <p>Calculate the number of tiles needed for your floor or wall project. Include a waste factor to account for cutting and breakage.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
