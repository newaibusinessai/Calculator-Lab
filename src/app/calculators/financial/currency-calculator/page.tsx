import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CurrencyCalculator from "./CurrencyCalculator";

export const metadata: Metadata = generateCalculatorMetadata("currency-calculator");

export default function CurrencyCalculatorPage() {
  return <CurrencyCalculator />;
}
