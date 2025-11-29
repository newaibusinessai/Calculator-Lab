import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MatrixCalculator from "./MatrixCalculator";

export const metadata: Metadata = generateCalculatorMetadata("matrix-calculator");

export default function MatrixCalculatorPage() {
  return <MatrixCalculator />;
}
