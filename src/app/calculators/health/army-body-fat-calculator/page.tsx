import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ArmyBodyFatCalculator from "./ArmyBodyFatCalculator";

export const metadata: Metadata = generateCalculatorMetadata("army-body-fat-calculator");

export default function ArmyBodyFatCalculatorPage() {
  return <ArmyBodyFatCalculator />;
}
