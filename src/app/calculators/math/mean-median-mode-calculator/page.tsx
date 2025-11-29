import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MeanMedianModeCalculator from "./MeanMedianModeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("mean-median-mode-calculator");

export default function MeanMedianModeCalculatorPage() {
  return <MeanMedianModeCalculator />;
}
