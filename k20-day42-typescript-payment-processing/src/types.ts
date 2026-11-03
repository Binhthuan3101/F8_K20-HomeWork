export type PaymentMethod = "COD" | "BANK_TRANSFER" | "E_WALLET";
export interface PaymentRequest {
  orderId: number;
  amount: number;
  method: PaymentMethod;
}
export interface PaymentReceipt {
  id: number;
  orderId: number;
  amount: number;
  method: PaymentMethod;
  message: string;
}

export type PaymentResult =
  | { status: "success"; data: PaymentReceipt }
  | { status: "error"; message: string };

export function isPaymentRequest(value: unknown): value is PaymentRequest {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const obj = value as Record<string, unknown>;

  const isOrderIdValid =
    typeof obj.orderId === "number" &&
    Number.isInteger(obj.orderId) &&
    obj.orderId > 0;

  const isAmountValid =
    typeof obj.amount === "number" &&
    Number.isFinite(obj.amount) &&
    obj.amount > 0;

  const validMethod: PaymentMethod[] = ["COD", "BANK_TRANSFER", "E_WALLET"];
  const isMethodValid =
    typeof obj.method === "string" &&
    validMethod.includes(obj.method as PaymentMethod);

  return isOrderIdValid && isAmountValid && isMethodValid;
}

export function findById<T extends { id: number }>(
  items: T[],
  id: number,
): T | undefined {
  return items.find((item) => item.id === id);
}
