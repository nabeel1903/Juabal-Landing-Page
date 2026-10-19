import type { Metadata } from "next";
import { PricingPage } from "@/components/PricingPage";

export const metadata: Metadata = {
  title: "Pricing | Jubala AI Voice Agent",
  description:
    "Compare Jubala plans for an AI receptionist that answers calls, books appointments, captures leads, and keeps complete call records.",
};

export default function Pricing() {
  return <PricingPage />;
}
