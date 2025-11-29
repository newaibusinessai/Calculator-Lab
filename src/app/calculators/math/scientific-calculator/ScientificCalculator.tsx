"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("scientific-calculator")!;

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(true);

  const inputDigit = (digit: string) => {
    setDisplay((prev) => (prev === "0" ? digit : prev + digit));
  };

  const inputDecimal = () => {
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const clear = () => {
    setDisplay("0");
  };

  const clearAll = () => {
    setDisplay("0");
    setMemory(0);
  };

  const backspace = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
  };

  const calculate = () => {
    try {
      // Replace display symbols with JS operators
      let expression = display
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, String(Math.PI))
        .replace(/e(?![x])/g, String(Math.E));

      // Evaluate the expression
      const result = Function(`"use strict"; return (${expression})`)();
      setDisplay(String(result));
    } catch {
      setDisplay("Error");
    }
  };

  const scientificFunction = (func: string) => {
    const value = parseFloat(display);
    if (isNaN(value)) return;

    let result: number;
    const angle = isRadians ? value : (value * Math.PI) / 180;

    switch (func) {
      case "sin":
        result = Math.sin(angle);
        break;
      case "cos":
        result = Math.cos(angle);
        break;
      case "tan":
        result = Math.tan(angle);
        break;
      case "asin":
        result = isRadians ? Math.asin(value) : (Math.asin(value) * 180) / Math.PI;
        break;
      case "acos":
        result = isRadians ? Math.acos(value) : (Math.acos(value) * 180) / Math.PI;
        break;
      case "atan":
        result = isRadians ? Math.atan(value) : (Math.atan(value) * 180) / Math.PI;
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
      case "abs":
        result = Math.abs(value);
        break;
      case "exp":
        result = Math.exp(value);
        break;
      case "10x":
        result = Math.pow(10, value);
        break;
      default:
        return;
    }

    setDisplay(String(result));
  };

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
  };

  const memoryOperation = (op: string) => {
    const value = parseFloat(display);
    switch (op) {
      case "MC":
        setMemory(0);
        break;
      case "MR":
        setDisplay(String(memory));
        break;
      case "M+":
        setMemory((prev) => prev + value);
        break;
      case "M-":
        setMemory((prev) => prev - value);
        break;
    }
  };

  const insertConstant = (constant: string) => {
    if (constant === "pi") {
      setDisplay((prev) => (prev === "0" ? "π" : prev + "π"));
    } else if (constant === "e") {
      setDisplay((prev) => (prev === "0" ? "e" : prev + "e"));
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
      className={`p-2 text-sm font-medium rounded border border-gray-300 hover:bg-gray-100 active:bg-gray-200 transition-colors ${className}`}
    >
      {children}
    </button>
  );

  return (
    <CalculatorLayout calculator={calculator}>
      <div className="max-w-md mx-auto">
        {/* Mode selector */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setIsRadians(true)}
            className={`px-3 py-1 text-sm rounded ${
              isRadians ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            RAD
          </button>
          <button
            onClick={() => setIsRadians(false)}
            className={`px-3 py-1 text-sm rounded ${
              !isRadians ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            DEG
          </button>
          {memory !== 0 && (
            <span className="ml-auto text-sm text-gray-500">M = {memory}</span>
          )}
        </div>

        {/* Display */}
        <div className="bg-gray-100 p-4 rounded mb-4 text-right">
          <div className="text-2xl font-mono truncate">{display}</div>
        </div>

        {/* Scientific buttons */}
        <div className="grid grid-cols-5 gap-1 mb-2">
          <Button onClick={() => scientificFunction("sin")} title="Sine">
            sin
          </Button>
          <Button onClick={() => scientificFunction("cos")} title="Cosine">
            cos
          </Button>
          <Button onClick={() => scientificFunction("tan")} title="Tangent">
            tan
          </Button>
          <Button onClick={() => scientificFunction("log")} title="Log base 10">
            log
          </Button>
          <Button onClick={() => scientificFunction("ln")} title="Natural log">
            ln
          </Button>

          <Button onClick={() => scientificFunction("asin")} title="Arc sine">
            sin⁻¹
          </Button>
          <Button onClick={() => scientificFunction("acos")} title="Arc cosine">
            cos⁻¹
          </Button>
          <Button onClick={() => scientificFunction("atan")} title="Arc tangent">
            tan⁻¹
          </Button>
          <Button onClick={() => scientificFunction("exp")} title="e^x">
            eˣ
          </Button>
          <Button onClick={() => scientificFunction("10x")} title="10^x">
            10ˣ
          </Button>

          <Button onClick={() => scientificFunction("square")} title="Square">
            x²
          </Button>
          <Button onClick={() => scientificFunction("cube")} title="Cube">
            x³
          </Button>
          <Button onClick={() => scientificFunction("sqrt")} title="Square root">
            √
          </Button>
          <Button onClick={() => scientificFunction("cbrt")} title="Cube root">
            ∛
          </Button>
          <Button onClick={() => scientificFunction("inverse")} title="1/x">
            1/x
          </Button>

          <Button onClick={() => insertConstant("pi")} title="Pi">
            π
          </Button>
          <Button onClick={() => insertConstant("e")} title="Euler's number">
            e
          </Button>
          <Button onClick={() => scientificFunction("factorial")} title="Factorial">
            n!
          </Button>
          <Button onClick={() => scientificFunction("abs")} title="Absolute value">
            |x|
          </Button>
          <Button onClick={() => setDisplay((prev) => prev + "^")} title="Power">
            xʸ
          </Button>
        </div>

        {/* Memory buttons */}
        <div className="grid grid-cols-5 gap-1 mb-2">
          <Button onClick={() => memoryOperation("MC")} className="text-xs">
            MC
          </Button>
          <Button onClick={() => memoryOperation("MR")} className="text-xs">
            MR
          </Button>
          <Button onClick={() => memoryOperation("M+")} className="text-xs">
            M+
          </Button>
          <Button onClick={() => memoryOperation("M-")} className="text-xs">
            M-
          </Button>
          <Button onClick={backspace} className="text-xs">
            ⌫
          </Button>
        </div>

        {/* Standard calculator buttons */}
        <div className="grid grid-cols-4 gap-1">
          <Button onClick={clearAll} className="bg-gray-200">
            AC
          </Button>
          <Button onClick={clear} className="bg-gray-200">
            C
          </Button>
          <Button onClick={() => setDisplay((prev) => prev + "(")} className="bg-gray-200">
            (
          </Button>
          <Button onClick={() => setDisplay((prev) => prev + ")")} className="bg-gray-200">
            )
          </Button>

          <Button onClick={() => inputDigit("7")}>7</Button>
          <Button onClick={() => inputDigit("8")}>8</Button>
          <Button onClick={() => inputDigit("9")}>9</Button>
          <Button
            onClick={() => setDisplay((prev) => prev + "÷")}
            className="bg-orange-400 text-white"
          >
            ÷
          </Button>

          <Button onClick={() => inputDigit("4")}>4</Button>
          <Button onClick={() => inputDigit("5")}>5</Button>
          <Button onClick={() => inputDigit("6")}>6</Button>
          <Button
            onClick={() => setDisplay((prev) => prev + "×")}
            className="bg-orange-400 text-white"
          >
            ×
          </Button>

          <Button onClick={() => inputDigit("1")}>1</Button>
          <Button onClick={() => inputDigit("2")}>2</Button>
          <Button onClick={() => inputDigit("3")}>3</Button>
          <Button
            onClick={() => setDisplay((prev) => prev + "-")}
            className="bg-orange-400 text-white"
          >
            -
          </Button>

          <Button onClick={() => inputDigit("0")}>0</Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button onClick={calculate} className="bg-blue-600 text-white">
            =
          </Button>
          <Button
            onClick={() => setDisplay((prev) => prev + "+")}
            className="bg-orange-400 text-white"
          >
            +
          </Button>
        </div>

        {/* Instructions */}
        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Features:</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Trigonometric functions (sin, cos, tan and inverses)</li>
            <li>Logarithmic functions (log, ln)</li>
            <li>Power and root functions</li>
            <li>Memory functions (MC, MR, M+, M-)</li>
            <li>Switch between radians and degrees</li>
          </ul>
        </div>
      </div>
    </CalculatorLayout>
  );
}
