import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BudgetCalculator from "./BudgetCalculator";

export const metadata: Metadata = generateCalculatorMetadata("budget-calculator");

export default function BudgetCalculatorPage() {
  return <BudgetCalculator />;
}
