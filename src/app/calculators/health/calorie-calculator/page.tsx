import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CalorieCalculator from "./CalorieCalculator";

export const metadata: Metadata = generateCalculatorMetadata("calorie-calculator");

export default function CalorieCalculatorPage() {
  return <CalorieCalculator />;
}
