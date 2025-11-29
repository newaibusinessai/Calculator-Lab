import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ConversionCalculator from "./ConversionCalculator";

export const metadata: Metadata = generateCalculatorMetadata("conversion-calculator");

export default function ConversionCalculatorPage() {
  return <ConversionCalculator />;
}
