import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SimpleInterestCalculator from "./SimpleInterestCalculator";

export const metadata: Metadata = generateCalculatorMetadata("simple-interest-calculator");

export default function SimpleInterestCalculatorPage() {
  return <SimpleInterestCalculator />;
}
