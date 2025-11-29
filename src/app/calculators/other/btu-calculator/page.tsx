import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BtuCalculator from "./BtuCalculator";

export const metadata: Metadata = generateCalculatorMetadata("btu-calculator");

export default function BtuCalculatorPage() {
  return <BtuCalculator />;
}
