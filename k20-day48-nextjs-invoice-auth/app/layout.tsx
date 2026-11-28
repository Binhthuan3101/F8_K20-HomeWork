import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K20 Day 47 - Next.js Invoice Actions",
  description:
    "Quản lý hóa đơn và khách hàng với Next.js Server Actions & Neon Postgres",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-white">{children}</body>
    </html>
  );
}
