import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { DbLookupsProvider } from "@/contexts/DbLookupsContext";
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
  title: "The Astrogator's Table",
  description: "A Star Wars: Galaxy of Heroes resource optimization tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <DbLookupsProvider>{children}</DbLookupsProvider>
      </body>
    </html>
  );
}
