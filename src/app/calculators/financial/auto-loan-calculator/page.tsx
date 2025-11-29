import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AutoLoanCalculator from "./AutoLoanCalculator";

export const metadata: Metadata = generateCalculatorMetadata("auto-loan-calculator");

export default function AutoLoanCalculatorPage() {
  return <AutoLoanCalculator />;
}
