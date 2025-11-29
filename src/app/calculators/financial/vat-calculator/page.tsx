import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import VatCalculator from "./VatCalculator";

export const metadata: Metadata = generateCalculatorMetadata("vat-calculator");

export default function VatCalculatorPage() {
  return <VatCalculator />;
}
