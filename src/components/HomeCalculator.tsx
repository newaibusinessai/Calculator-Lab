"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HomeCalculator() {
  const router = useRouter();
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [memory, setMemory] = useState(0);
  const [lastAnswer, setLastAnswer] = useState(0);
  const [isRadians, setIsRadians] = useState(true);
  const [isInverse, setIsInverse] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
        case "^":
          newValue = Math.pow(currentValue, inputValue);
          break;
        case "yroot":
          newValue = Math.pow(currentValue, 1 / inputValue);
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
      case "^":
        newValue = Math.pow(previousValue, inputValue);
        break;
      case "yroot":
        newValue = Math.pow(previousValue, 1 / inputValue);
        break;
      default:
        newValue = inputValue;
    }

    setDisplay(String(newValue));
    setLastAnswer(newValue);
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percentage = () => {
    setDisplay(String(parseFloat(display) / 100));
    setWaitingForOperand(true);
  };

  const scientificFunction = (func: string) => {
    const value = parseFloat(display);
    if (isNaN(value)) return;

    let result: number;
    const angle = isRadians ? value : (value * Math.PI) / 180;

    switch (func) {
      case "sin":
        result = isInverse ? Math.asin(value) : Math.sin(angle);
        if (isInverse && !isRadians) result = (result * 180) / Math.PI;
        break;
      case "cos":
        result = isInverse ? Math.acos(value) : Math.cos(angle);
        if (isInverse && !isRadians) result = (result * 180) / Math.PI;
        break;
      case "tan":
        result = isInverse ? Math.atan(value) : Math.tan(angle);
        if (isInverse && !isRadians) result = (result * 180) / Math.PI;
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "ln":
        result = Math.log(value);
        break;
      case "sqrt":
        result = Math.sqrt(value);
        break;
      case "cbrt":
        result = Math.cbrt(value);
        break;
      case "square":
        result = value * value;
        break;
      case "cube":
        result = value * value * value;
        break;
      case "inverse":
        result = 1 / value;
        break;
      case "factorial":
        result = factorial(Math.floor(value));
        break;
      case "exp":
        result = Math.exp(value);
        break;
      case "10x":
        result = Math.pow(10, value);
        break;
      case "abs":
        result = Math.abs(value);
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setLastAnswer(result);
    setWaitingForOperand(true);
    setIsInverse(false);
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const insertConstant = (constant: string) => {
    let value: string;
    switch (constant) {
      case "pi":
        value = String(Math.PI);
        break;
      case "e":
        value = String(Math.E);
        break;
      default:
        return;
    }
    setDisplay(value);
    setWaitingForOperand(true);
  };

  const memoryOperation = (op: string) => {
    const value = parseFloat(display);
    switch (op) {
      case "MC":
        setMemory(0);
        break;
      case "MR":
        setDisplay(String(memory));
        setWaitingForOperand(true);
        break;
      case "M+":
        setMemory((prev) => prev + value);
        setWaitingForOperand(true);
        break;
      case "M-":
        setMemory((prev) => prev - value);
        setWaitingForOperand(true);
        break;
    }
  };

  const recallAnswer = () => {
    setDisplay(String(lastAnswer));
    setWaitingForOperand(true);
  };

  const generateRandom = () => {
    const random = Math.random();
    setDisplay(String(random));
    setWaitingForOperand(true);
  };

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay("0");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const Button = ({
    children,
    onClick,
    className = "",
    title = "",
  }: {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
    title?: string;
  }) => (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-100 active:bg-gray-200 transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      {/* Calculator */}
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 flex-shrink-0">
        {/* Mode toggles and memory indicator */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex gap-1">
            <button
              onClick={() => setIsRadians(true)}
              className={`px-2 py-1 text-xs rounded ${
                isRadians ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              RAD
            </button>
            <button
              onClick={() => setIsRadians(false)}
              className={`px-2 py-1 text-xs rounded ${
                !isRadians ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              DEG
            </button>
          </div>
          {memory !== 0 && (
            <span className="text-xs text-gray-500">M = {memory.toFixed(4)}</span>
          )}
        </div>

        {/* Display */}
        <div className="bg-gray-900 text-white p-3 mb-3 text-right rounded">
          <div className="text-2xl font-mono truncate min-w-[200px]">{display}</div>
        </div>

        {/* Calculator body - horizontal layout */}
        <div className="flex gap-2">
          {/* Scientific buttons - left side */}
          <div className="grid grid-cols-4 gap-1">
            {/* Row 1 */}
            <Button
              onClick={() => setIsInverse(!isInverse)}
              className={`text-xs ${isInverse ? "bg-blue-100 border-blue-400" : "bg-gray-50"}`}
              title="Inverse functions"
            >
              Inv
            </Button>
            <Button onClick={() => scientificFunction("sin")} className="text-xs bg-gray-50" title={isInverse ? "Arc sine" : "Sine"}>
              {isInverse ? "sin⁻¹" : "sin"}
            </Button>
            <Button onClick={() => scientificFunction("cos")} className="text-xs bg-gray-50" title={isInverse ? "Arc cosine" : "Cosine"}>
              {isInverse ? "cos⁻¹" : "cos"}
            </Button>
            <Button onClick={() => scientificFunction("tan")} className="text-xs bg-gray-50" title={isInverse ? "Arc tangent" : "Tangent"}>
              {isInverse ? "tan⁻¹" : "tan"}
            </Button>

            {/* Row 2 */}
            <Button onClick={() => insertConstant("pi")} className="text-xs bg-gray-50" title="Pi">π</Button>
            <Button onClick={() => insertConstant("e")} className="text-xs bg-gray-50" title="Euler's number">e</Button>
            <Button onClick={() => scientificFunction("ln")} className="text-xs bg-gray-50" title="Natural log">ln</Button>
            <Button onClick={() => scientificFunction("log")} className="text-xs bg-gray-50" title="Log base 10">log</Button>

            {/* Row 3 */}
            <Button onClick={() => scientificFunction("sqrt")} className="text-xs bg-gray-50" title="Square root">√x</Button>
            <Button onClick={() => scientificFunction("cbrt")} className="text-xs bg-gray-50" title="Cube root">³√x</Button>
            <Button onClick={() => scientificFunction("square")} className="text-xs bg-gray-50" title="Square">x²</Button>
            <Button onClick={() => performOperation("^")} className="text-xs bg-gray-50" title="Power">xʸ</Button>

            {/* Row 4 */}
            <Button onClick={() => scientificFunction("exp")} className="text-xs bg-gray-50" title="e^x">eˣ</Button>
            <Button onClick={() => scientificFunction("10x")} className="text-xs bg-gray-50" title="10^x">10ˣ</Button>
            <Button onClick={() => scientificFunction("inverse")} className="text-xs bg-gray-50" title="Reciprocal">1/x</Button>
            <Button onClick={() => scientificFunction("abs")} className="text-xs bg-gray-50" title="Absolute value">|x|</Button>

            {/* Row 5 */}
            <Button onClick={() => scientificFunction("factorial")} className="text-xs bg-gray-50" title="Factorial">n!</Button>
            <Button onClick={generateRandom} className="text-xs bg-gray-50" title="Random number">RND</Button>
            <Button onClick={recallAnswer} className="text-xs bg-gray-50" title="Last answer">Ans</Button>
            <Button onClick={backspace} className="text-xs bg-gray-100" title="Backspace">⌫</Button>
          </div>

          {/* Basic calculator - right side */}
          <div className="grid grid-cols-4 gap-1">
            {/* Memory row */}
            <Button onClick={() => memoryOperation("MC")} className="text-xs bg-gray-100">MC</Button>
            <Button onClick={() => memoryOperation("MR")} className="text-xs bg-gray-100">MR</Button>
            <Button onClick={() => memoryOperation("M+")} className="text-xs bg-gray-100">M+</Button>
            <Button onClick={() => memoryOperation("M-")} className="text-xs bg-gray-100">M-</Button>

            {/* Row 1 */}
            <Button onClick={clear} className="bg-red-100 text-red-700 font-semibold">AC</Button>
            <Button onClick={toggleSign} className="bg-gray-100">+/-</Button>
            <Button onClick={percentage} className="bg-gray-100">%</Button>
            <Button onClick={() => performOperation("÷")} className="bg-orange-400 text-white hover:bg-orange-500">÷</Button>

            {/* Row 2 */}
            <Button onClick={() => inputDigit("7")} className="text-lg">7</Button>
            <Button onClick={() => inputDigit("8")} className="text-lg">8</Button>
            <Button onClick={() => inputDigit("9")} className="text-lg">9</Button>
            <Button onClick={() => performOperation("×")} className="bg-orange-400 text-white hover:bg-orange-500">×</Button>

            {/* Row 3 */}
            <Button onClick={() => inputDigit("4")} className="text-lg">4</Button>
            <Button onClick={() => inputDigit("5")} className="text-lg">5</Button>
            <Button onClick={() => inputDigit("6")} className="text-lg">6</Button>
            <Button onClick={() => performOperation("-")} className="bg-orange-400 text-white hover:bg-orange-500">−</Button>

            {/* Row 4 */}
            <Button onClick={() => inputDigit("1")} className="text-lg">1</Button>
            <Button onClick={() => inputDigit("2")} className="text-lg">2</Button>
            <Button onClick={() => inputDigit("3")} className="text-lg">3</Button>
            <Button onClick={() => performOperation("+")} className="bg-orange-400 text-white hover:bg-orange-500">+</Button>

            {/* Row 5 */}
            <Button onClick={() => inputDigit("0")} className="col-span-2 text-lg">0</Button>
            <Button onClick={inputDecimal} className="text-lg">.</Button>
            <Button onClick={calculate} className="bg-green-500 text-white hover:bg-green-600 font-semibold">=</Button>
          </div>
        </div>
      </div>

      {/* Search box on the right of calculator */}
      <div className="flex-1 max-w-sm">
        <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3">Search Calculators</h2>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g., mortgage, BMI, percentage..."
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-3"
            />
            <button
              type="submit"
              className="w-full px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
            >
              Search
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-3">
            Find calculators for math, finance, health, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
