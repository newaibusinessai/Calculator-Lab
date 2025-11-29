import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AgeCalculator from "./AgeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("age-calculator");

export default function AgeCalculatorPage() {
  return <AgeCalculator />;
}
