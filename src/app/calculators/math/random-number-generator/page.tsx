import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RandomNumberGenerator from "./RandomNumberGenerator";

export const metadata: Metadata = generateCalculatorMetadata("random-number-generator");

export default function RandomNumberGeneratorPage() {
  return <RandomNumberGenerator />;
}
