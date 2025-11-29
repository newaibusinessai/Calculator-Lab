import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PregnancyCalculator from "./PregnancyCalculator";

export const metadata: Metadata = generateCalculatorMetadata("pregnancy-calculator");

export default function PregnancyCalculatorPage() {
  return <PregnancyCalculator />;
}
