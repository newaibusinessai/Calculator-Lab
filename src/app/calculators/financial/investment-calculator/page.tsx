import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import InvestmentCalculator from "./InvestmentCalculator";

export const metadata: Metadata = generateCalculatorMetadata("investment-calculator");

export default function InvestmentCalculatorPage() {
  return <InvestmentCalculator />;
}
