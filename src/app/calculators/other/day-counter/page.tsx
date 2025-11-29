import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DayCounter from "./DayCounter";

export const metadata: Metadata = generateCalculatorMetadata("day-counter");

export default function DayCounterPage() {
  return <DayCounter />;
}
