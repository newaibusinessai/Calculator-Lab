import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PercentIncreaseCalculator from "./PercentIncreaseCalculator";

export const metadata: Metadata = generateCalculatorMetadata("percent-increase-calculator");

export default function PercentIncreaseCalculatorPage() {
  return <PercentIncreaseCalculator />;
}
