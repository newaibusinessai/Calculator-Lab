import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BodySurfaceAreaCalculator from "./BodySurfaceAreaCalculator";

export const metadata: Metadata = generateCalculatorMetadata("body-surface-area-calculator");

export default function BodySurfaceAreaCalculatorPage() {
  return <BodySurfaceAreaCalculator />;
}
