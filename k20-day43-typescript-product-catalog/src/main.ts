import {
  filterBy,
  findProductById,
  getAllProducts,
  updateProduct,
} from "./product-service";
import { getProductStatusLabel } from "./product-types";

console.log("===CHƯƠNG TRÌNH QUẢN LÝ DANH MỤC SẢN PHẨM===\n");

console.log("---1. DANH SÁCH SẢN PHẨM BAN ĐẦU---");
const allProducts = getAllProducts();
allProducts.forEach((product) => {
  console.log(
    `-[ID: ${product.id}] Tên: ${product.name} | Giá: ${product.price.toLocaleString("vi-VN")}đ | loại: ${product.category} | Tồn kho: ${product.stock}`,
  );
});
console.log();

console.log("---2. TÌM KIẾM SẢN PHẨM---");
console.log("Tìm ID: 102:", findProductById(102));
console.log("Tìm ID: 999:", findProductById(999));
console.log();

console.log();

console.log("---3. CẬP NHẬT GIÁ (ID 101)---");
const updatePrice = updateProduct(101, { price: 23990000 });
console.log("Kết quả cập nhật giá: ", updatePrice);
console.log();

console.log("---4. CẬP NHẬT TÊN VÀ TỒN KHO (ID 104) ---");
const updateMulti = updateProduct(104, {
  name: "Màn hình 24 inch Ultra",
  stock: 4,
});
console.log("Kết quả cập nhật:", updateMulti);
if (updateMulti) {
  console.log(
    `Trạng thái tồn kho mới: ${getProductStatusLabel(updateMulti.stock)}`,
  );
}
console.log();

console.log("---5. LỌC SẢN PHẨM (filterBy) ---");
const accessories = filterBy(allProducts, "category", "accessory");
console.log(
  `Sản phẩm thuộc danh mục 'accessory':`,
  accessories.map((a) => a.name),
);

const outOfStock = filterBy(allProducts, "stock", 0);
console.log(
  `Sản phẩm hết hàng (stock = 0):`,
  outOfStock.map((i) => i.name),
);
console.log();

console.log("---6. CẬP NHẬT ID KHÔNG TỒN TẠI (ID 999) ---");
const invalidUpdate = updateProduct(999, { price: 1000000 });
if (!invalidUpdate) {
  console.log("Lỗi: Không tìm thấy sản phẩm với ID 999 để cập nhật.");
}
