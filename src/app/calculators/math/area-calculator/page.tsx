import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AreaCalculator from "./AreaCalculator";

export const metadata: Metadata = generateCalculatorMetadata("area-calculator");

export default function AreaCalculatorPage() {
  return <AreaCalculator />;
}
