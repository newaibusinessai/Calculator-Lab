import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import LoanCalculator from "./LoanCalculator";

export const metadata: Metadata = generateCalculatorMetadata("loan-calculator");

export default function LoanCalculatorPage() {
  return <LoanCalculator />;
}
