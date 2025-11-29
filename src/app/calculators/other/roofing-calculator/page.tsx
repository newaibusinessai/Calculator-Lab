import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RoofingCalculator from "./RoofingCalculator";

export const metadata: Metadata = generateCalculatorMetadata("roofing-calculator");

export default function RoofingCalculatorPage() {
  return <RoofingCalculator />;
}
