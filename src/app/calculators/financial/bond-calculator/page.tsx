import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BondCalculator from "./BondCalculator";

export const metadata: Metadata = generateCalculatorMetadata("bond-calculator");

export default function BondCalculatorPage() {
  return <BondCalculator />;
}
