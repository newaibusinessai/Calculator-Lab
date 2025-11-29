import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AprCalculator from "./AprCalculator";

export const metadata: Metadata = generateCalculatorMetadata("apr-calculator");

export default function AprCalculatorPage() {
  return <AprCalculator />;
}
