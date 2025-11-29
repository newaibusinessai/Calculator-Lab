import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BigNumberCalculator from "./BigNumberCalculator";

export const metadata: Metadata = generateCalculatorMetadata("big-number-calculator");

export default function BigNumberCalculatorPage() {
  return <BigNumberCalculator />;
}
