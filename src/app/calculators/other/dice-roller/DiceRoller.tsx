"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("dice-roller")!;

interface DiceRoll {
  die: number;
  rolls: number[];
  total: number;
}

export default function DiceRoller() {
  const [selectedDie, setSelectedDie] = useState(6);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [results, setResults] = useState<DiceRoll[]>([]);

  const diceTypes = [4, 6, 8, 10, 12, 20];

  const rollDice = () => {
    const rolls: number[] = [];
    for (let i = 0; i < numberOfDice; i++) {
      rolls.push(Math.floor(Math.random() * selectedDie) + 1);
    }
    const total = rolls.reduce((sum, roll) => sum + roll, 0);

    const newRoll: DiceRoll = {
      die: selectedDie,
      rolls,
      total
    };

    setResults([newRoll, ...results.slice(0, 9)]);
  };

  const clearHistory = () => {
    setResults([]);
  };

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Dice Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {diceTypes.map(die => (
              <button
                key={die}
                onClick={() => setSelectedDie(die)}
                className={`py-3 px-4 rounded-lg font-semibold transition ${
                  selectedDie === die
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                d{die}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Dice: {numberOfDice}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={numberOfDice}
            onChange={(e) => setNumberOfDice(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        <button onClick={rollDice} className="calc-btn calc-btn-primary w-full text-xl py-4">
          Roll {numberOfDice}d{selectedDie}
        </button>

        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">Roll History</h3>
              <button
                onClick={clearHistory}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear
              </button>
            </div>

            {results.map((result, index) => (
              <div key={index} className={`p-4 rounded-lg ${index === 0 ? 'result-box' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    {result.rolls.length}d{result.die}
                  </span>
                  <span className="text-2xl font-bold text-green-700">
                    Total: {result.total}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.rolls.map((roll, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center font-bold text-lg"
                    >
                      {roll}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">About Dice Roller</h3>
          <p>Roll virtual dice for games and simulations. Supports d4, d6, d8, d10, d12, and d20 dice. Roll multiple dice at once and see your roll history.</p>
        </div>
      </div>
    </CalculatorLayout>
  );
}
