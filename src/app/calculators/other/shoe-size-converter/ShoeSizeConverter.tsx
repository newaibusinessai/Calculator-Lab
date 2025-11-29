"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("shoe-size-converter")!;

export default function ShoeSizeConverter() {
  const [gender, setGender] = useState<'men' | 'women'>('men');
  const [fromSystem, setFromSystem] = useState<'US' | 'UK' | 'EU'>('US');
  const [size, setSize] = useState("");
  const [result, setResult] = useState<{
    us: number;
    uk: number;
    eu: number;
  } | null>(null);

  const calculate = () => {
    const sizeNum = parseFloat(size);

    if (isNaN(sizeNum) || sizeNum <= 0) {
      alert("Please enter a valid shoe size");
      return;
    }

    let usSize: number;

    // Convert input to US size first
    if (fromSystem === 'US') {
      usSize = sizeNum;
    } else if (fromSystem === 'UK') {
      usSize = gender === 'men' ? sizeNum + 1 : sizeNum + 2;
    } else { // EU
      usSize = gender === 'men' ? (sizeNum - 33) : (sizeNum - 30);
    }

    // Convert US size to other systems
    const ukSize = gender === 'men' ? usSize - 1 : usSize - 2;
    const euSize = gender === 'men' ? usSize + 33 : usSize + 30;

    setResult({
      us: usSize,
      uk: ukSize,
      eu: euSize
    });
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setGender('men')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                gender === 'men'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setGender('women')}
              className={`py-2 px-4 rounded-lg font-medium transition ${
                gender === 'women'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Women
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Size System
          </label>
          <select
            value={fromSystem}
            onChange={(e) => setFromSystem(e.target.value as 'US' | 'UK' | 'EU')}
            className="calc-input"
          >
            <option value="US">US</option>
            <option value="UK">UK</option>
            <option value="EU">EU</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Shoe Size
          </label>
          <input
            type="number"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="calc-input"
            placeholder="9"
            step="0.5"
          />
        </div>

        <button onClick={calculate} className="calc-btn calc-btn-primary w-full">
          Convert Size
        </button>

        {result && (
          <div className="result-box">
            <div className="text-sm text-gray-600 mb-3 text-center">
              {gender === 'men' ? "Men's" : "Women's"} Shoe Size Conversions
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">US:</span>
                <span className="text-2xl font-bold text-green-700">
                  {result.us.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">UK:</span>
                <span className="text-2xl font-bold text-green-700">
                  {result.uk.toFixed(1)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold text-gray-700">EU:</span>
                <span className="text-2xl font-bold text-green-700">
                  {result.eu.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Shoe Size Converter</h3>
          <p>Convert shoe sizes between US, UK, and EU sizing systems. Select your gender and input size system for accurate conversions.</p>
          <p className="mt-2 text-xs">Note: Sizes may vary slightly between brands. Always try shoes on when possible.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
