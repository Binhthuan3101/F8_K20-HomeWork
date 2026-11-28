import Link from "next/link";

export default function InvoiceNotFound() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-lg border border-slate-800 p-8 text-center">
      <h2 className="text-xl font-bold text-white">Không tìm thấy hóa đơn</h2>
      <p className="text-sm text-slate-400">
        Hóa đơn không tồn tại hoặc đã bị xóa khỏi hệ thống.
      </p>
      <Link
        href="/dashboard/invoices"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Quay lại danh sách hóa đơn
      </Link>
    </div>
  );
}
