import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import InterestCalculator from "./InterestCalculator";

export const metadata: Metadata = generateCalculatorMetadata("interest-calculator");

export default function InterestCalculatorPage() {
  return <InterestCalculator />;
}
