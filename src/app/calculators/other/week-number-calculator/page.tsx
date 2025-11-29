import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import WeekNumberCalculator from "./WeekNumberCalculator";

export const metadata: Metadata = generateCalculatorMetadata("week-number-calculator");

export default function WeekNumberCalculatorPage() {
  return <WeekNumberCalculator />;
}
