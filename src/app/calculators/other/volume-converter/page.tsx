import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import VolumeConverter from "./VolumeConverter";

export const metadata: Metadata = generateCalculatorMetadata("volume-converter");

export default function VolumeConverterPage() {
  return <VolumeConverter />;
}
