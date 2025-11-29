import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TimeCalculator from "./TimeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("time-calculator");

export default function TimeCalculatorPage() {
  return <TimeCalculator />;
}
