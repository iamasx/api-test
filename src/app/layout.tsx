import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Adil Shaikh",
    template: "%s | Adil Shaikh",
  },
  description:
    "Portfolio, engineering writing, and delivery-focused case studies spanning real-time apps, infrastructure, and TypeScript-heavy frontend work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <div className="page-glow page-glow-top" />
        <div className="page-glow page-glow-bottom" />
        <SiteHeader />
        <div className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">{children}</div>
      </body>
    </html>
  );
}
