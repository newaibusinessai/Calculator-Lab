import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BusinessLoanCalculator from "./BusinessLoanCalculator";

export const metadata: Metadata = generateCalculatorMetadata("business-loan-calculator");

export default function BusinessLoanCalculatorPage() {
  return <BusinessLoanCalculator />;
}
