import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BraSizeCalculator from "./BraSizeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("bra-size-calculator");

export default function BraSizeCalculatorPage() {
  return <BraSizeCalculator />;
}
