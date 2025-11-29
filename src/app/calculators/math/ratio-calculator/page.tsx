import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RatioCalculator from "./RatioCalculator";

export const metadata: Metadata = generateCalculatorMetadata("ratio-calculator");

export default function RatioCalculatorPage() {
  return <RatioCalculator />;
}
