import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MassCalculator from "./MassCalculator";

export const metadata: Metadata = generateCalculatorMetadata("mass-calculator");

export default function MassCalculatorPage() {
  return <MassCalculator />;
}
