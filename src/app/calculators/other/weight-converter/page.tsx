import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import WeightConverter from "./WeightConverter";

export const metadata: Metadata = generateCalculatorMetadata("weight-converter");

export default function WeightConverterPage() {
  return <WeightConverter />;
}
