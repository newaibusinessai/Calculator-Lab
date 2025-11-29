import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DrywallCalculator from "./DrywallCalculator";

export const metadata: Metadata = generateCalculatorMetadata("drywall-calculator");

export default function DrywallCalculatorPage() {
  return <DrywallCalculator />;
}
