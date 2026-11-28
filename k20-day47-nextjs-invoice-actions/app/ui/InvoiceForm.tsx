"use client";

import { useActionState } from "react";
import Link from "next/link";
import { type State } from "@/app/action";

type InvoiceFormProps = {
  customers: { id: number; name: string }[];
  action: (prevState: State, formData: FormData) => Promise<State>;
  submitLabel: string;
  defaultValues?: {
    customerId: number;
    amount: number;
    status: "pending" | "paid";
  };
};

const initialState: State = { message: null, errors: {} };

export default function InvoiceForm({
  customers,
  action,
  submitLabel,
  defaultValues,
}: InvoiceFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="max-w-xl">
      <div className="rounded-xl text-white bg-black p-6 shadow-sm border border-gray-200 space-y-5">
        {/* Chọn khách hàng */}
        <div>
          <label htmlFor="customer" className="mb-2 block text-sm font-medium ">
            Khách hàng
          </label>
          <select
            id="customer"
            name="customerId"
            defaultValue={defaultValues?.customerId ?? ""}
            aria-describedby="customer-error"
            className={`block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none transition focus:ring-2 ${
              state.errors?.customerId
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-gray-300 focus:border-blue-600 focus:ring-blue-100"
            }`}
          >
            <option value="" disabled>
              -- Chọn khách hàng --
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId?.map((error) => (
              <p
                key={error}
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Nhập số tiền */}
        <div>
          <label htmlFor="amount" className="mb-2 block text-sm font-medium ">
            Số tiền
          </label>
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="Nhập số tiền (VD: 500000)"
              defaultValue={defaultValues?.amount}
              aria-describedby="amount-error"
              className={`block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:ring-2 ${
                state.errors?.amount
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-600 focus:ring-blue-100"
              }`}
            />
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount?.map((error) => (
              <p
                key={error}
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Trạng thái hóa đơn */}
        <fieldset>
          <label className="mb-2 block text-sm font-medium ">
            Trạng thái hóa đơn
          </label>
          <div className="rounded-lg border border-gray-300 bg-white px-4 py-3">
            <div className="flex flex-wrap gap-6">
              <label
                htmlFor="pending"
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  id="pending"
                  type="radio"
                  name="status"
                  value="pending"
                  defaultChecked={defaultValues?.status === "pending"}
                  className="h-4 w-4 cursor-pointer border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                  Pending
                </span>
              </label>

              <label
                htmlFor="paid"
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  id="paid"
                  type="radio"
                  name="status"
                  value="paid"
                  defaultChecked={defaultValues?.status === "paid"}
                  className="h-4 w-4 cursor-pointer border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  Paid
                </span>
              </label>
            </div>
          </div>
          <div id="status-error" aria-live="polite" aria-atomic="true">
            {state.errors?.status?.map((error) => (
              <p
                key={error}
                className="mt-1.5 text-xs font-medium text-red-600"
              >
                {error}
              </p>
            ))}
          </div>
        </fieldset>

        {/* Thông báo lỗi tổng quát */}
        {state.message && (
          <div
            aria-live="polite"
            className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600"
          >
            {state.message}
          </div>
        )}
      </div>

      {/* Nhóm nút thao tác */}
      <div className="mt-6 flex items-center justify-end gap-3">
        <Link
          href="/dashboard/invoices"
          className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-200"
        >
          Hủy
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Đang xử lý..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
