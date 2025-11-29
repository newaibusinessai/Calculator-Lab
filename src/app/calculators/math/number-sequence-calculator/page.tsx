import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import NumberSequenceCalculator from "./NumberSequenceCalculator";

export const metadata: Metadata = generateCalculatorMetadata("number-sequence-calculator");

export default function NumberSequenceCalculatorPage() {
  return <NumberSequenceCalculator />;
}
