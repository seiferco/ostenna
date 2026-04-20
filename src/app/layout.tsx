import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ostenna — Used Kitchen & Espresso Marketplace",
    template: "%s | Ostenna",
  },
  description:
    "The marketplace for quality used kitchen and espresso equipment. Zero fees. Trusted community.",
  keywords: [
    "used espresso machines",
    "used kitchen equipment",
    "espresso marketplace",
    "used grinders",
    "kitchen knives",
    "cookware",
  ],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
