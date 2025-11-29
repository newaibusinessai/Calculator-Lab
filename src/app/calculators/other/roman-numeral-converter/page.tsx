import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RomanNumeralConverter from "./RomanNumeralConverter";

export const metadata: Metadata = generateCalculatorMetadata("roman-numeral-converter");

export default function RomanNumeralConverterPage() {
  return <RomanNumeralConverter />;
}
