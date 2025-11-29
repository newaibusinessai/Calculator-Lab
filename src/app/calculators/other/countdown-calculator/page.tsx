import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CountdownCalculator from "./CountdownCalculator";

export const metadata: Metadata = generateCalculatorMetadata("countdown-calculator");

export default function CountdownCalculatorPage() {
  return <CountdownCalculator />;
}
