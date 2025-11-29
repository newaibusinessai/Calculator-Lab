import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SquareRootCalculator from "./SquareRootCalculator";

export const metadata: Metadata = generateCalculatorMetadata("square-root-calculator");

export default function SquareRootCalculatorPage() {
  return <SquareRootCalculator />;
}
