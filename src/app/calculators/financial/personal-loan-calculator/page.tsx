import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PersonalLoanCalculator from "./PersonalLoanCalculator";

export const metadata: Metadata = generateCalculatorMetadata("personal-loan-calculator");

export default function PersonalLoanCalculatorPage() {
  return <PersonalLoanCalculator />;
}
