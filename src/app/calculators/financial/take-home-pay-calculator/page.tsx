import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TakeHomePayCalculator from "./TakeHomePayCalculator";

export const metadata: Metadata = generateCalculatorMetadata("take-home-pay-calculator");

export default function TakeHomePayCalculatorPage() {
  return <TakeHomePayCalculator />;
}
