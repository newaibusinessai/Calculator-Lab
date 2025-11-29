import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import MarathonPaceCalculator from "./MarathonPaceCalculator";

export const metadata: Metadata = generateCalculatorMetadata("marathon-pace-calculator");

export default function MarathonPaceCalculatorPage() {
  return <MarathonPaceCalculator />;
}
