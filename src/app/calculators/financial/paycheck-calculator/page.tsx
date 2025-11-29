import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PaycheckCalculator from "./PaycheckCalculator";

export const metadata: Metadata = generateCalculatorMetadata("paycheck-calculator");

export default function PaycheckCalculatorPage() {
  return <PaycheckCalculator />;
}
