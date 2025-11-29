import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import TileCalculator from "./TileCalculator";

export const metadata: Metadata = generateCalculatorMetadata("tile-calculator");

export default function TileCalculatorPage() {
  return <TileCalculator />;
}
