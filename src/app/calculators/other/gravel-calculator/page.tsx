import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import GravelCalculator from "./GravelCalculator";

export const metadata: Metadata = generateCalculatorMetadata("gravel-calculator");

export default function GravelCalculatorPage() {
  return <GravelCalculator />;
}
