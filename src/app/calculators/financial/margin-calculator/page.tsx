import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MarginCalculator from "./MarginCalculator";

export const metadata: Metadata = generateCalculatorMetadata("margin-calculator");

export default function MarginCalculatorPage() {
  return <MarginCalculator />;
}
