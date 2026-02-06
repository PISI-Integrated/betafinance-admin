
import SpinContent from "@/components/spin/SpinContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spin Management | Betafinance",
  description: "Manage spin wheel rewards and view history",
};

export default function SpinPage() {
  return <SpinContent />;
}
