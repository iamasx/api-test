import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ThemeScript } from "@/components/ThemeScript";
import { siteProfile } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexrivera.dev"),
  title: {
    default: `${siteProfile.name} | ${siteProfile.title}`,
    template: `%s | ${siteProfile.name}`,
  },
  description: siteProfile.bio,
  applicationName: siteProfile.name,
  authors: [{ name: siteProfile.name, url: siteProfile.links.github }],
  creator: siteProfile.name,
  icons: {
    icon: [
      { type: "image/svg+xml", url: "/icon.svg" },
      { url: "/favicon.ico" },
    ],
  },
  keywords: [
    "Alex Rivera",
    "Full Stack Developer",
    "Open Source",
    "Next.js Portfolio",
    "TypeScript",
    "React",
  ],
  openGraph: {
    title: `${siteProfile.name} | ${siteProfile.title}`,
    description: siteProfile.bio,
    locale: "en_US",
    siteName: siteProfile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: siteProfile.twitterHandle,
    description: siteProfile.bio,
    title: `${siteProfile.name} | ${siteProfile.title}`,
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1e8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1518" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetBrainsMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-canvas font-sans text-text antialiased">
        <div className="relative flex min-h-screen flex-col overflow-x-clip">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
