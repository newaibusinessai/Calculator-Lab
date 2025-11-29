import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CreditCardCalculator from "./CreditCardCalculator";

export const metadata: Metadata = generateCalculatorMetadata("credit-card-calculator");

export default function CreditCardCalculatorPage() {
  return <CreditCardCalculator />;
}
