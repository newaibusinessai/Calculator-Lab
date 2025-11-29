import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RoiCalculator from "./RoiCalculator";

export const metadata: Metadata = generateCalculatorMetadata("roi-calculator");

export default function RoiCalculatorPage() {
  return <RoiCalculator />;
}
