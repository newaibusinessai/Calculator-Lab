import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import LeaseCalculator from "./LeaseCalculator";

export const metadata: Metadata = generateCalculatorMetadata("lease-calculator");

export default function LeaseCalculatorPage() {
  return <LeaseCalculator />;
}
