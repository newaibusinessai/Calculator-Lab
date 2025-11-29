import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BoatLoanCalculator from "./BoatLoanCalculator";

export const metadata: Metadata = generateCalculatorMetadata("boat-loan-calculator");

export default function BoatLoanCalculatorPage() {
  return <BoatLoanCalculator />;
}
