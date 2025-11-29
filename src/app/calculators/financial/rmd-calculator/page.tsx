import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RmdCalculator from "./RmdCalculator";

export const metadata: Metadata = generateCalculatorMetadata("rmd-calculator");

export default function RmdCalculatorPage() {
  return <RmdCalculator />;
}
