import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import FatIntakeCalculator from "./FatIntakeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("fat-intake-calculator");

export default function FatIntakeCalculatorPage() {
  return <FatIntakeCalculator />;
}
