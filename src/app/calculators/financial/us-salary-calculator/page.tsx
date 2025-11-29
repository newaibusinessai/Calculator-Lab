import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import UsSalaryCalculator from "./UsSalaryCalculator";

export const metadata: Metadata = generateCalculatorMetadata("us-salary-calculator");

export default function UsSalaryCalculatorPage() {
  return <UsSalaryCalculator />;
}
