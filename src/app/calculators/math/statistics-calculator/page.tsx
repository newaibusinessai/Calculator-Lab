import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import StatisticsCalculator from "./StatisticsCalculator";

export const metadata: Metadata = generateCalculatorMetadata("statistics-calculator");

export default function StatisticsCalculatorPage() {
  return <StatisticsCalculator />;
}
