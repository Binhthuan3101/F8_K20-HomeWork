import {
  addItem,
  formatMoney,
  priceRange,
  renderInvoice,
  subtotal,
  validateCoupon,
} from "./cart";
import { Cart } from "./types";

async function main() {
  let myCart: Cart = {
    CartId: "CART-2026-001",
    current: "VND",
    items: [],
    couponCode: "SALE10",
  };

  try {
    if (myCart.couponCode) {
      const isValid = await validateCoupon(myCart.couponCode);
      if (!isValid) {
        console.log("Mã giảm giá không hợp lệ hoặc đã hết hạn.");
      }
    }
    myCart = addItem(myCart, {
      productId: "SP01",
      name: "Áo sơ mi nam công sở",
      unitPrice: 250000,
      quantity: 3,
    });

    myCart = addItem(myCart, {
      productId: "SP02",
      name: "Áo thun polo thể thao",
      unitPrice: 180000,
      quantity: 1,
    });

    console.log(renderInvoice(myCart));
    console.log("\n");

    console.log(`Tạm tính chi tiết: ${formatMoney(subtotal(myCart))}`);
    const [minPrice, maxPrice] = priceRange(myCart);
    console.log(
      `Khoảng giá sản phẩm (Thấp nhất - Cao nhất): [${formatMoney(minPrice)}, ${formatMoney(maxPrice)}]`,
    );
  } catch (error: any) {
    console.error("Đã xảy ra lỗi:", error.message);
  }
}
main();
