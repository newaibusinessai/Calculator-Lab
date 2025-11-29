import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MarriageTaxCalculator from "./MarriageTaxCalculator";

export const metadata: Metadata = generateCalculatorMetadata("marriage-tax-calculator");

export default function MarriageTaxCalculatorPage() {
  return <MarriageTaxCalculator />;
}
