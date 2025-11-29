import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TireSizeCalculator from "./TireSizeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("tire-size-calculator");

export default function TireSizeCalculatorPage() {
  return <TireSizeCalculator />;
}
