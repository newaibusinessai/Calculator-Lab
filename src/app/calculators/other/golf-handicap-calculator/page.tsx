import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import GolfHandicapCalculator from "./GolfHandicapCalculator";

export const metadata: Metadata = generateCalculatorMetadata("golf-handicap-calculator");

export default function GolfHandicapCalculatorPage() {
  return <GolfHandicapCalculator />;
}
