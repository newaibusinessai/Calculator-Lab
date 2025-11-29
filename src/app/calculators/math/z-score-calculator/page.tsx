import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ZScoreCalculator from "./ZScoreCalculator";

export const metadata: Metadata = generateCalculatorMetadata("z-score-calculator");

export default function ZScoreCalculatorPage() {
  return <ZScoreCalculator />;
}
