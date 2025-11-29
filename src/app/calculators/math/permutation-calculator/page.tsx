import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PermutationCalculator from "./PermutationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("permutation-calculator");

export default function PermutationCalculatorPage() {
  return <PermutationCalculator />;
}
