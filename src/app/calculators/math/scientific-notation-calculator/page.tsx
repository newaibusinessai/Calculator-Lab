import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ScientificNotationCalculator from "./ScientificNotationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("scientific-notation-calculator");

export default function ScientificNotationCalculatorPage() {
  return <ScientificNotationCalculator />;
}
