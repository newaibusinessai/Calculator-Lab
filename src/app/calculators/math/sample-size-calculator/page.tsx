import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SampleSizeCalculator from "./SampleSizeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("sample-size-calculator");

export default function SampleSizeCalculatorPage() {
  return <SampleSizeCalculator />;
}
