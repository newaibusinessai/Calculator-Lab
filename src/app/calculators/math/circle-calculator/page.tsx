import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CircleCalculator from "./CircleCalculator";

export const metadata: Metadata = generateCalculatorMetadata("circle-calculator");

export default function CircleCalculatorPage() {
  return <CircleCalculator />;
}
