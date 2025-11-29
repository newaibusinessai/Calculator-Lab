import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ExponentCalculator from "./ExponentCalculator";

export const metadata: Metadata = generateCalculatorMetadata("exponent-calculator");

export default function ExponentCalculatorPage() {
  return <ExponentCalculator />;
}
