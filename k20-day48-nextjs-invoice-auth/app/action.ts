"use server";

import { createSession, deleteSession, verifyCredentials } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

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

export type LoginFormState = {
  error?: string;
};

export async function login(
  prevState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email hoặc mật khẩu không chính xác" };
  }

  const user = await verifyCredentials(email, password);
  if (!user) {
    return { error: "Email hoặc mậy khẩu không chính xác." };
  }
  await createSession(user);
  redirect("/dashboard");
}
export async function logout() {
  await deleteSession();
  redirect("/login");
}

const InvoiceIdSchema = z.string().uuid("ID hóa đơn không hợp lêk");

export async function createInvoice(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const parsed = InvoiceFormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // 1. Trả về lỗi theo từng field để hiển thị dưới input
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Thiếu hoặc sai thông tin. Không thể tạo hóa đơn.",
    };
  }

  const { customerId, amount, status } = parsed.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${Math.round(amount)}, ${status}, ${date})
    `;
  } catch (error) {
    console.error("Database Error:", error);
    // 2. Trả về thông báo lỗi chung nếu DB lỗi
    return {
      message: "Lỗi cơ sở dữ liệu: Không thể tạo hóa đơn.",
    };
  }

  // 3. Lưu ý: redirect() phải nằm NGOÀI khối try/catch
  revalidatePath("/dashboard/invoices");
  revalidatePath("/dashboard");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validId = InvoiceIdSchema.parse(id);

  if (!validId) {
    return { message: "ID hóa đơn không hợp lệ." };
  }

  const parsed = InvoiceFormSchema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Thiếu hoặc sai thông tin. Không thể cập nhật hóa đơn",
    };
  }

  const { customerId, amount, status } = parsed.data;
  try {
    await sql`
    UPDATE invoices
    SET
      customer_id = ${customerId},
      amount = ${Math.round(amount)},
      status = ${status}
    WHERE id = ${validId}
  `;
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message: "Lỗi cơ sở dữ liệu: Không thể cập nhật hóa đơn",
    };
  }
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
