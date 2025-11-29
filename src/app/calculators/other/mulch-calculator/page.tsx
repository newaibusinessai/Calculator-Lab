import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MulchCalculator from "./MulchCalculator";

export const metadata: Metadata = generateCalculatorMetadata("mulch-calculator");

export default function MulchCalculatorPage() {
  return <MulchCalculator />;
}
