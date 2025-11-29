import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RetirementCalculator from "./RetirementCalculator";

export const metadata: Metadata = generateCalculatorMetadata("retirement-calculator");

export default function RetirementCalculatorPage() {
  return <RetirementCalculator />;
}
