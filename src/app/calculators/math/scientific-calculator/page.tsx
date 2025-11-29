import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ScientificCalculator from "./ScientificCalculator";

export const metadata: Metadata = generateCalculatorMetadata("scientific-calculator");

export default function ScientificCalculatorPage() {
  return <ScientificCalculator />;
}
