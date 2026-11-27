import React, { Suspense } from "react";
import Link from "next/link";
import { fetchFilteredInvoices, fetchTotalPages } from "@/app/data";
import InvoicesTable from "@/app/ui/InvoicesTable";
import SearchInput from "./SearchInput";
import { Spin } from "antd";

export const dynamic = "force-dynamic";

function buildPageUrl(search: string, page: number) {
  const params = new URLSearchParams();
  if (search) {
    params.set("search", search);
  }
  params.set("page", String(page));
  return `/dashboard/invoices?${params.toString()}`;
}

async function InvoicesTableSection({
  search,
  currentPage,
}: {
  search: string;
  currentPage: number;
}) {
  const [invoices, totalPages] = await Promise.all([
    fetchFilteredInvoices(search, currentPage),
    fetchTotalPages(search),
  ]);

  if (invoices.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 p-6 text-center text-sm text-slate-400">
        Không tìm thấy hóa đơn nào
      </div>
    );
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <InvoicesTable invoices={invoices} showActions={true} />

      {totalPages > 1 && (
        <nav className="flex items-center justify-end gap-2 pt-2">
          {pages.map((page) => {
            const isCurrent = page === currentPage;
            return (
              <Link
                key={page}
                href={buildPageUrl(search, page)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  isCurrent
                    ? "bg-blue-600 text-white"
                    : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {page}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search ?? "";
  const parsedPage = Number(resolvedParams.page);
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Hóa đơn</h1>
        <Link
          href="/dashboard/invoices/create"
          className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-500 whitespace-nowrap"
        >
          Tạo hóa đơn
        </Link>
      </div>

      <SearchInput initialSearch={search} />

      <Suspense
        fallback={
          <div className="flex h-48 items-center justify-center">
            <Spin size="large" />
          </div>
        }
      >
        <InvoicesTableSection search={search} currentPage={currentPage} />
      </Suspense>
    </section>
  );
}
