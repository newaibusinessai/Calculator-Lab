import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PaceCalculator from "./PaceCalculator";

export const metadata: Metadata = generateCalculatorMetadata("pace-calculator");

export default function PaceCalculatorPage() {
  return <PaceCalculator />;
}
