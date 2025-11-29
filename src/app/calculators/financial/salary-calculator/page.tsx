import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SalaryCalculator from "./SalaryCalculator";

export const metadata: Metadata = generateCalculatorMetadata("salary-calculator");

export default function SalaryCalculatorPage() {
  return <SalaryCalculator />;
}
