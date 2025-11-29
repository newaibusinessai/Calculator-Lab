import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RentCalculator from "./RentCalculator";

export const metadata: Metadata = generateCalculatorMetadata("rent-calculator");

export default function RentCalculatorPage() {
  return <RentCalculator />;
}
