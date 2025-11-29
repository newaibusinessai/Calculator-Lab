import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import StandardDeviationCalculator from "./StandardDeviationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("standard-deviation-calculator");

export default function StandardDeviationCalculatorPage() {
  return <StandardDeviationCalculator />;
}
