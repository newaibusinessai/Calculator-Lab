import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MileageCalculator from "./MileageCalculator";

export const metadata: Metadata = generateCalculatorMetadata("mileage-calculator");

export default function MileageCalculatorPage() {
  return <MileageCalculator />;
}
