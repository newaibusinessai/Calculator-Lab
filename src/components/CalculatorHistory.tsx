"use client";

import { useState, useEffect } from "react";

interface HistoryEntry {
  id: string;
  calculator: string;
  inputs: Record<string, string | number>;
  result: string;
  timestamp: number;
}

interface CalculatorHistoryProps {
  calculatorName: string;
  currentInputs: Record<string, string | number>;
  currentResult: string;
  onLoadEntry?: (inputs: Record<string, string | number>) => void;
}

const STORAGE_KEY = "calchub_history";
const MAX_ENTRIES = 10;

export function useCalculatorHistory(calculatorName: string) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const allHistory: HistoryEntry[] = JSON.parse(stored);
        setHistory(allHistory.filter((h) => h.calculator === calculatorName));
      } catch {
        setHistory([]);
      }
    }
  }, [calculatorName]);

  const addEntry = (inputs: Record<string, string | number>, result: string) => {
    const newEntry: HistoryEntry = {
      id: Date.now().toString(),
      calculator: calculatorName,
      inputs,
      result,
      timestamp: Date.now(),
    };

    const stored = localStorage.getItem(STORAGE_KEY);
    let allHistory: HistoryEntry[] = stored ? JSON.parse(stored) : [];

    // Add new entry and keep only last MAX_ENTRIES per calculator
    allHistory = [newEntry, ...allHistory];
    const byCalculator: Record<string, HistoryEntry[]> = {};
    allHistory.forEach((entry) => {
      if (!byCalculator[entry.calculator]) {
        byCalculator[entry.calculator] = [];
      }
      if (byCalculator[entry.calculator].length < MAX_ENTRIES) {
        byCalculator[entry.calculator].push(entry);
      }
    });

    allHistory = Object.values(byCalculator).flat();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allHistory));
    setHistory(byCalculator[calculatorName] || []);
  };

  const clearHistory = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const allHistory: HistoryEntry[] = JSON.parse(stored);
      const filtered = allHistory.filter((h) => h.calculator !== calculatorName);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
    setHistory([]);
  };

  return { history, addEntry, clearHistory };
}

export default function CalculatorHistory({
  calculatorName,
  onLoadEntry,
}: CalculatorHistoryProps) {
  const { history, clearHistory } = useCalculatorHistory(calculatorName);
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) return null;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
      >
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        Recent Calculations ({history.length})
      </button>

      {isOpen && (
        <div className="mt-2 bg-gray-50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-500">Click to load</span>
            <button
              onClick={clearHistory}
              className="text-xs text-red-500 hover:text-red-700"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {history.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onLoadEntry?.(entry.inputs)}
                className="w-full text-left p-2 bg-white rounded border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="text-sm font-medium text-gray-800 truncate flex-1">
                    {entry.result}
                  </div>
                  <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                    {formatTime(entry.timestamp)}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1 truncate">
                  {Object.entries(entry.inputs)
                    .map(([key, val]) => `${key}: ${val}`)
                    .join(", ")}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
