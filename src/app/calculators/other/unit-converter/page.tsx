import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import UnitConverter from "./UnitConverter";

export const metadata: Metadata = generateCalculatorMetadata("unit-converter");

export default function UnitConverterPage() {
  return <UnitConverter />;
}
