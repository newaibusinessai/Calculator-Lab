import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import HouseAffordabilityCalculator from "./HouseAffordabilityCalculator";

export const metadata: Metadata = generateCalculatorMetadata("house-affordability-calculator");

export default function HouseAffordabilityCalculatorPage() {
  return <HouseAffordabilityCalculator />;
}
