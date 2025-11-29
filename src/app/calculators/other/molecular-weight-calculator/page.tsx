import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MolecularWeightCalculator from "./MolecularWeightCalculator";

export const metadata: Metadata = generateCalculatorMetadata("molecular-weight-calculator");

export default function MolecularWeightCalculatorPage() {
  return <MolecularWeightCalculator />;
}
