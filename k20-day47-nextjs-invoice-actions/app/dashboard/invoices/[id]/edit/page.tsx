import { notFound } from "next/navigation";
import { fetchCustomers, fetchInvoiceById } from "@/app/data";
import InvoiceForm from "@/app/ui/InvoiceForm";
import { updateInvoice } from "@/app/action";

export const dynamic = "force-dynamic";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Sửa hóa đơn</h1>
      <InvoiceForm
        customers={customers}
        action={updateInvoiceWithId}
        submitLabel="Cập nhật Hóa đơn"
        defaultValues={{
          customerId: invoice.customerId,
          amount: invoice.amount,
          status: invoice.status === "paid" ? "paid" : "pending",
        }}
      />
    </section>
  );
}
