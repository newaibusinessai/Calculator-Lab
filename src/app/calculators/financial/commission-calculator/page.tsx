import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CommissionCalculator from "./CommissionCalculator";

export const metadata: Metadata = generateCalculatorMetadata("commission-calculator");

export default function CommissionCalculatorPage() {
  return <CommissionCalculator />;
}
