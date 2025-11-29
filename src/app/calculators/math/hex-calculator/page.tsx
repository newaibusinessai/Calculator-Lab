import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import HexCalculator from "./HexCalculator";

export const metadata: Metadata = generateCalculatorMetadata("hex-calculator");

export default function HexCalculatorPage() {
  return <HexCalculator />;
}
