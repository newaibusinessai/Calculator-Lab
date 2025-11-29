import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import HorsepowerCalculator from "./HorsepowerCalculator";

export const metadata: Metadata = generateCalculatorMetadata("horsepower-calculator");

export default function HorsepowerCalculatorPage() {
  return <HorsepowerCalculator />;
}
