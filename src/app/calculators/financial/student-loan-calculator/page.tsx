import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import StudentLoanCalculator from "./StudentLoanCalculator";

export const metadata: Metadata = generateCalculatorMetadata("student-loan-calculator");

export default function StudentLoanCalculatorPage() {
  return <StudentLoanCalculator />;
}
