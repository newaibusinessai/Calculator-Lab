import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ConceptionCalculator from "./ConceptionCalculator";

export const metadata: Metadata = generateCalculatorMetadata("conception-calculator");

export default function ConceptionCalculatorPage() {
  return <ConceptionCalculator />;
}
