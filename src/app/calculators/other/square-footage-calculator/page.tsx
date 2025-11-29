import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SquareFootageCalculator from "./SquareFootageCalculator";

export const metadata: Metadata = generateCalculatorMetadata("square-footage-calculator");

export default function SquareFootageCalculatorPage() {
  return <SquareFootageCalculator />;
}
