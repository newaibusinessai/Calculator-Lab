import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import CarbohydrateCalculator from "./CarbohydrateCalculator";

export const metadata: Metadata = generateCalculatorMetadata("carbohydrate-calculator");

export default function CarbohydrateCalculatorPage() {
  return <CarbohydrateCalculator />;
}
