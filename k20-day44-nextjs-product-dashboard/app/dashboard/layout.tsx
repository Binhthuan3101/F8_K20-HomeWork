import Link from "next/link";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/dashboard"
            className=" font-bold text-lg text-purple-400 tracking-wide"
          >
            Dashboard
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="text-slate-400 hover:text-slate-200 transition"
            >
              Trang chủ
            </Link>
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-purple-400 transition"
            >
              Tổng quan
            </Link>
            <Link
              href="/dashboard/products"
              className="text-slate-300 hover:text-purple-400 transition"
            >
              Danh sách sản phẩm
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto p-6">{children}</main>
      <footer className="bg-slate-900 border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        K20 Day 44 - Next.js Product Dashboard &copy; 2026
      </footer>
    </div>
  );
}
