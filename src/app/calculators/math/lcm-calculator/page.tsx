import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import LcmCalculator from "./LcmCalculator";

export const metadata: Metadata = generateCalculatorMetadata("lcm-calculator");

export default function LcmCalculatorPage() {
  return <LcmCalculator />;
}
