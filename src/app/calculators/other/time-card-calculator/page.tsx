import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TimeCardCalculator from "./TimeCardCalculator";

export const metadata: Metadata = generateCalculatorMetadata("time-card-calculator");

export default function TimeCardCalculatorPage() {
  return <TimeCardCalculator />;
}
