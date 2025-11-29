import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PercentDecreaseCalculator from "./PercentDecreaseCalculator";

export const metadata: Metadata = generateCalculatorMetadata("percent-decrease-calculator");

export default function PercentDecreaseCalculatorPage() {
  return <PercentDecreaseCalculator />;
}
