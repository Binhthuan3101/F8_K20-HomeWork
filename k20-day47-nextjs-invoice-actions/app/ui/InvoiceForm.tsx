import Link from "next/link";
import type { CustomerOption } from "@/app/data";

interface InvoiceFormProps {
  customers: CustomerOption[];
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaultValues?: {
    customerId: number;
    amount: number;
    status: "pending" | "paid";
  };
}

export default function InvoiceForm({
  customers,
  action,
  submitLabel,
  defaultValues,
}: InvoiceFormProps) {
  return (
    <form
      action={action}
      className="max-w-lg flex flex-col space-y-4 rounded-lg border border-slate-800 bg-slate-900/60 p-6"
    >
      <div>
        <label htmlFor="customerId" className="mb-1 block text-sm font-medium">
          Khách hàng
        </label>
        <select
          id="customerId"
          name="customerId"
          defaultValue={defaultValues?.customerId ?? ""}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
        >
          <option value="">-- Chọn khách hàng --</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount" className="mb-1 block text-sm font-medium">
          Số tiền (VNĐ)
        </label>
        <input
          id="amount"
          name="amount"
          type="number"
          step="any"
          defaultValue={defaultValues?.amount ?? ""}
          placeholder="Nhập số tiền (VNĐ)"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
        />
      </div>

      <div>
        <label htmlFor="status" className="mb-1 block text-sm font-medium">
          Trạng thái
        </label>
        <select
          id="status"
          name="status"
          defaultValue={defaultValues?.status ?? "pending"}
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white"
        >
          <option value="pending">pending</option>
          <option value="paid">paid</option>
        </select>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {submitLabel}
        </button>
        <Link
          href="/dashboard/invoices"
          className="rounded-md border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
        >
          Hủy
        </Link>
      </div>
    </form>
  );
}
