import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MortgagePayoffCalculator from "./MortgagePayoffCalculator";

export const metadata: Metadata = generateCalculatorMetadata("mortgage-payoff-calculator");

export default function MortgagePayoffCalculatorPage() {
  return <MortgagePayoffCalculator />;
}
