import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import VaMortgageCalculator from "./VaMortgageCalculator";

export const metadata: Metadata = generateCalculatorMetadata("va-mortgage-calculator");

export default function VaMortgageCalculatorPage() {
  return <VaMortgageCalculator />;
}
