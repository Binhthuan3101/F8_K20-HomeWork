import { z } from "zod";

export const schemaForm = z.object({
  customerId: z.number({
    error: "Vui lòng chọn khách hàng hợp lệ!",
  }),
  amount: z
    .number({
      error: "Số tiền không được bỏ trống và phải là số!",
    })
    .gt(0, { error: "Số tiền không được để 0 hoặc dưới 0!" }),
  status: z.string().min(1, { error: "Trạng thái không được để trống" }),
});
