'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Customer", href: "/dashboard/customer" },
  { name: "Invoice", href: "/dashboard/invoice" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <ul className="flex gap-4 text-blue-600">
      {navItems.map((item) => {
        // Kiểm tra đường dẫn hiện tại có khớp với href của mục này không
        const isActive = pathname === item.href;

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`text-inherit ${
                isActive ? "font-bold " : "font-normal hover:opacity-80"
              }`}
            >
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
