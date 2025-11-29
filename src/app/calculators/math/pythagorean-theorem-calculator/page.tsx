import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PythagoreanTheoremCalculator from "./PythagoreanTheoremCalculator";

export const metadata: Metadata = generateCalculatorMetadata("pythagorean-theorem-calculator");

export default function PythagoreanTheoremCalculatorPage() {
  return <PythagoreanTheoremCalculator />;
}
