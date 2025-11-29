import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PowerConverter from "./PowerConverter";

export const metadata: Metadata = generateCalculatorMetadata("power-converter");

export default function PowerConverterPage() {
  return <PowerConverter />;
}
