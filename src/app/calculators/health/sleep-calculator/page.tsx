import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SleepCalculator from "./SleepCalculator";

export const metadata: Metadata = generateCalculatorMetadata("sleep-calculator");

export default function SleepCalculatorPage() {
  return <SleepCalculator />;
}
