import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import IpSubnetCalculator from "./IpSubnetCalculator";

export const metadata: Metadata = generateCalculatorMetadata("ip-subnet-calculator");

export default function IpSubnetCalculatorPage() {
  return <IpSubnetCalculator />;
}
