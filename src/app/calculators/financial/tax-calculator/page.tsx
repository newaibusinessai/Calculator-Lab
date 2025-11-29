import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TaxCalculator from "./TaxCalculator";

export const metadata: Metadata = generateCalculatorMetadata("tax-calculator");

export default function TaxCalculatorPage() {
  return <TaxCalculator />;
}
