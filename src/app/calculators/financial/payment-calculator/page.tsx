import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PaymentCalculator from "./PaymentCalculator";

export const metadata: Metadata = generateCalculatorMetadata("payment-calculator");

export default function PaymentCalculatorPage() {
  return <PaymentCalculator />;
}
