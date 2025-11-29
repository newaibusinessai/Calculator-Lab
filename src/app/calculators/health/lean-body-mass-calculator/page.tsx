import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import LeanBodyMassCalculator from "./LeanBodyMassCalculator";

export const metadata: Metadata = generateCalculatorMetadata("lean-body-mass-calculator");

export default function LeanBodyMassCalculatorPage() {
  return <LeanBodyMassCalculator />;
}
