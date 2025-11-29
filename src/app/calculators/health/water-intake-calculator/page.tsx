import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import WaterIntakeCalculator from "./WaterIntakeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("water-intake-calculator");

export default function WaterIntakeCalculatorPage() {
  return <WaterIntakeCalculator />;
}
