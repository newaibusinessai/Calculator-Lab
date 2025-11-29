import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DebtConsolidationCalculator from "./DebtConsolidationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("debt-consolidation-calculator");

export default function DebtConsolidationCalculatorPage() {
  return <DebtConsolidationCalculator />;
}
