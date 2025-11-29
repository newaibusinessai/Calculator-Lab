import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import SocialSecurityCalculator from "./SocialSecurityCalculator";

export const metadata: Metadata = generateCalculatorMetadata("social-security-calculator");

export default function SocialSecurityCalculatorPage() {
  return <SocialSecurityCalculator />;
}
