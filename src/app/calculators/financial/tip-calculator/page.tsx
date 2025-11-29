import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TipCalculator from "./TipCalculator";

export const metadata: Metadata = generateCalculatorMetadata("tip-calculator");

export default function TipCalculatorPage() {
  return <TipCalculator />;
}
