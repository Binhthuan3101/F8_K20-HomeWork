"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";

const sql = neon(process.env.DATABASE_URL!);

export async function createInvoice(data: {
  customerId: number;
  amount: number;
  status: string;
}) {
  const { customerId, amount, status } = data;
  const date = new Date().toISOString().split("T");

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

export async function updateInvoices(
  id: number,
  data: {
    customerId: string;
    amount: number;
    status: string;
  },
) {
  const { customerId, amount, status } = data;
  await sql`UPDATE invoices SET customer_id=${customerId},amount=${amount},status=${status} WHERE id=${id}`;
  revalidatePath("/dashboard/invoices");
}

export async function deletedInvoice(id: number) {
  await sql`DELETED FROM invoices WHERE id=${id}`;
  revalidatePath("/dashboard/invoices");
}
