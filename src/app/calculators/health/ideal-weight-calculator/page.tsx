import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import IdealWeightCalculator from "./IdealWeightCalculator";

export const metadata: Metadata = generateCalculatorMetadata("ideal-weight-calculator");

export default function IdealWeightCalculatorPage() {
  return <IdealWeightCalculator />;
}
