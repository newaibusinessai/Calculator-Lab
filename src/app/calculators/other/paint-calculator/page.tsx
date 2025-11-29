import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PaintCalculator from "./PaintCalculator";

export const metadata: Metadata = generateCalculatorMetadata("paint-calculator");

export default function PaintCalculatorPage() {
  return <PaintCalculator />;
}
