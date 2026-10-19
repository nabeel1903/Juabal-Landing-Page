import type { Metadata } from "next";
import { ContactPage } from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Start Your Free Test | Jubala",
  description:
    "Tell Jubala about your business and start testing a customized AI voice receptionist in your browser.",
};

export default function Contact() {
  return <ContactPage />;
}
