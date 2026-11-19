import { Spin, Table } from "antd";
import { fetchLatestInvoice } from "../data";
import LatestInvoicesTable from "../ui/LatestInvoicesTable";
import { Suspense } from "react";

async function LatestInvoicesSection() {
    const latestInvoices = await fetchLatestInvoice();
    console.log(latestInvoices);
    
  return <LatestInvoicesTable invoices={latestInvoices} />;
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
