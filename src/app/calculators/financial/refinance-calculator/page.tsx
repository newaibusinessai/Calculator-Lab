import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RefinanceCalculator from "./RefinanceCalculator";

export const metadata: Metadata = generateCalculatorMetadata("refinance-calculator");

export default function RefinanceCalculatorPage() {
  return <RefinanceCalculator />;
}
