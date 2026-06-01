import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "./components/ScrollProgress";

const alliance = localFont({
  src: "../public/fonts/AllianceNo2-Regular.otf",
  variable: "--font-alliance",
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Athreix · AI Automation Studio",
  description:
    "An AI automation studio building custom agents, AI SaaS platforms, internal tools, and production-grade ML for teams that move fast.",
  keywords: ["AI automation", "AI agents", "AI SaaS", "machine learning", "custom AI", "Athreix"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alliance.variable} ${inter.variable} ${mono.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full bg-black text-white flex flex-col overflow-x-hidden w-full max-w-[100vw]">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
