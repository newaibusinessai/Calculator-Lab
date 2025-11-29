import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import StepsToCaloriesCalculator from "./StepsToCaloriesCalculator";

export const metadata: Metadata = generateCalculatorMetadata("steps-to-calories-calculator");

export default function StepsToCaloriesCalculatorPage() {
  return <StepsToCaloriesCalculator />;
}
