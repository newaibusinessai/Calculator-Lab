import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import IrrCalculator from "./IrrCalculator";

export const metadata: Metadata = generateCalculatorMetadata("irr-calculator");

export default function IrrCalculatorPage() {
  return <IrrCalculator />;
}
