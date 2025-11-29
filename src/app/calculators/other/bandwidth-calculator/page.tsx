import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BandwidthCalculator from "./BandwidthCalculator";

export const metadata: Metadata = generateCalculatorMetadata("bandwidth-calculator");

export default function BandwidthCalculatorPage() {
  return <BandwidthCalculator />;
}
