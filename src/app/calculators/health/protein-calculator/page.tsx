import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ProteinCalculator from "./ProteinCalculator";

export const metadata: Metadata = generateCalculatorMetadata("protein-calculator");

export default function ProteinCalculatorPage() {
  return <ProteinCalculator />;
}
