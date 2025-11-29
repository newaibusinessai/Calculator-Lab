import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ElectricityCalculator from "./ElectricityCalculator";

export const metadata: Metadata = generateCalculatorMetadata("electricity-calculator");

export default function ElectricityCalculatorPage() {
  return <ElectricityCalculator />;
}
