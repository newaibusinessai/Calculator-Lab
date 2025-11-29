import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import LongDivisionCalculator from "./LongDivisionCalculator";

export const metadata: Metadata = generateCalculatorMetadata("long-division-calculator");

export default function LongDivisionCalculatorPage() {
  return <LongDivisionCalculator />;
}
