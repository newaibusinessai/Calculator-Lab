import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RootCalculator from "./RootCalculator";

export const metadata: Metadata = generateCalculatorMetadata("root-calculator");

export default function RootCalculatorPage() {
  return <RootCalculator />;
}
