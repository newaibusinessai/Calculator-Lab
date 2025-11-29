import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import WeightCalculator from "./WeightCalculator";

export const metadata: Metadata = generateCalculatorMetadata("weight-calculator");

export default function WeightCalculatorPage() {
  return <WeightCalculator />;
}
