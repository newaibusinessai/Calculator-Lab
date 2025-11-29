import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import EstateTaxCalculator from "./EstateTaxCalculator";

export const metadata: Metadata = generateCalculatorMetadata("estate-tax-calculator");

export default function EstateTaxCalculatorPage() {
  return <EstateTaxCalculator />;
}
