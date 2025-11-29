import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import LogCalculator from "./LogCalculator";

export const metadata: Metadata = generateCalculatorMetadata("log-calculator");

export default function LogCalculatorPage() {
  return <LogCalculator />;
}
