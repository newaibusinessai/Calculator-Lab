import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MolarityCalculator from "./MolarityCalculator";

export const metadata: Metadata = generateCalculatorMetadata("molarity-calculator");

export default function MolarityCalculatorPage() {
  return <MolarityCalculator />;
}
