import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CompoundInterestCalculator from "./CompoundInterestCalculator";

export const metadata: Metadata = generateCalculatorMetadata("compound-interest-calculator");

export default function CompoundInterestCalculatorPage() {
  return <CompoundInterestCalculator />;
}
