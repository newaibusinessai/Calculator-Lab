import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import HeartRateZoneCalculator from "./HeartRateZoneCalculator";

export const metadata: Metadata = generateCalculatorMetadata("heart-rate-zone-calculator");

export default function HeartRateZoneCalculatorPage() {
  return <HeartRateZoneCalculator />;
}
