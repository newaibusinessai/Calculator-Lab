import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import RothIraCalculator from "./RothIraCalculator";

export const metadata: Metadata = generateCalculatorMetadata("roth-ira-calculator");

export default function RothIraCalculatorPage() {
  return <RothIraCalculator />;
}
