"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavBar from "../ui/NavBar";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <NavBar/>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}