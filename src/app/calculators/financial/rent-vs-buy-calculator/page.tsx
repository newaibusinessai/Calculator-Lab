import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RentVsBuyCalculator from "./RentVsBuyCalculator";

export const metadata: Metadata = generateCalculatorMetadata("rent-vs-buy-calculator");

export default function RentVsBuyCalculatorPage() {
  return <RentVsBuyCalculator />;
}
