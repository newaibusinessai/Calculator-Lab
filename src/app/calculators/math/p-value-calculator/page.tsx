import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PValueCalculator from "./PValueCalculator";

export const metadata: Metadata = generateCalculatorMetadata("p-value-calculator");

export default function PValueCalculatorPage() {
  return <PValueCalculator />;
}
