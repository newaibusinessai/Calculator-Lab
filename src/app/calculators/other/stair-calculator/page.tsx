import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import StairCalculator from "./StairCalculator";

export const metadata: Metadata = generateCalculatorMetadata("stair-calculator");

export default function StairCalculatorPage() {
  return <StairCalculator />;
}
