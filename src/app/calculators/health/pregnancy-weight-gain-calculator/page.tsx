import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PregnancyWeightGainCalculator from "./PregnancyWeightGainCalculator";

export const metadata: Metadata = generateCalculatorMetadata("pregnancy-weight-gain-calculator");

export default function PregnancyWeightGainCalculatorPage() {
  return <PregnancyWeightGainCalculator />;
}
