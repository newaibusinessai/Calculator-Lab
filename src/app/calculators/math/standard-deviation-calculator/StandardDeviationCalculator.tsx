"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("standard-deviation-calculator")!;

export default function StandardDeviationCalculator() {
  const [numbers, setNumbers] = useState("");
  const [population, setPopulation] = useState(true);
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const nums = numbers.split(/[\s,;]+/).map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) { alert("Enter valid numbers"); return; }
    const mean = nums.reduce((a,b) => a+b, 0) / nums.length;
    const sqDiffs = nums.map(n => (n - mean) ** 2);
    const variance = sqDiffs.reduce((a,b) => a+b, 0) / (population ? nums.length : nums.length - 1);
    const stdDev = Math.sqrt(variance);
    setResults({ count: nums.length, mean, variance, stdDev, min: Math.min(...nums), max: Math.max(...nums), range: Math.max(...nums) - Math.min(...nums) });
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Population: σ = √[Σ(xi - μ)² / N] | Sample: s = √[Σ(xi - x̄)² / (n-1)] | Variance is the square of standard deviation. Mean μ (or x̄) = Σxi / N"
      faqs={[
        { question: "What's the difference between population and sample standard deviation?", answer: "Population standard deviation (σ) uses N in the denominator and applies when you have data for the entire population. Sample standard deviation (s) uses N-1 (Bessel's correction) and applies when you have a sample from a larger population." },
        { question: "What does standard deviation tell us?", answer: "Standard deviation measures how spread out data points are from the mean. A low standard deviation means data points are close to the mean, while a high standard deviation means they're more spread out." },
        { question: "Why use N-1 for sample standard deviation?", answer: "Using N-1 instead of N (called Bessel's correction) provides an unbiased estimate of the population variance. This correction compensates for the fact that sample variance tends to underestimate population variance." },
        { question: "What is variance?", answer: "Variance is the average of squared differences from the mean. Standard deviation is simply the square root of variance, making it easier to interpret since it's in the same units as the original data." }
      ]}
      howTo={[
        "Enter your dataset as a list of numbers separated by commas, spaces, or semicolons",
        "Select whether your data represents an entire population or a sample from a larger population",
        "Click Calculate to compute mean, variance, standard deviation, and range",
        "Use population (σ) if you have all data points, or sample (s) if your data is a subset of a larger population"
      ]}
    >
      <div className="space-y-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold mb-3">Enter Numbers</h3>
          <textarea value={numbers} onChange={(e) => setNumbers(e.target.value)} className="calc-input w-full h-24" placeholder="1, 2, 3, 4, 5" />
          <div className="flex gap-4 mt-3">
            <label className="flex items-center gap-2">
              <input type="radio" checked={population} onChange={() => setPopulation(true)} />
              <span className="text-sm">Population (σ)</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={!population} onChange={() => setPopulation(false)} />
              <span className="text-sm">Sample (s)</span>
            </label>
          </div>
          <button onClick={calculate} className="calc-btn calc-btn-primary w-full mt-4">Calculate</button>
        </div>
        {results && (
          <div className="result-box grid grid-cols-2 gap-4">
            <div><p className="text-gray-600">Count:</p><p className="result-value">{results.count}</p></div>
            <div><p className="text-gray-600">Mean:</p><p className="result-value">{results.mean.toFixed(4)}</p></div>
            <div><p className="text-gray-600">Variance:</p><p className="result-value">{results.variance.toFixed(4)}</p></div>
            <div><p className="text-gray-600">Std Dev:</p><p className="result-value">{results.stdDev.toFixed(4)}</p></div>
            <div><p className="text-gray-600">Min:</p><p className="result-value">{results.min}</p></div>
            <div><p className="text-gray-600">Max:</p><p className="result-value">{results.max}</p></div>
          </div>
        )}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Standard Deviation</h3>
          <ul className="list-disc list-inside">
            <li>Population (σ): divides by N</li>
            <li>Sample (s): divides by N-1</li>
            <li>Measures data spread</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
