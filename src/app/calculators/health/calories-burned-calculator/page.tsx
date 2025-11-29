import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CaloriesBurnedCalculator from "./CaloriesBurnedCalculator";

export const metadata: Metadata = generateCalculatorMetadata("calories-burned-calculator");

export default function CaloriesBurnedCalculatorPage() {
  return <CaloriesBurnedCalculator />;
}
