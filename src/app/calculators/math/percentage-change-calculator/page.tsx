import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PercentageChangeCalculator from "./PercentageChangeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("percentage-change-calculator");

export default function PercentageChangeCalculatorPage() {
  return <PercentageChangeCalculator />;
}
