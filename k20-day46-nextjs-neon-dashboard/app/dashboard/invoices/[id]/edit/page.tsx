import { getInvoice } from "@/app/action";
import { fetchCustomers } from "@/app/data";
import EditForm from "@/app/ui/EditForm";
import React from "react";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [invoice, customers] = await Promise.all([
    getInvoice(Number(id)),
    fetchCustomers(),
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold">Sửa Hóa Đơn</h1>
      <EditForm invoice={invoice} customers={customers} />
    </div>
  );
}
