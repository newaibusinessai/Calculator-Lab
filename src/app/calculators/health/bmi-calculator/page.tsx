import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BmiCalculator from "./BmiCalculator";

export const metadata: Metadata = generateCalculatorMetadata("bmi-calculator");

export default function BmiCalculatorPage() {
  return <BmiCalculator />;
}
