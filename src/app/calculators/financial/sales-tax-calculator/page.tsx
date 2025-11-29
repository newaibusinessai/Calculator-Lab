import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SalesTaxCalculator from "./SalesTaxCalculator";

export const metadata: Metadata = generateCalculatorMetadata("sales-tax-calculator");

export default function SalesTaxCalculatorPage() {
  return <SalesTaxCalculator />;
}
