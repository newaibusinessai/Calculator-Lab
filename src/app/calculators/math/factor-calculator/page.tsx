import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import FactorCalculator from "./FactorCalculator";

export const metadata: Metadata = generateCalculatorMetadata("factor-calculator");

export default function FactorCalculatorPage() {
  return <FactorCalculator />;
}
