import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"]
})


export const metadata: Metadata = {
  title: "K20 Day 46 - Next.js & Neon Dashboard",
  description: "Dashboard hóa đơn và khách hàng kết nối trực tiếp Neon Postgres",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` ${inter.className} h-full antialiased`}
    >
      <body className="bg-black">{children}</body>
    </html>
  );
}
