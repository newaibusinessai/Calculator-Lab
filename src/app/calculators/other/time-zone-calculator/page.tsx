import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TimeZoneCalculator from "./TimeZoneCalculator";

export const metadata: Metadata = generateCalculatorMetadata("time-zone-calculator");

export default function TimeZoneCalculatorPage() {
  return <TimeZoneCalculator />;
}
