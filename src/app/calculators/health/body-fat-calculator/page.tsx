import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BodyFatCalculator from "./BodyFatCalculator";

export const metadata: Metadata = generateCalculatorMetadata("body-fat-calculator");

export default function BodyFatCalculatorPage() {
  return <BodyFatCalculator />;
}
