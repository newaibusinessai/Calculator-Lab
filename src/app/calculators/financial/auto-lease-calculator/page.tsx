import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AutoLeaseCalculator from "./AutoLeaseCalculator";

export const metadata: Metadata = generateCalculatorMetadata("auto-lease-calculator");

export default function AutoLeaseCalculatorPage() {
  return <AutoLeaseCalculator />;
}
