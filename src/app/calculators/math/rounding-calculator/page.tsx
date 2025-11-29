import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RoundingCalculator from "./RoundingCalculator";

export const metadata: Metadata = generateCalculatorMetadata("rounding-calculator");

export default function RoundingCalculatorPage() {
  return <RoundingCalculator />;
}
