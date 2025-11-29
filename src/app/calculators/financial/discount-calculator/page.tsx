import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DiscountCalculator from "./DiscountCalculator";

export const metadata: Metadata = generateCalculatorMetadata("discount-calculator");

export default function DiscountCalculatorPage() {
  return <DiscountCalculator />;
}
