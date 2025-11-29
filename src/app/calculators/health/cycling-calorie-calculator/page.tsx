import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CyclingCalorieCalculator from "./CyclingCalorieCalculator";

export const metadata: Metadata = generateCalculatorMetadata("cycling-calorie-calculator");

export default function CyclingCalorieCalculatorPage() {
  return <CyclingCalorieCalculator />;
}
