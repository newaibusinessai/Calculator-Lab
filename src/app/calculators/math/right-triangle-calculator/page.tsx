import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RightTriangleCalculator from "./RightTriangleCalculator";

export const metadata: Metadata = generateCalculatorMetadata("right-triangle-calculator");

export default function RightTriangleCalculatorPage() {
  return <RightTriangleCalculator />;
}
