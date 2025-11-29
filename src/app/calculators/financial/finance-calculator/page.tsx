import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import FinanceCalculator from "./FinanceCalculator";

export const metadata: Metadata = generateCalculatorMetadata("finance-calculator");

export default function FinanceCalculatorPage() {
  return <FinanceCalculator />;
}
