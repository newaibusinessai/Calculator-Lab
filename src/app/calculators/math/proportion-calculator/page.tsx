import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ProportionCalculator from "./ProportionCalculator";

export const metadata: Metadata = generateCalculatorMetadata("proportion-calculator");

export default function ProportionCalculatorPage() {
  return <ProportionCalculator />;
}
