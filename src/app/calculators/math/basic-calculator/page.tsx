import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BasicCalculator from "./BasicCalculator";

export const metadata: Metadata = generateCalculatorMetadata("basic-calculator");

export default function BasicCalculatorPage() {
  return <BasicCalculator />;
}
