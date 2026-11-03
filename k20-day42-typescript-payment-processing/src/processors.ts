import type { PaymentReceipt, PaymentResult } from "./types";
let globalReceiptId = 1;
export abstract class PaymentProcessor {
  public readonly orderId: number;
  protected amount: number;
  constructor(orderId: number, amount: number) {
    this.orderId = orderId;
    this.amount = amount;
  }
  abstract pay(): PaymentResult;
  protected createReceipt(
    message: string,
    method: PaymentReceipt["method"],
  ): PaymentReceipt {
    return {
      id: globalReceiptId++,
      orderId: this.orderId,
      amount: this.amount,
      method: method,
      message: message,
    };
  }
}
export class CodPaymentProcessor extends PaymentProcessor {
  pay(): PaymentResult {
    const receipt = this.createReceipt(
      `Thanh toán COD cho đơn hàng #${this.orderId} thành công. Khách hàng sẽ thanh toán khi nhận hàng.`,
      "COD",
    );
    return { status: "success", data: receipt };
  }
}

export class BankTransferProcessor extends PaymentProcessor {
  pay(): PaymentResult {
    const receipt = this.createReceipt(
      `Thanh toán qua Chuyển khoản cho đơn hàng #${this.orderId} thành công.`,
      "BANK_TRANSFER",
    );
    return { status: "success", data: receipt };
  }
}
export class EWalletPaymentProcessor extends PaymentProcessor {
  pay(): PaymentResult {
    const receipt = this.createReceipt(
      `Thanh toán qua ví điện tử cho đơn hàng #${this.orderId} thành công.`,
      "E_WALLET",
    );
    return { status: "success", data: receipt };
  }
}

export function createPaymentProcessor(
  orderId: number,
  amount: number,
  method: string,
): PaymentProcessor {
  switch (method) {
    case "COD":
      return new CodPaymentProcessor(orderId, amount);
    case "BANK_TRANSFER":
      return new BankTransferProcessor(orderId, amount);
    case "E_WALLET":
      return new EWalletPaymentProcessor(orderId, amount);
    default:
      throw new Error(`Phương thức thanh toán '${method}' không hợp lệ`);
  }
}
