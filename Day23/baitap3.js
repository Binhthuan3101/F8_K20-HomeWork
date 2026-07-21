function createOrderSystem() {
  let cart = [];
  return {


    addToCart(name, price, qty) {
      cart.push({ name, price, qty });
      return cart.length;
    },
    getCartSize() {
      return cart.length;
    },
    checkout(distance) {
      let subtotal = 0;
      for (let i = 0; i < cart.length; i++) {
        subtotal += cart[i].price * cart[i].qty;
      }
      let shippingFee = 0;
      if (distance <= 5) {
        const fee = 15000;
        shippingFee = fee;
      } else if (distance <= 20) {
        const fee = 30000;
        shippingFee = fee;
      } else {
        const fee = 50000;
        shippingFee = fee;
      }
      if (subtotal >= 500000) {
        shippingFee = 0;
      }
      const finalTotal = subtotal + shippingFee;
      cart = [];
      return {
        subtotal,
        shippingFee,
        finalTotal,
      };
    },
  };
}

// --- Hệ thống cửa hàng 1 ---
const store = createOrderSystem();
console.log(store.addToCart("Mũ lưỡi trai", 120000, 1)); // Kết quả: 1
console.log(store.getCartSize()); // Kết quả: 1
console.log(store.checkout(15)); // Kết quả: { subtotal: 120000, shippingFee: 30000, finalTotal: 150000 }
console.log(store.getCartSize()); // Kết quả: 0 (Đã tự động làm trống)

// --- Một hệ thống khác độc lập (Hệ thống cửa hàng 2) ---
const store2 = createOrderSystem();
console.log(store2.addToCart("Tất", 30000, 2)); // Kết quả: 1
console.log(store2.checkout(3)); // Kết quả: { subtotal: 60000, shippingFee: 15000, finalTotal: 75000 }

// --- Đơn hàng lớn, được miễn phí ship dù khoảng cách xa ---
const store3 = createOrderSystem();
console.log(store3.addToCart("Áo khoác", 600000, 1)); // Kết quả: 1
console.log(store3.checkout(30)); // Kết quả: { subtotal: 600000, shippingFee: 0, finalTotal: 600000 }

// Kiểm tra tính độc lập (các store không ảnh hưởng lẫn nhau)
console.log(store.getCartSize()); // Kết quả: 0
console.log(store2.getCartSize()); // Kết quả: 0
console.log(store3.getCartSize()); // Kết quả: 0
