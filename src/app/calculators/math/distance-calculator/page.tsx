import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DistanceCalculator from "./DistanceCalculator";

export const metadata: Metadata = generateCalculatorMetadata("distance-calculator");

export default function DistanceCalculatorPage() {
  return <DistanceCalculator />;
}
