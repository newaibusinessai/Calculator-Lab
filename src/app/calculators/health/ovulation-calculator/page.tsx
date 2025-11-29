import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import OvulationCalculator from "./OvulationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("ovulation-calculator");

export default function OvulationCalculatorPage() {
  return <OvulationCalculator />;
}
