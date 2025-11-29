import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ResistorCalculator from "./ResistorCalculator";

export const metadata: Metadata = generateCalculatorMetadata("resistor-calculator");

export default function ResistorCalculatorPage() {
  return <ResistorCalculator />;
}
