import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DbLookupsProvider } from "@/contexts/DbLookupsContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
      <body className={inter.variable}>
        <main className="main-container">
          <DbLookupsProvider>{children}</DbLookupsProvider>
        </main>
      </body>
    </html>
  );
}
