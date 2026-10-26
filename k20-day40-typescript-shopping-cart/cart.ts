import { Cart, CartItem } from "./types";

export function addItem(cart: Cart, item: CartItem): Cart {
  if (!item.productId || item.productId.trim() === "") {
    throw new Error("Mã sản phẩm (productId) không được để trống");
  }

  if (!item.name || item.name.trim() == "") {
    throw new Error("Tên sản phẩm (name) không được để trống");
  }
  if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
    throw new Error("Số lượng (quantity) phải là số nguyên lớn hơn 0.");
  }
  if (typeof item.unitPrice !== "number" || item.unitPrice < 0) {
    throw new Error("Đơn giá (uniPrice) phải là số không âm.");
  }

  const existingIndex = cart.items.findIndex(
    (i) => i.productId === item.productId,
  );
  let newItems: CartItem[];
  if (existingIndex >= 0) {
    newItems = cart.items.map((item, index) => {
      if (index === existingIndex) {
        return {
          ...item,
          quantity: item.quantity + item.quantity,
        };
      }
      return item;
    });
  } else {
    newItems = [...cart.items, { ...item }];
  }

  return {
    ...cart,
    items: newItems,
  };
}

export function subtotal(cart: Cart): number {
  return cart.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0,
  );
}

export function discount(cart: Cart): number {
  if (cart.couponCode === "SALE10") {
    const sub = subtotal(cart);
    return Math.round(sub * 0.1);
  }
  return 0;
}

export function shippingFee(amountAfterDiscount: number): number {
  if (amountAfterDiscount >= 500000) {
    return 0;
  }
  return 30000;
}

export function formatMoney(value: number) {
  const formattedNumber = new Intl.NumberFormat("vi-VN").format(value);
  return `${formattedNumber}₫`;
}

export function priceRange(cart: Cart): [number, number] {
  if (cart.items.length === 0) {
    throw new Error("Giỏ hàng trống, không thể xác định khoảng giá.");
  }

  let min = cart.items[0].unitPrice;
  let max = cart.items[0].unitPrice;
  for (const item of cart.items) {
    if (item.unitPrice < min) {
      min = item.unitPrice;
    }
    if (item.unitPrice > max) {
      max = item.unitPrice;
    }
  }
  return [min, max];
}

export async function validateCoupon(code: string): Promise<boolean> {
  const normalizedCode = code.trim();
  return Promise.resolve(normalizedCode === "SALE10");
}

export function renderInvoice(cart: Cart): string {
  const sub = subtotal(cart);
  const dis = discount(cart);
  const amountAfterDiscount = sub - dis;
  const ship = shippingFee(amountAfterDiscount);
  const total = amountAfterDiscount + ship;

  let invoice = `===HÓA ĐƠN MUA HÀNG===\n`;
  invoice += `Mã giỏ hàng: ${cart.CartId}\n`;
  if (cart.couponCode) {
    invoice += `Mã giảm giá: ${cart.couponCode}\n`;
  }
  invoice += `--------------------------------------\n`;
  invoice += `Danh sách sản phẩm: \n`;
  cart.items.forEach((item, index) => {
    const itemTotal = item.unitPrice * item.quantity;
    invoice += `${index + 1}. ${item.name} | SL: ${item.quantity} | Đơn giá: ${formatMoney(item.unitPrice)} | Thành tiền: ${formatMoney(itemTotal)}\n`;
  });
  invoice += `-------------------------------------\n`;
  invoice += `Tạm tính: ${formatMoney(sub)}\n`;
  invoice += `Giảm giá: ${formatMoney(dis)}\n`;
  invoice += `Phí ship: ${formatMoney(ship)}\n`;
  invoice += `Tổng phải trả: ${formatMoney(total)}\n`;
    invoice += `=====================================`;
    return invoice;
}
