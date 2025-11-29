import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ConfidenceIntervalCalculator from "./ConfidenceIntervalCalculator";

export const metadata: Metadata = generateCalculatorMetadata("confidence-interval-calculator");

export default function ConfidenceIntervalCalculatorPage() {
  return <ConfidenceIntervalCalculator />;
}
