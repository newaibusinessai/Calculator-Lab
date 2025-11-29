import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DebtPayoffCalculator from "./DebtPayoffCalculator";

export const metadata: Metadata = generateCalculatorMetadata("debt-payoff-calculator");

export default function DebtPayoffCalculatorPage() {
  return <DebtPayoffCalculator />;
}
