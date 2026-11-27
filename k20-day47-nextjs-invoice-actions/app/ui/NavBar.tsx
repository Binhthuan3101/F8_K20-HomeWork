"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Invoices", href: "/dashboard/invoices" },
  { label: "Customers", href: "/dashboard/customers" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-slate-800 bg-slate-950 p-4 md:w-60 md:border-b-0 md:border-r">
      <div className="mb-6 text-lg font-semibold text-white">Neon Dashboard</div>
      <nav className="flex gap-2 md:flex-col">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}