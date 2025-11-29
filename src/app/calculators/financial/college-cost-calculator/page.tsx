import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CollegeCostCalculator from "./CollegeCostCalculator";

export const metadata: Metadata = generateCalculatorMetadata("college-cost-calculator");

export default function CollegeCostCalculatorPage() {
  return <CollegeCostCalculator />;
}
