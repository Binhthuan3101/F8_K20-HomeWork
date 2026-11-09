import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter } from "next/font/google";
import "./globals.css";


const inter=Inter({subsets:["latin"]})
export const metadata: Metadata = {
  title: "K20 Day 44 - Product Dashboard",
  description: "Next.js Product Dashboard with Express API",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-950 text-slate-100 ">{children}</body>
    </html>
  );
}
