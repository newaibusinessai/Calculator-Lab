import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import FhaLoanCalculator from "./FhaLoanCalculator";

export const metadata: Metadata = generateCalculatorMetadata("fha-loan-calculator");

export default function FhaLoanCalculatorPage() {
  return <FhaLoanCalculator />;
}
