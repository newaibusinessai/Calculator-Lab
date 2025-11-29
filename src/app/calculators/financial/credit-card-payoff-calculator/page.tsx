import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CreditCardPayoffCalculator from "./CreditCardPayoffCalculator";

export const metadata: Metadata = generateCalculatorMetadata("credit-card-payoff-calculator");

export default function CreditCardPayoffCalculatorPage() {
  return <CreditCardPayoffCalculator />;
}
