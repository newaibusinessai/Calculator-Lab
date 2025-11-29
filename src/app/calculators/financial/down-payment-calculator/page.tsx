import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import DownPaymentCalculator from "./DownPaymentCalculator";

export const metadata: Metadata = generateCalculatorMetadata("down-payment-calculator");

export default function DownPaymentCalculatorPage() {
  return <DownPaymentCalculator />;
}
