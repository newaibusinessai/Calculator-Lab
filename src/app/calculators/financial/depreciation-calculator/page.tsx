import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DepreciationCalculator from "./DepreciationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("depreciation-calculator");

export default function DepreciationCalculatorPage() {
  return <DepreciationCalculator />;
}
