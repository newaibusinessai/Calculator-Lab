import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SpeedConverter from "./SpeedConverter";

export const metadata: Metadata = generateCalculatorMetadata("speed-converter");

export default function SpeedConverterPage() {
  return <SpeedConverter />;
}
