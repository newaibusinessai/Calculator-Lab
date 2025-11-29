import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SurfaceAreaCalculator from "./SurfaceAreaCalculator";

export const metadata: Metadata = generateCalculatorMetadata("surface-area-calculator");

export default function SurfaceAreaCalculatorPage() {
  return <SurfaceAreaCalculator />;
}
