import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PerimeterCalculator from "./PerimeterCalculator";

export const metadata: Metadata = generateCalculatorMetadata("perimeter-calculator");

export default function PerimeterCalculatorPage() {
  return <PerimeterCalculator />;
}
