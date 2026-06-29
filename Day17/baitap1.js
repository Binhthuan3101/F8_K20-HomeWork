function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replaceAll(" ", "-")
    .replaceAll(/[^a-z0-9-]/g, "");
}
console.log(createSlug("MacBook Pro 2024")); // "macbook-pro-2024"
console.log(createSlug("Bàn Phím Cơ RGB")); // "bn-phm-c-rgb"  ← tiếng Việt mất dấu là bình thường
console.log(createSlug("iPhone 15 Pro Max!!!")); // "iphone-15-pro-max"
console.log(createSlug("Hello   World"));//"hello---world"

function generateOrderId(productName, quantity) {
  return "ORD-".concat(
    productName.slice(0, 3).toUpperCase(),
    "-",
    quantity,
    "-",
    productName.length,
  );
}

console.log(generateOrderId("MacBook Pro", 2)); // "ORD-MAC-2-11"
console.log(generateOrderId("iPhone 15", 5)); // "ORD-IPH-5-9"
console.log(generateOrderId("Bàn phím cơ", 1)); // "ORD-BÀN-1-11"

function formatPrice(price, currency) {  
    const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, currency==="USD"?",": ".");
  if (currency === "USD") {
    return `$` + formatted + ".00";
  } else if (currency === "VND") {
    return formatted + " ₫";
  }
  return formatted + " ₫";
}

console.log(formatPrice(2000000, "VND")); // "2.000.000 "
console.log(formatPrice(2000, "USD")); // "$2,000.00"
console.log(formatPrice(500000)); // "500.000 ₫"  (mặc định VND)

const baseUrl = "https://shop.vn";
const product = { name: "MacBook Pro 2024", id: 101, category: "laptop" };



function buildProductUrl(baseUrl, product) {
    return baseUrl.concat("/",product.category,"/",product.name.toLowerCase().replaceAll(" ","-").replace(/[^a-z0-9-]/g, ""),"?","id=",product.id)
}
console.log(buildProductUrl(baseUrl, product));
// "https://shop.vn/laptop/macbook-pro-2024?id=101"
console.log(buildProductUrl("https://shop.vn", { name: "iPhone 15", id: 55, category: "phone" }));
// "https://shop.vn/phone/iphone-15?id=55"