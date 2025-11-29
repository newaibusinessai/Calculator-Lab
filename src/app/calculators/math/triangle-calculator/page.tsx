import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TriangleCalculator from "./TriangleCalculator";

export const metadata: Metadata = generateCalculatorMetadata("triangle-calculator");

export default function TriangleCalculatorPage() {
  return <TriangleCalculator />;
}
