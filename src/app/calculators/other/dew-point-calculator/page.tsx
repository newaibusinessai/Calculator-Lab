import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DewPointCalculator from "./DewPointCalculator";

export const metadata: Metadata = generateCalculatorMetadata("dew-point-calculator");

export default function DewPointCalculatorPage() {
  return <DewPointCalculator />;
}
