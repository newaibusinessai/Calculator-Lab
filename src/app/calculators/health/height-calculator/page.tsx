import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import HeightCalculator from "./HeightCalculator";

export const metadata: Metadata = generateCalculatorMetadata("height-calculator");

export default function HeightCalculatorPage() {
  return <HeightCalculator />;
}
