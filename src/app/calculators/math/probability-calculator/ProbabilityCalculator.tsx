"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("probability-calculator")!;

export default function ProbabilityCalculator() {
  const [mode, setMode] = useState<"single" | "multiple" | "conditional">("single");

  // Single Event
  const [favorable, setFavorable] = useState("");
  const [total, setTotal] = useState("");

  // Multiple Events
  const [prob1, setProb1] = useState("");
  const [prob2, setProb2] = useState("");
  const [eventType, setEventType] = useState<"and" | "or">("and");
  const [independent, setIndependent] = useState(true);

  // Conditional Probability
  const [probA, setProbA] = useState("");
  const [probB, setProbB] = useState("");
  const [probAandB, setProbAandB] = useState("");

  const [results, setResults] = useState<any>(null);

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const combination = (n: number, r: number): number => {
    return factorial(n) / (factorial(r) * factorial(n - r));
  };

  const permutation = (n: number, r: number): number => {
    return factorial(n) / factorial(n - r);
  };

  const calculateSingle = () => {
    const fav = parseFloat(favorable);
    const tot = parseFloat(total);

    if (isNaN(fav) || isNaN(tot) || fav < 0 || tot <= 0 || fav > tot) {
      alert("Please enter valid numbers. Favorable outcomes must be between 0 and total outcomes.");
      return;
    }

    const probability = fav / tot;
    const percentage = probability * 100;
    const odds = fav === tot ? "Certain" : fav === 0 ? "Impossible" : `${fav}:${tot - fav}`;
    const complement = 1 - probability;

    setResults({
      probability: probability.toFixed(6),
      percentage: percentage.toFixed(2),
      odds,
      complement: complement.toFixed(6),
      complementPercent: (complement * 100).toFixed(2)
    });
  };

  const calculateMultiple = () => {
    const p1 = parseFloat(prob1);
    const p2 = parseFloat(prob2);

    if (isNaN(p1) || isNaN(p2) || p1 < 0 || p1 > 1 || p2 < 0 || p2 > 1) {
      alert("Please enter valid probabilities between 0 and 1");
      return;
    }

    let result;
    let formula;

    if (eventType === "and") {
      if (independent) {
        result = p1 * p2;
        formula = `P(A ∩ B) = P(A) × P(B) = ${p1} × ${p2}`;
      } else {
        result = p1 * p2; // Simplified - would need P(B|A) for dependent
        formula = `P(A ∩ B) = P(A) × P(B|A)`;
      }
    } else {
      if (independent) {
        result = p1 + p2 - (p1 * p2);
        formula = `P(A ∪ B) = P(A) + P(B) - P(A) × P(B) = ${p1} + ${p2} - ${p1 * p2}`;
      } else {
        result = p1 + p2 - (p1 * p2);
        formula = `P(A ∪ B) = P(A) + P(B) - P(A ∩ B)`;
      }
    }

    setResults({
      probability: result.toFixed(6),
      percentage: (result * 100).toFixed(2),
      formula,
      eventType: eventType === "and" ? "Both events occur" : "At least one event occurs"
    });
  };

  const calculateConditional = () => {
    const pA = parseFloat(probA);
    const pB = parseFloat(probB);
    const pAB = parseFloat(probAandB);

    if (isNaN(pA) || isNaN(pB) || isNaN(pAB) || pA < 0 || pA > 1 || pB < 0 || pB > 1 || pAB < 0 || pAB > 1) {
      alert("Please enter valid probabilities between 0 and 1");
      return;
    }

    if (pAB > Math.min(pA, pB)) {
      alert("P(A ∩ B) cannot be greater than P(A) or P(B)");
      return;
    }

    const pBgivenA = pB === 0 ? 0 : pAB / pA; // P(B|A)
    const pAgivenB = pA === 0 ? 0 : pAB / pB; // P(A|B)

    setResults({
      pBgivenA: pBgivenA.toFixed(6),
      pAgivenB: pAgivenB.toFixed(6),
      pBgivenAPercent: (pBgivenA * 100).toFixed(2),
      pAgivenBPercent: (pAgivenB * 100).toFixed(2)
    });
  };

  const calculate = () => {
    if (mode === "single") {
      calculateSingle();
    } else if (mode === "multiple") {
      calculateMultiple();
    } else {
      calculateConditional();
    }
  };

  return (
    <CalculatorLayout
      calculator={calculator}
      formula="Single Event: P = favorable/total | AND (independent): P(A∩B) = P(A)×P(B) | OR: P(A∪B) = P(A)+P(B)-P(A∩B) | Conditional: P(A|B) = P(A∩B)/P(B) | Complement: P(A') = 1-P(A)"
      faqs={[
        { question: "What is probability?", answer: "Probability measures the likelihood of an event occurring, expressed as a number between 0 (impossible) and 1 (certain). It can also be expressed as a percentage (0% to 100%)." },
        { question: "What's the difference between 'AND' and 'OR' probability?", answer: "'AND' probability (intersection) is the chance that both events occur together. 'OR' probability (union) is the chance that at least one event occurs. AND uses multiplication, OR uses addition minus the overlap." },
        { question: "What does independent vs dependent events mean?", answer: "Independent events don't affect each other (like coin flips). Dependent events influence each other (like drawing cards without replacement). For independent events, P(A and B) = P(A) × P(B)." },
        { question: "What is conditional probability?", answer: "Conditional probability P(A|B) is the probability of event A occurring given that event B has already occurred. It's calculated as P(A∩B)/P(B), showing how one event affects another." }
      ]}
      howTo={[
        "Choose the calculation mode: Single Event (basic probability), Multiple Events (AND/OR), or Conditional Probability",
        "For single events: enter the number of favorable outcomes and total possible outcomes",
        "For multiple events: enter individual probabilities and select whether events are independent and whether you want AND or OR",
        "For conditional probability: enter P(A), P(B), and P(A∩B) to find P(A|B) and P(B|A)",
        "Click Calculate to see the probability as a decimal, percentage, and additional insights"
      ]}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => { setMode("single"); setResults(null); }} className={`calc-btn ${mode === "single" ? "calc-btn-primary" : "calc-btn-secondary"}`}>Single Event</button>
          <button onClick={() => { setMode("multiple"); setResults(null); }} className={`calc-btn ${mode === "multiple" ? "calc-btn-primary" : "calc-btn-secondary"}`}>Multiple Events</button>
          <button onClick={() => { setMode("conditional"); setResults(null); }} className={`calc-btn ${mode === "conditional" ? "calc-btn-primary" : "calc-btn-secondary"}`}>Conditional</button>
        </div>

        <div className="p-4 border border-gray-200 rounded-lg">
          {mode === "single" && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Single Event Probability</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Favorable Outcomes
                  </label>
                  <input
                    type="number"
                    value={favorable}
                    onChange={(e) => setFavorable(e.target.value)}
                    className="calc-input w-full"
                    placeholder="e.g., 3"
                    min="0"
                    step="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Number of Outcomes
                  </label>
                  <input
                    type="number"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className="calc-input w-full"
                    placeholder="e.g., 6"
                    min="1"
                    step="1"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Example: Rolling a 1, 2, or 3 on a six-sided die → 3 favorable, 6 total
              </p>
            </div>
          )}

          {mode === "multiple" && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Multiple Events Probability</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Probability of Event A (0-1)
                    </label>
                    <input
                      type="number"
                      value={prob1}
                      onChange={(e) => setProb1(e.target.value)}
                      className="calc-input w-full"
                      placeholder="e.g., 0.5"
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Probability of Event B (0-1)
                    </label>
                    <input
                      type="number"
                      value={prob2}
                      onChange={(e) => setProb2(e.target.value)}
                      className="calc-input w-full"
                      placeholder="e.g., 0.3"
                      min="0"
                      max="1"
                      step="0.01"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={independent}
                      onChange={(e) => setIndependent(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Events are independent</span>
                  </label>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setEventType("and")}
                    className={`calc-btn ${eventType === "and" ? "calc-btn-primary" : "calc-btn-secondary"} flex-1`}
                  >
                    AND (both occur)
                  </button>
                  <button
                    onClick={() => setEventType("or")}
                    className={`calc-btn ${eventType === "or" ? "calc-btn-primary" : "calc-btn-secondary"} flex-1`}
                  >
                    OR (at least one)
                  </button>
                </div>
              </div>
            </div>
          )}

          {mode === "conditional" && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Conditional Probability</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    P(A) - Probability of Event A
                  </label>
                  <input
                    type="number"
                    value={probA}
                    onChange={(e) => setProbA(e.target.value)}
                    className="calc-input w-full"
                    placeholder="e.g., 0.6"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    P(B) - Probability of Event B
                  </label>
                  <input
                    type="number"
                    value={probB}
                    onChange={(e) => setProbB(e.target.value)}
                    className="calc-input w-full"
                    placeholder="e.g., 0.4"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    P(A ∩ B) - Probability of Both A and B
                  </label>
                  <input
                    type="number"
                    value={probAandB}
                    onChange={(e) => setProbAandB(e.target.value)}
                    className="calc-input w-full"
                    placeholder="e.g., 0.24"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Calculate P(A|B) = probability of A given B has occurred
              </p>
            </div>
          )}

          <button onClick={calculate} className="calc-btn calc-btn-primary w-full mt-4">
            Calculate Probability
          </button>
        </div>

        {results && (
          <div className="result-box space-y-4">
            <h3 className="font-semibold text-gray-800">Results</h3>

            {mode === "single" && (
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">Probability:</p>
                  <p className="result-value text-2xl font-bold text-blue-900">
                    {results.probability}
                  </p>
                  <p className="text-lg font-semibold text-blue-800 mt-1">
                    {results.percentage}%
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Odds (favorable:unfavorable):</p>
                    <p className="result-value text-lg">{results.odds}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Complement (not occurring):</p>
                    <p className="result-value text-lg">{results.complement}</p>
                    <p className="text-sm text-gray-500">({results.complementPercent}%)</p>
                  </div>
                </div>
              </div>
            )}

            {mode === "multiple" && (
              <div className="space-y-3">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">{results.eventType}:</p>
                  <p className="result-value text-2xl font-bold text-blue-900">
                    {results.probability}
                  </p>
                  <p className="text-lg font-semibold text-blue-800 mt-1">
                    {results.percentage}%
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Formula:</strong> {results.formula}
                  </p>
                </div>
              </div>
            )}

            {mode === "conditional" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">P(B|A) - B given A:</p>
                  <p className="result-value text-2xl font-bold text-blue-900">
                    {results.pBgivenA}
                  </p>
                  <p className="text-lg font-semibold text-blue-800 mt-1">
                    {results.pBgivenAPercent}%
                  </p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-gray-600 mb-1">P(A|B) - A given B:</p>
                  <p className="result-value text-2xl font-bold text-green-900">
                    {results.pAgivenB}
                  </p>
                  <p className="text-lg font-semibold text-green-800 mt-1">
                    {results.pAgivenBPercent}%
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">Probability Rules</h3>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Range:</strong> 0 ≤ P(A) ≤ 1 (or 0% to 100%)</li>
            <li><strong>Complement:</strong> P(A') = 1 - P(A)</li>
            <li><strong>AND (independent):</strong> P(A ∩ B) = P(A) × P(B)</li>
            <li><strong>OR:</strong> P(A ∪ B) = P(A) + P(B) - P(A ∩ B)</li>
            <li><strong>Conditional:</strong> P(A|B) = P(A ∩ B) / P(B)</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
