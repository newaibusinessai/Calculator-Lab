import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AverageCalculator from "./AverageCalculator";

export const metadata: Metadata = generateCalculatorMetadata("average-calculator");

export default function AverageCalculatorPage() {
  return <AverageCalculator />;
}
