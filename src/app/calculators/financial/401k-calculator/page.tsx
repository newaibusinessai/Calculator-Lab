import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import Calculator401k from "./Calculator401k";

export const metadata: Metadata = generateCalculatorMetadata("401k-calculator");

export default function Calculator401kPage() {
  return <Calculator401k />;
}

