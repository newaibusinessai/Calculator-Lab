import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PercentageCalculator from "./PercentageCalculator";

export const metadata: Metadata = generateCalculatorMetadata("percentage-calculator");

export default function PercentageCalculatorPage() {
  return <PercentageCalculator />;
}
