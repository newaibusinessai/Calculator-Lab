import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PeriodCalculator from "./PeriodCalculator";

export const metadata: Metadata = generateCalculatorMetadata("period-calculator");

export default function PeriodCalculatorPage() {
  return <PeriodCalculator />;
}
