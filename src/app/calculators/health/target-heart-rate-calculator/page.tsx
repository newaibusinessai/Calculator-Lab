import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TargetHeartRateCalculator from "./TargetHeartRateCalculator";

export const metadata: Metadata = generateCalculatorMetadata("target-heart-rate-calculator");

export default function TargetHeartRateCalculatorPage() {
  return <TargetHeartRateCalculator />;
}
