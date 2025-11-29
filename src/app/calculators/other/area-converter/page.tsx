import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AreaConverter from "./AreaConverter";

export const metadata: Metadata = generateCalculatorMetadata("area-converter");

export default function AreaConverterPage() {
  return <AreaConverter />;
}
