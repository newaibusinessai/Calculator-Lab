"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("basic-calculator")!;

export default function BasicCalculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue;
      let newValue: number;

      switch (operation) {
        case "+":
          newValue = currentValue + inputValue;
          break;
        case "-":
          newValue = currentValue - inputValue;
          break;
        case "×":
          newValue = currentValue * inputValue;
          break;
        case "÷":
          newValue = currentValue / inputValue;
          break;
        default:
          newValue = inputValue;
      }

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = () => {
    if (!operation || previousValue === null) return;

    const inputValue = parseFloat(display);
    let newValue: number;

    switch (operation) {
      case "+":
        newValue = previousValue + inputValue;
        break;
      case "-":
        newValue = previousValue - inputValue;
        break;
      case "×":
        newValue = previousValue * inputValue;
        break;
      case "÷":
        newValue = previousValue / inputValue;
        break;
      default:
        newValue = inputValue;
    }

    setDisplay(String(newValue));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const Button = ({
    children,
    onClick,
    className = "",
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`p-4 text-xl font-medium rounded border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="max-w-xs mx-auto">
        {/* Display */}
        <div className="bg-gray-100 p-4 rounded mb-4 text-right">
          <div className="text-3xl font-mono truncate">{display}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} className="bg-gray-200">
            AC
          </Button>
          <Button onClick={toggleSign} className="bg-gray-200">
            +/-
          </Button>
          <Button onClick={percentage} className="bg-gray-200">
            %
          </Button>
          <Button
            onClick={() => performOperation("÷")}
            className="bg-orange-400 text-white hover:bg-orange-500"
          >
            ÷
          </Button>

          <Button onClick={() => inputDigit("7")}>7</Button>
          <Button onClick={() => inputDigit("8")}>8</Button>
          <Button onClick={() => inputDigit("9")}>9</Button>
          <Button
            onClick={() => performOperation("×")}
            className="bg-orange-400 text-white hover:bg-orange-500"
          >
            ×
          </Button>

          <Button onClick={() => inputDigit("4")}>4</Button>
          <Button onClick={() => inputDigit("5")}>5</Button>
          <Button onClick={() => inputDigit("6")}>6</Button>
          <Button
            onClick={() => performOperation("-")}
            className="bg-orange-400 text-white hover:bg-orange-500"
          >
            -
          </Button>

          <Button onClick={() => inputDigit("1")}>1</Button>
          <Button onClick={() => inputDigit("2")}>2</Button>
          <Button onClick={() => inputDigit("3")}>3</Button>
          <Button
            onClick={() => performOperation("+")}
            className="bg-orange-400 text-white hover:bg-orange-500"
          >
            +
          </Button>

          <Button onClick={() => inputDigit("0")} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button
            onClick={calculate}
            className="bg-orange-400 text-white hover:bg-orange-500"
          >
            =
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">How to use:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Click numbers to enter values</li>
            <li>Use +, -, ×, ÷ for operations</li>
            <li>Press = to calculate result</li>
            <li>AC clears the calculator</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
