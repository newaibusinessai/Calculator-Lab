"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("log-calculator")!;

export default function LogCalculator() {
  const [value, setValue] = useState("");
  const [base, setBase] = useState("10");
  const [results, setResults] = useState<any>(null);

  const calculate = () => {
    const val = parseFloat(value);
    const baseVal = parseFloat(base);

    if (isNaN(val) || isNaN(baseVal)) {
      alert("Please enter valid numbers");
      return;
    }

    if (val <= 0) {
      alert("Logarithm is only defined for positive numbers");
      return;
    }

    if (baseVal <= 0 || baseVal === 1) {
      alert("Base must be positive and not equal to 1");
      return;
    }

    // Calculate various logarithms
    const logBase = Math.log(val) / Math.log(baseVal);
    const ln = Math.log(val); // Natural log (base e)
    const log10 = Math.log10(val); // Common log (base 10)
    const log2 = Math.log2(val); // Binary log (base 2)

    // Calculate antilog (inverse)
    const antilog = Math.pow(baseVal, logBase);

    setResults({
      logBase,
      ln,
      log10,
      log2,
      antilog,
      value: val,
      base: baseVal
    });
  };

  const setCommonBase = (baseValue: string) => {
    setBase(baseValue);
    setResults(null);
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="log_b(x) = ln(x) / ln(b) where ln is natural logarithm (base e). Common logarithms: log₁₀(x), ln(x) = log_e(x), log₂(x). Antilog: b^(log_b(x)) = x. Properties: log(xy) = log(x) + log(y), log(x/y) = log(x) - log(y), log(x^n) = n·log(x)"
      faqs={[
        { question: "What is a logarithm?", answer: "A logarithm answers the question: 'To what power must we raise the base to get this number?' For example, log₁₀(100) = 2 because 10² = 100." },
        { question: "What's the difference between ln and log?", answer: "ln (natural log) uses base e (≈2.71828), commonly used in calculus and science. log typically means log₁₀ (common log, base 10), often used in engineering and pH calculations. Both follow the same logarithm rules." },
        { question: "Why can't we take the log of zero or negative numbers?", answer: "No positive base raised to any power can equal zero or a negative number, so logarithms of non-positive numbers are undefined in real numbers (though they exist in complex numbers)." },
        { question: "What is an antilog?", answer: "Antilog is the inverse operation of logarithm. If log_b(x) = y, then antilog_b(y) = x. It's equivalent to b^y. For example, if log₁₀(100) = 2, then antilog₁₀(2) = 100." }
      ]}
      howTo={[
        "Enter the number you want to find the logarithm of (must be positive)",
        "Select or enter the base: use quick buttons for common bases (2, e, 10) or enter a custom base",
        "Click Calculate to compute the logarithm and see results in multiple bases",
        "The calculator shows log with your chosen base, plus natural log (ln), common log (log₁₀), binary log (log₂), and the antilog"
      ]}
    >
      <div className="space-y-6">
        <div className="p-4 border border-gray-200 rounded-lg">
          <h3 className="font-semibold text-gray-800 mb-4">Logarithm Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value (x)
              </label>
              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="calc-input w-full"
                placeholder="Enter a positive number"
                step="any"
              />
              <p className="text-xs text-gray-500 mt-1">Must be greater than 0</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base (b)
              </label>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setCommonBase("2")}
                  className={`calc-btn ${base === "2" ? "calc-btn-primary" : "calc-btn-secondary"} flex-1`}
                >
                  Base 2
                </button>
                <button
                  onClick={() => setCommonBase(Math.E.toString())}
                  className={`calc-btn ${base === Math.E.toString() ? "calc-btn-primary" : "calc-btn-secondary"} flex-1`}
                >
                  Base e
                </button>
                <button
                  onClick={() => setCommonBase("10")}
                  className={`calc-btn ${base === "10" ? "calc-btn-primary" : "calc-btn-secondary"} flex-1`}
                >
                  Base 10
                </button>
              </div>
              <input
                type="number"
                value={base}
                onChange={(e) => setBase(e.target.value)}
                className="calc-input w-full"
                placeholder="Or enter custom base"
                step="any"
              />
              <p className="text-xs text-gray-500 mt-1">Must be positive and ≠ 1</p>
            </div>
          </div>
          <button onClick={calculate} className="calc-btn calc-btn-primary w-full mt-4">
            Calculate Logarithm
          </button>
        </div>

        {results && (
          <div className="result-box space-y-4">
            <h3 className="font-semibold text-gray-800">Results</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded col-span-full">
                <p className="text-sm text-gray-600 mb-1">
                  log<sub>{results.base === Math.E ? 'e' : results.base.toFixed(2)}</sub>({results.value})
                </p>
                <p className="result-value text-2xl font-bold text-blue-900">
                  {results.logBase.toFixed(6)}
                </p>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Natural Log (ln):</p>
                <p className="result-value">{results.ln.toFixed(6)}</p>
                <p className="text-xs text-gray-500 mt-1">Base e ≈ 2.71828</p>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Common Log (log₁₀):</p>
                <p className="result-value">{results.log10.toFixed(6)}</p>
                <p className="text-xs text-gray-500 mt-1">Base 10</p>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Binary Log (log₂):</p>
                <p className="result-value">{results.log2.toFixed(6)}</p>
                <p className="text-xs text-gray-500 mt-1">Base 2</p>
              </div>

              <div className="p-3 bg-gray-50 rounded">
                <p className="text-sm text-gray-600">Antilog:</p>
                <p className="result-value">{results.antilog.toFixed(6)}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {results.base.toFixed(2)}^{results.logBase.toFixed(6)} ≈ {results.value}
                </p>
              </div>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-800">
                <strong>Verification:</strong> {results.base.toFixed(2)}
                <sup>{results.logBase.toFixed(6)}</sup> = {results.antilog.toFixed(6)} ≈ {results.value}
              </p>
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Common Applications</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Base 10:</strong> pH scale, decibels, Richter scale</li>
            <li><strong>Base e:</strong> Exponential growth/decay, compound interest</li>
            <li><strong>Base 2:</strong> Computer science, information theory, binary</li>
          </ul>
          <h3 className="font-semibold text-gray-800 mb-2 mt-4">Logarithm Rules</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>log(xy) = log(x) + log(y)</li>
            <li>log(x/y) = log(x) - log(y)</li>
            <li>log(x^n) = n · log(x)</li>
            <li>log_b(b) = 1, log_b(1) = 0</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
