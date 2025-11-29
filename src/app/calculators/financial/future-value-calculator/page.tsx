import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import FutureValueCalculator from "./FutureValueCalculator";

export const metadata: Metadata = generateCalculatorMetadata("future-value-calculator");

export default function FutureValueCalculatorPage() {
  return <FutureValueCalculator />;
}
