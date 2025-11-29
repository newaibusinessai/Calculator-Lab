"use client";

import { useState } from "react";
import CalculatorLayout from "@/components/CalculatorLayout";
import { getCalculatorBySlug } from "@/lib/calculators";

const calculator = getCalculatorBySlug("password-generator")!;

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === "") {
      alert("Please select at least one character type");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      generatedPassword += chars[randomIndex];
    }

    setPassword(generatedPassword);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formula = "Random Password = Random Selection from Character Pool ^ Length";

  const faqs = [
    {
      question: "What makes a password strong?",
      answer: "A strong password is long (at least 12-16 characters), uses a mix of character types (uppercase, lowercase, numbers, symbols), and is completely random. Avoid dictionary words, personal information, and common patterns."
    },
    {
      question: "How long should my password be?",
      answer: "Minimum 12 characters for most accounts, 16+ for sensitive accounts like email and banking. Longer passwords are exponentially harder to crack. This generator supports up to 64 characters."
    },
    {
      question: "Should I include symbols in my password?",
      answer: "Yes! Symbols significantly increase password strength by expanding the character pool. However, some websites restrict certain symbols, so you can disable them if needed."
    },
    {
      question: "Is it safe to use this password generator?",
      answer: "Yes. Passwords are generated entirely in your browser using JavaScript's random number generator. Nothing is sent to any server. However, for maximum security, use a dedicated password manager with its own generator."
    },
    {
      question: "How do I remember these complex passwords?",
      answer: "Don't try to memorize them! Use a password manager to securely store all your passwords. You only need to remember one strong master password for the password manager itself."
    }
  ];

  const howTo = [
    "Use the slider to select password length (4-64 characters, recommend 16+)",
    "Check or uncheck character types to include: uppercase, lowercase, numbers, and symbols",
    "At least one character type must be selected",
    "Click 'Generate Password' to create a random password",
    "Click 'Copy to Clipboard' to copy the password for use",
    "Generate multiple passwords to choose your favorite, or use a password manager"
  ];

  return (
    <CalculatorLayout
      calculator={calculator}
      formula={formula}
      faqs={faqs}
      howTo={howTo}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password Length: {length}
          </label>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="uppercase"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="uppercase" className="ml-2 text-gray-700">
              Uppercase Letters (A-Z)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="lowercase"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="lowercase" className="ml-2 text-gray-700">
              Lowercase Letters (a-z)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="numbers"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="numbers" className="ml-2 text-gray-700">
              Numbers (0-9)
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="symbols"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
            />
            <label htmlFor="symbols" className="ml-2 text-gray-700">
              Symbols (!@#$%^&*)
            </label>
          </div>
        </div>

        <button onClick={generatePassword} className="calc-btn calc-btn-primary w-full">
          Generate Password
        </button>

        {password && (
          <div className="result-box">
            <div className="text-sm text-gray-600 mb-2">Generated Password</div>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-lg break-all mb-3">
              {password}
            </div>
            <button
              onClick={copyToClipboard}
              className="calc-btn w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              {copied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
