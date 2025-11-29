import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AverageReturnCalculator from "./AverageReturnCalculator";

export const metadata: Metadata = generateCalculatorMetadata("average-return-calculator");

export default function AverageReturnCalculatorPage() {
  return <AverageReturnCalculator />;
}
