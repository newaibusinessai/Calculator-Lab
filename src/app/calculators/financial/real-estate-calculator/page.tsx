import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RealEstateCalculator from "./RealEstateCalculator";

export const metadata: Metadata = generateCalculatorMetadata("real-estate-calculator");

export default function RealEstateCalculatorPage() {
  return <RealEstateCalculator />;
}
