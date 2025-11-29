import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import LengthConverter from "./LengthConverter";

export const metadata: Metadata = generateCalculatorMetadata("length-converter");

export default function LengthConverterPage() {
  return <LengthConverter />;
}
