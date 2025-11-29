import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PresentValueCalculator from "./PresentValueCalculator";

export const metadata: Metadata = generateCalculatorMetadata("present-value-calculator");

export default function PresentValueCalculatorPage() {
  return <PresentValueCalculator />;
}
