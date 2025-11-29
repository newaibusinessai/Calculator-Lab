import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MacroCalculator from "./MacroCalculator";

export const metadata: Metadata = generateCalculatorMetadata("macro-calculator");

export default function MacroCalculatorPage() {
  return <MacroCalculator />;
}
