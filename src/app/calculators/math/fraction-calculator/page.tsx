import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import FractionCalculator from "./FractionCalculator";

export const metadata: Metadata = generateCalculatorMetadata("fraction-calculator");

export default function FractionCalculatorPage() {
  return <FractionCalculator />;
}
