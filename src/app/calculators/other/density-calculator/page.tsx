import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DensityCalculator from "./DensityCalculator";

export const metadata: Metadata = generateCalculatorMetadata("density-calculator");

export default function DensityCalculatorPage() {
  return <DensityCalculator />;
}
