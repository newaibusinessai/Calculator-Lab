import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SpeedCalculator from "./SpeedCalculator";

export const metadata: Metadata = generateCalculatorMetadata("speed-calculator");

export default function SpeedCalculatorPage() {
  return <SpeedCalculator />;
}
