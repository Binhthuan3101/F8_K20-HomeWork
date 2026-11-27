"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { InvoiceFormData, InvoiceRow, LatestInvoice } from "./data";

const sql = neon(process.env.DATABASE_URL!);

export async function createInvoice(data: {
  customerId: number;
  amount: number;
  status: string;
}) {
  const { customerId, amount, status } = data;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (id, customer_id, amount, status, date)
    VALUES (
      (SELECT COALESCE(MAX(id), 0) + 1 FROM invoices),
      ${customerId},
      ${Number(amount)},
      ${status},
      ${date}
    )
  `;

  revalidatePath("/dashboard/invoices");
}

export async function getInvoice(id: number): Promise<InvoiceFormData> {
  const data = await sql`
    SELECT 
      invoices.id, 
      invoices.customer_id AS "customerId",
      invoices.amount, 
      invoices.status
    FROM invoices
    WHERE invoices.id = ${id}
  `;

  return data[0] as InvoiceFormData;
}

export async function updateInvoices(
  id: number,
  data: {
    customerId: number;
    amount: number;
    status: string;
  },
) {
  const { customerId, amount, status } = data;

  await sql`
    UPDATE invoices 
    SET 
      customer_id = ${Number(customerId)}, 
      amount = ${Number(amount)}, 
      status = ${status} 
    WHERE id = ${id}
  `;

  revalidatePath("/dashboard/invoices");
}

export async function deletedInvoice(id: number) {
  await sql`DELETE FROM invoices WHERE id=${id}`;
  revalidatePath("/dashboard/invoices");
}
