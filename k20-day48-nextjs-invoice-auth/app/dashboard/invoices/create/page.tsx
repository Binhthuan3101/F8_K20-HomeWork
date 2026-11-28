import { createInvoice } from "@/app/action";
import { fetchCustomers } from "@/app/data";
import InvoiceForm from "@/app/ui/InvoiceForm";

export const dynamic = "force-dynamic";

export default async function CreateInvoicePage() {
  const customers = await fetchCustomers();

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Tạo hóa đơn</h1>
      <InvoiceForm
        customers={customers}
        action={createInvoice}
        submitLabel="Tạo"
      />
    </section>
  );
}
