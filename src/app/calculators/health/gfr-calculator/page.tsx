import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import GfrCalculator from "./GfrCalculator";

export const metadata: Metadata = generateCalculatorMetadata("gfr-calculator");

export default function GfrCalculatorPage() {
  return <GfrCalculator />;
}
