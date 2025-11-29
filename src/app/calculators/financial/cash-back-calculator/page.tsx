import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CashBackCalculator from "./CashBackCalculator";

export const metadata: Metadata = generateCalculatorMetadata("cash-back-calculator");

export default function CashBackCalculatorPage() {
  return <CashBackCalculator />;
}
