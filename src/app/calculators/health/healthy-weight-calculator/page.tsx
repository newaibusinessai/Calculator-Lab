import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import HealthyWeightCalculator from "./HealthyWeightCalculator";

export const metadata: Metadata = generateCalculatorMetadata("healthy-weight-calculator");

export default function HealthyWeightCalculatorPage() {
  return <HealthyWeightCalculator />;
}
