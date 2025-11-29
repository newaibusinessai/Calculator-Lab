import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TemperatureConverter from "./TemperatureConverter";

export const metadata: Metadata = generateCalculatorMetadata("temperature-converter");

export default function TemperatureConverterPage() {
  return <TemperatureConverter />;
}
