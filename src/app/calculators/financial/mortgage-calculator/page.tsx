import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MortgageCalculator from "./MortgageCalculator";

export const metadata: Metadata = generateCalculatorMetadata("mortgage-calculator");

export default function MortgageCalculatorPage() {
  return <MortgageCalculator />;
}
