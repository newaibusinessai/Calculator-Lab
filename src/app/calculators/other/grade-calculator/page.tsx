import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import GradeCalculator from "./GradeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("grade-calculator");

export default function GradeCalculatorPage() {
  return <GradeCalculator />;
}
