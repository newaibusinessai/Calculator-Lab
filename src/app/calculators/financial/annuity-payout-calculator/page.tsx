import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import AnnuityPayoutCalculator from "./AnnuityPayoutCalculator";

export const metadata: Metadata = generateCalculatorMetadata("annuity-payout-calculator");

export default function AnnuityPayoutCalculatorPage() {
  return <AnnuityPayoutCalculator />;
}
