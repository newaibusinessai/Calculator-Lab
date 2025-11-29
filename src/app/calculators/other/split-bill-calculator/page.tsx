import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SplitBillCalculator from "./SplitBillCalculator";

export const metadata: Metadata = generateCalculatorMetadata("split-bill-calculator");

export default function SplitBillCalculatorPage() {
  return <SplitBillCalculator />;
}
