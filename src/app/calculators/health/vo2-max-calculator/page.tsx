import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import Vo2MaxCalculator from "./Vo2MaxCalculator";

export const metadata: Metadata = generateCalculatorMetadata("vo2-max-calculator");

export default function Vo2MaxCalculatorPage() {
  return <Vo2MaxCalculator />;
}
