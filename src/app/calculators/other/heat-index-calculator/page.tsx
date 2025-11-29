import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import HeatIndexCalculator from "./HeatIndexCalculator";

export const metadata: Metadata = generateCalculatorMetadata("heat-index-calculator");

export default function HeatIndexCalculatorPage() {
  return <HeatIndexCalculator />;
}
