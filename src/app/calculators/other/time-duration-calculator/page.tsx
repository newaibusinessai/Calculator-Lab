import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TimeDurationCalculator from "./TimeDurationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("time-duration-calculator");

export default function TimeDurationCalculatorPage() {
  return <TimeDurationCalculator />;
}
