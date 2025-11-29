import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SavingsCalculator from "./SavingsCalculator";

export const metadata: Metadata = generateCalculatorMetadata("savings-calculator");

export default function SavingsCalculatorPage() {
  return <SavingsCalculator />;
}
