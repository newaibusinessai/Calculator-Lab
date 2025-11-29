import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AmortizationCalculator from "./AmortizationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("amortization-calculator");

export default function AmortizationCalculatorPage() {
  return <AmortizationCalculator />;
}
