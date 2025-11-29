import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import FuelCostCalculator from "./FuelCostCalculator";

export const metadata: Metadata = generateCalculatorMetadata("fuel-cost-calculator");

export default function FuelCostCalculatorPage() {
  return <FuelCostCalculator />;
}
