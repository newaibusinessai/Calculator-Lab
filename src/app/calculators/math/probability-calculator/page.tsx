import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ProbabilityCalculator from "./ProbabilityCalculator";

export const metadata: Metadata = generateCalculatorMetadata("probability-calculator");

export default function ProbabilityCalculatorPage() {
  return <ProbabilityCalculator />;
}
