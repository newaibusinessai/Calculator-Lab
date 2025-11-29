import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import WindChillCalculator from "./WindChillCalculator";

export const metadata: Metadata = generateCalculatorMetadata("wind-chill-calculator");

export default function WindChillCalculatorPage() {
  return <WindChillCalculator />;
}
