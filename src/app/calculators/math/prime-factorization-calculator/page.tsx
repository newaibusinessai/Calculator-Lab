import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PrimeFactorizationCalculator from "./PrimeFactorizationCalculator";

export const metadata: Metadata = generateCalculatorMetadata("prime-factorization-calculator");

export default function PrimeFactorizationCalculatorPage() {
  return <PrimeFactorizationCalculator />;
}
