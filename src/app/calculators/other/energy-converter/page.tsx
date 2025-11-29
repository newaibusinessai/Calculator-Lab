import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import EnergyConverter from "./EnergyConverter";

export const metadata: Metadata = generateCalculatorMetadata("energy-converter");

export default function EnergyConverterPage() {
  return <EnergyConverter />;
}
