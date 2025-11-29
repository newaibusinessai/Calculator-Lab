import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import InflationCalculator from "./InflationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("inflation-calculator");

export default function InflationCalculatorPage() {
  return <InflationCalculator />;
}
