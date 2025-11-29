import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import UkSalaryCalculator from "./UkSalaryCalculator";

export const metadata: Metadata = generateCalculatorMetadata("uk-salary-calculator");

export default function UkSalaryCalculatorPage() {
  return <UkSalaryCalculator />;
}
