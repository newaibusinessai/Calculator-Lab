import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BacCalculator from "./BacCalculator";

export const metadata: Metadata = generateCalculatorMetadata("bac-calculator");

export default function BacCalculatorPage() {
  return <BacCalculator />;
}
