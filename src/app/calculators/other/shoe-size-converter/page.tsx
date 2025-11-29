import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ShoeSizeConverter from "./ShoeSizeConverter";

export const metadata: Metadata = generateCalculatorMetadata("shoe-size-converter");

export default function ShoeSizeConverterPage() {
  return <ShoeSizeConverter />;
}
