import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import GcfCalculator from "./GcfCalculator";

export const metadata: Metadata = generateCalculatorMetadata("gcf-calculator");

export default function GcfCalculatorPage() {
  return <GcfCalculator />;
}
