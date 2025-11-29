import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import PasswordGenerator from "./PasswordGenerator";

export const metadata: Metadata = generateCalculatorMetadata("password-generator");

export default function PasswordGeneratorPage() {
  return <PasswordGenerator />;
}
