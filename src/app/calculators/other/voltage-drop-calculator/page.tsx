import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import VoltageDropCalculator from "./VoltageDropCalculator";

export const metadata: Metadata = generateCalculatorMetadata("voltage-drop-calculator");

export default function VoltageDropCalculatorPage() {
  return <VoltageDropCalculator />;
}
