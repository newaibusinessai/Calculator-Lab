import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DiceRoller from "./DiceRoller";

export const metadata: Metadata = generateCalculatorMetadata("dice-roller");

export default function DiceRollerPage() {
  return <DiceRoller />;
}
