import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DayOfWeekCalculator from "./DayOfWeekCalculator";

export const metadata: Metadata = generateCalculatorMetadata("day-of-week-calculator");

export default function DayOfWeekCalculatorPage() {
  return <DayOfWeekCalculator />;
}
