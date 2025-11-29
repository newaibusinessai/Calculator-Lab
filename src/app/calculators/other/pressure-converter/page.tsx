import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PressureConverter from "./PressureConverter";

export const metadata: Metadata = generateCalculatorMetadata("pressure-converter");

export default function PressureConverterPage() {
  return <PressureConverter />;
}
