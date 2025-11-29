import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BmrCalculator from "./BmrCalculator";

export const metadata: Metadata = generateCalculatorMetadata("bmr-calculator");

export default function BmrCalculatorPage() {
  return <BmrCalculator />;
}
