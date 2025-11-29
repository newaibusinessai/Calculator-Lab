import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RentalPropertyCalculator from "./RentalPropertyCalculator";

export const metadata: Metadata = generateCalculatorMetadata("rental-property-calculator");

export default function RentalPropertyCalculatorPage() {
  return <RentalPropertyCalculator />;
}
