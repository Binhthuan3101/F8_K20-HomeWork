import { fetchFilteredInvoices, fetchTotalPage } from "@/app/data";
import { Spin } from "antd";
import React, { Suspense } from "react";
import SearchInput from "./SearchInput";
import LatestInvoicesTable from "@/app/ui/LatestInvoicesTable";
import Link from "next/link";

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
    fetchTotalPage(search),
  ]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="space-y-4">
      <LatestInvoicesTable invoices={invoices} />

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
      <h1 className="text-2xl font-bold">Hóa đơn</h1>

      <div className="flex gap-2 items-center">
        <SearchInput initialSearch={search} />
        <Link
          className="px-5 py-1 bg-amber-500 rounded"
          href="/dashboard/invoices/create"
        >
          Tạo
        </Link>
      </div>

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
