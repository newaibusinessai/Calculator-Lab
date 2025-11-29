import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BinaryCalculator from "./BinaryCalculator";

export const metadata: Metadata = generateCalculatorMetadata("binary-calculator");

export default function BinaryCalculatorPage() {
  return <BinaryCalculator />;
}
