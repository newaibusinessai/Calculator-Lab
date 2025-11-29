import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import IraCalculator from "./IraCalculator";

export const metadata: Metadata = generateCalculatorMetadata("ira-calculator");

export default function IraCalculatorPage() {
  return <IraCalculator />;
}
