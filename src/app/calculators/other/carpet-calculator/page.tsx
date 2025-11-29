import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CarpetCalculator from "./CarpetCalculator";

export const metadata: Metadata = generateCalculatorMetadata("carpet-calculator");

export default function CarpetCalculatorPage() {
  return <CarpetCalculator />;
}
