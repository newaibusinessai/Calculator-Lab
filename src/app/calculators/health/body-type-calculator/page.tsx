import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import BodyTypeCalculator from "./BodyTypeCalculator";

export const metadata: Metadata = generateCalculatorMetadata("body-type-calculator");

export default function BodyTypeCalculatorPage() {
  return <BodyTypeCalculator />;
}
