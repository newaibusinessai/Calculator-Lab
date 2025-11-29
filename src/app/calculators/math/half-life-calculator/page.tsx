import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import HalfLifeCalculator from "./HalfLifeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("half-life-calculator");

export default function HalfLifeCalculatorPage() {
  return <HalfLifeCalculator />;
}
