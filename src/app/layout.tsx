import type { Metadata } from "next";
import "@fontsource-variable/newsreader/index.css";
import "./globals.css";
import "./redesign.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jubala.ai"),
  title: "Jubala | Every Call Answered",
  description:
    "A natural AI voice agent that answers calls, books appointments, captures leads, and supports your customers around the clock.",
  openGraph: {
    title: "Jubala | Your always-on AI receptionist",
    description:
      "Stop losing calls. Give every caller a helpful, human-sounding response, 24/7.",
    type: "website",
    images: ["/jubala-mark.png"],
  },
  icons: {
    icon: "/jubala-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
