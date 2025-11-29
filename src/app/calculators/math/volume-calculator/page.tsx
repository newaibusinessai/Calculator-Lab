import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import VolumeCalculator from "./VolumeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("volume-calculator");

export default function VolumeCalculatorPage() {
  return <VolumeCalculator />;
}
