import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import QuadraticFormulaCalculator from "./QuadraticFormulaCalculator";

export const metadata: Metadata = generateCalculatorMetadata("quadratic-formula-calculator");

export default function QuadraticFormulaCalculatorPage() {
  return <QuadraticFormulaCalculator />;
}
