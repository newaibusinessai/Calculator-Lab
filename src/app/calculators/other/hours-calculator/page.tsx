import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import HoursCalculator from "./HoursCalculator";

export const metadata: Metadata = generateCalculatorMetadata("hours-calculator");

export default function HoursCalculatorPage() {
  return <HoursCalculator />;
}
