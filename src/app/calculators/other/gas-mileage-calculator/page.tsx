import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/metadata";
import GasMileageCalculator from "./GasMileageCalculator";

export const metadata: Metadata = generateCalculatorMetadata("gas-mileage-calculator");

export default function GasMileageCalculatorPage() {
  return <GasMileageCalculator />;
}
