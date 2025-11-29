import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import OhmsLawCalculator from "./OhmsLawCalculator";

export const metadata: Metadata = generateCalculatorMetadata("ohms-law-calculator");

export default function OhmsLawCalculatorPage() {
  return <OhmsLawCalculator />;
}
