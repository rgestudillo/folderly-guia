import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import 'mapbox-gl/dist/mapbox-gl.css';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Folderly Guia",
  description:
    "Empowering sustainable development through innovative environmental assessments",
  keywords:
    "sustainability, environmental planning, project assessment, green development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} ${inter.variable} flex flex-col min-h-screen antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50`}
      >
        <ThemeProvider defaultTheme="system" storageKey="guia-theme">
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
