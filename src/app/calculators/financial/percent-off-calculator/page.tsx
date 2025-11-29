import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PercentOffCalculator from "./PercentOffCalculator";

export const metadata: Metadata = generateCalculatorMetadata("percent-off-calculator");

export default function PercentOffCalculatorPage() {
  return <PercentOffCalculator />;
}
