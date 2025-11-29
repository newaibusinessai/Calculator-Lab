import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import LumberCalculator from "./LumberCalculator";

export const metadata: Metadata = generateCalculatorMetadata("lumber-calculator");

export default function LumberCalculatorPage() {
  return <LumberCalculator />;
}
