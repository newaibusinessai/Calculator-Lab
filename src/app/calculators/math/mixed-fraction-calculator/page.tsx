import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MixedFractionCalculator from "./MixedFractionCalculator";

export const metadata: Metadata = generateCalculatorMetadata("mixed-fraction-calculator");

export default function MixedFractionCalculatorPage() {
  return <MixedFractionCalculator />;
}
