import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import OneRepMaxCalculator from "./OneRepMaxCalculator";

export const metadata: Metadata = generateCalculatorMetadata("one-rep-max-calculator");

export default function OneRepMaxCalculatorPage() {
  return <OneRepMaxCalculator />;
}
