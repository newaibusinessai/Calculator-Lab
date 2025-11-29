import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SlopeCalculator from "./SlopeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("slope-calculator");

export default function SlopeCalculatorPage() {
  return <SlopeCalculator />;
}
