import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RepaymentCalculator from "./RepaymentCalculator";

export const metadata: Metadata = generateCalculatorMetadata("repayment-calculator");

export default function RepaymentCalculatorPage() {
  return <RepaymentCalculator />;
}
