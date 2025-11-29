import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import ConcreteCalculator from "./ConcreteCalculator";

export const metadata: Metadata = generateCalculatorMetadata("concrete-calculator");

export default function ConcreteCalculatorPage() {
  return <ConcreteCalculator />;
}
