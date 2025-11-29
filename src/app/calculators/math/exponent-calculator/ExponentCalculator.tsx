"use client";
import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";
const calculator = getCalculatorBySlug("exponent-calculator")!;
export default function ExponentCalculator() {
  const [base, setBase] = useState("");
  const [exp, setExp] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const calc = () => {
    const x = parseFloat(base), y = parseFloat(exp);
    if (isNaN(x) || isNaN(y)) { alert("Invalid"); return; }
    const result = Math.pow(x, y);
    setResult(result.toString());
  };
  return (
    <CalculatorLayout
      calculator={calculator}
      formula="x^y = x × x × x... (y times). Calculated using: result = base^exponent. Special cases: x^0 = 1, x^1 = x, x^(-n) = 1/(x^n), x^(1/n) = nth root of x"
      faqs={[
        { question: "What is an exponent?", answer: "An exponent indicates how many times to multiply the base by itself. For example, 2^3 = 2 × 2 × 2 = 8. The base is 2 and the exponent is 3." },
        { question: "How do negative exponents work?", answer: "A negative exponent means reciprocal. x^(-n) = 1/(x^n). For example, 2^(-3) = 1/(2^3) = 1/8 = 0.125." },
        { question: "What about fractional exponents?", answer: "Fractional exponents represent roots. x^(1/n) is the nth root of x. For example, 8^(1/3) is the cube root of 8, which equals 2. Also, x^(m/n) = (nth root of x)^m." },
        { question: "Why is anything to the power of 0 equal to 1?", answer: "This follows from the exponent rules. When dividing same bases, we subtract exponents: x^n / x^n = x^(n-n) = x^0. Since x^n / x^n = 1, therefore x^0 = 1." }
      ]}
      howTo={[
        "Enter the base number (the number to be multiplied by itself)",
        "Enter the exponent (how many times to multiply the base, can be positive, negative, or fractional)",
        "Click Calculate to compute the result",
        "The calculator handles whole numbers, decimals, negative numbers, and fractional exponents (roots)"
      ]}
    >
      <div className="space-y-6">
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-4">Power Calculator</h3>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm mb-1">Base</label><input type="number" value={base} onChange={(e) => setBase(e.target.value)} className="calc-input w-full" step="any" /></div>
            <div><label className="block text-sm mb-1">Exponent</label><input type="number" value={exp} onChange={(e) => setExp(e.target.value)} className="calc-input w-full" step="any" /></div>
          </div>
          <button onClick={calc} className="calc-btn calc-btn-primary w-full mt-4">Calculate</button>
        </div>
        {result && <div className="result-box"><p>Result: <span className="result-value">{result}</span></p></div>}
        <div className="bg-gray-50 p-4 rounded text-sm"><h3 className="font-semibold mb-2">Exponent Rules</h3><ul className="list-disc list-inside"><li>x^0 = 1</li><li>x^1 = x</li><li>x^(-n) = 1/x^n</li></ul></div>
      </div>
    </CalculatorLayout>
  );
}
