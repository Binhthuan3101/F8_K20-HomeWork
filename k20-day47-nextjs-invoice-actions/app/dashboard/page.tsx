import { Spin } from "antd";
import LatestInvoicesTable from "../ui/InvoicesTable";
import { Suspense } from "react";
import { fetchLatestInvoices } from "../data";
import InvoicesTable from "../ui/InvoicesTable";
export const dynamic = "force-dynamic";
async function LatestInvoicesSection() {
  const latestInvoices = await fetchLatestInvoices();
  return <InvoicesTable invoices={latestInvoices} showActions={false} />;
}

export default async function DashboardPage() {
  return (
    <div>
      <section>
        <h1 className="mb-4 text-2xl font-bold">
          Dashboard - 5 hóa đơn mới nhất
        </h1>
        <Suspense
          fallback={
            <div className="flex h-48 items-center justify-center">
              <Spin size="large" />
            </div>
          }
        >
          <LatestInvoicesSection />
        </Suspense>
      </section>
    </div>
  );
}
