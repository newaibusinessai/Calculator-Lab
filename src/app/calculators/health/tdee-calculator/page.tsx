import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TdeeCalculator from "./TdeeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("tdee-calculator");

export default function TdeeCalculatorPage() {
  return <TdeeCalculator />;
}
