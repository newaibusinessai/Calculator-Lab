import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CdCalculator from "./CdCalculator";

export const metadata: Metadata = generateCalculatorMetadata("cd-calculator");

export default function CdCalculatorPage() {
  return <CdCalculator />;
}
