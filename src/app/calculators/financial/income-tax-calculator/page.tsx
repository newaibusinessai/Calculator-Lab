import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import IncomeTaxCalculator from "./IncomeTaxCalculator";

export const metadata: Metadata = generateCalculatorMetadata("income-tax-calculator");

export default function IncomeTaxCalculatorPage() {
  return <IncomeTaxCalculator />;
}
