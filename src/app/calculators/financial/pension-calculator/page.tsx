import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PensionCalculator from "./PensionCalculator";

export const metadata: Metadata = generateCalculatorMetadata("pension-calculator");

export default function PensionCalculatorPage() {
  return <PensionCalculator />;
}
