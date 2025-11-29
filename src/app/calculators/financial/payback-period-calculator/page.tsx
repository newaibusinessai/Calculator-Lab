import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PaybackPeriodCalculator from "./PaybackPeriodCalculator";

export const metadata: Metadata = generateCalculatorMetadata("payback-period-calculator");

export default function PaybackPeriodCalculatorPage() {
  return <PaybackPeriodCalculator />;
}
