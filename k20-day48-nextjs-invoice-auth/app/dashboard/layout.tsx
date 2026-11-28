import React from "react";
import NavBar from "@/app/ui/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white md:flex-row">
      <NavBar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}