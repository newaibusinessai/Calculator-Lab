import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MidpointCalculator from "./MidpointCalculator";

export const metadata: Metadata = generateCalculatorMetadata("midpoint-calculator");

export default function MidpointCalculatorPage() {
  return <MidpointCalculator />;
}
