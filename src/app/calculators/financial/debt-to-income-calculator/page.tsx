import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DebtToIncomeCalculator from "./DebtToIncomeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("debt-to-income-calculator");

export default function DebtToIncomeCalculatorPage() {
  return <DebtToIncomeCalculator />;
}
