import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PercentErrorCalculator from "./PercentErrorCalculator";

export const metadata: Metadata = generateCalculatorMetadata("percent-error-calculator");

export default function PercentErrorCalculatorPage() {
  return <PercentErrorCalculator />;
}
