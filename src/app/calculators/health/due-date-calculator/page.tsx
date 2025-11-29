import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DueDateCalculator from "./DueDateCalculator";

export const metadata: Metadata = generateCalculatorMetadata("due-date-calculator");

export default function DueDateCalculatorPage() {
  return <DueDateCalculator />;
}
