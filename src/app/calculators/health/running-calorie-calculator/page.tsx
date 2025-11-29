import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RunningCalorieCalculator from "./RunningCalorieCalculator";

export const metadata: Metadata = generateCalculatorMetadata("running-calorie-calculator");

export default function RunningCalorieCalculatorPage() {
  return <RunningCalorieCalculator />;
}
