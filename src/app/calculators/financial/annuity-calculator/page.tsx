import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AnnuityCalculator from "./AnnuityCalculator";

export const metadata: Metadata = generateCalculatorMetadata("annuity-calculator");

export default function AnnuityCalculatorPage() {
  return <AnnuityCalculator />;
}
