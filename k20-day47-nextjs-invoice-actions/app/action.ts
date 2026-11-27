"use server";

import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const sql = neon(process.env.DATABASE_URL!);

const InvoiceFormSchema = z.object({
  customerId: z.coerce
    .number({ message: "Vui lòng chọn khách hàng hợp lệ" })
    .int("ID khách hàng phải là số nguyên dương")
    .positive("Vui lòng chọn khách hàng"),
  amount: z.coerce
    .number({ message: "Số tiền phải là số hợp lệ" })
    .positive("Số tiền phải lớn hơn 0"),
  status: z.enum(["pending", "paid"], {
    message: "Trạng thái phải là pending hoặc paid",
  }),
});

const InvoiceIdSchema = z.string().uuid("ID hóa đơn không hợp lệ");

export async function createInvoice(formData: FormData) {
  const parsed = InvoiceFormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ");
  }

  const { customerId, amount, status } = parsed.data;
  const date = new Date().toISOString().split("T")[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${Math.round(amount)}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(id: string, formData: FormData) {
  const validId = InvoiceIdSchema.parse(id);

  const parsed = InvoiceFormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message || "Dữ liệu không hợp lệ");
  }

  const { customerId, amount, status } = parsed.data;

  await sql`
    UPDATE invoices
    SET
      customer_id = ${customerId},
      amount = ${Math.round(amount)},
      status = ${status}
    WHERE id = ${validId}
  `;

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  const validId = InvoiceIdSchema.parse(id);

  await sql`
    DELETE FROM invoices
    WHERE id = ${validId}
  `;

  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard");
}