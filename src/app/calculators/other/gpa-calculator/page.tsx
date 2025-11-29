import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import GpaCalculator from "./GpaCalculator";

export const metadata: Metadata = generateCalculatorMetadata("gpa-calculator");

export default function GpaCalculatorPage() {
  return <GpaCalculator />;
}
