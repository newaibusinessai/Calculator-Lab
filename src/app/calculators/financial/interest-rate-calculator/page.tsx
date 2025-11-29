import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import InterestRateCalculator from "./InterestRateCalculator";

export const metadata: Metadata = generateCalculatorMetadata("interest-rate-calculator");

export default function InterestRateCalculatorPage() {
  return <InterestRateCalculator />;
}
