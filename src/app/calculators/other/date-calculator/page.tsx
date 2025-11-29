import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DateCalculator from "./DateCalculator";

export const metadata: Metadata = generateCalculatorMetadata("date-calculator");

export default function DateCalculatorPage() {
  return <DateCalculator />;
}
