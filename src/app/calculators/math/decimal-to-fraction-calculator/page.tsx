import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DecimalToFractionCalculator from "./DecimalToFractionCalculator";

export const metadata: Metadata = generateCalculatorMetadata("decimal-to-fraction-calculator");

export default function DecimalToFractionCalculatorPage() {
  return <DecimalToFractionCalculator />;
}
