const products = [
  {
    id: 1,
    name: "Tai nghe Bluetooth",
    category: "do-dien-tu",
    price: 350000,
    inStock: true,
  },
  {
    id: 2,
    name: "Áo thun cotton",
    category: "quan-ao",
    price: 150000,
    inStock: true,
  },
  {
    id: 3,
    name: "Sách Lập trình JS căn bản",
    category: "sach",
    price: 120000,
    inStock: false,
  },
  {
    id: 4,
    name: "Bàn phím cơ",
    category: "do-dien-tu",
    price: 890000,
    inStock: true,
  },
  {
    id: 5,
    name: "Quần jean nam",
    category: "quan-ao",
    price: 420000,
    inStock: false,
  },
  {
    id: 6,
    name: "Sách Tư duy nhanh và chậm",
    category: "sach",
    price: 95000,
    inStock: true,
  },
];

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const searchBox = $("#search-box");
const categoryFilter = $("#category-filter");
const sortPriceBtn = $("#sort-price-btn");
const productList = $("#product-list");
const resultCount = $("#result-count");

let sortOrder = "none";

function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}
function renderApp() {
  const searchText = searchBox.value.toLowerCase().trim();
  const selectedCategory = categoryFilter.value;
  let filteredProducts = products.filter((product) => {
    const matchSearch = product.name.toLowerCase().includes(searchText);
    const matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  if (sortOrder === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
    sortPriceBtn.textContent = "Giá: Thấp → Cao";
  } else if (sortOrder === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
    sortPriceBtn.textContent = "Giá: Cao → Thấp";
  } else {
    sortPriceBtn.textContent = "Sắp xếp theo giá";
  }

  resultCount.textContent = `Tìm thấy ${filteredProducts.length} sản phẩm`;
  productList.innerHTML = "";
  if (filteredProducts.length === 0) {
    productList.innerHTML = `<p class="no-result">Không tim thấy sản phẩm nào phù hợp.</p>`;
    return;
  }
  filteredProducts.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.className = "product-item";
    if (!product.inStock) {
      productItem.classList.add("is-out");
    }
    productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>Danh mục: <strong>${product.category}</strong></p>
        <p>Giá: <span class="price">${formatPrice(product.price)}</span></p>
        <p>Tình trạng: ${product.inStock ? '<span style="color:green">Còn hàng</span>' : '<span style="color:red">Hết hàng</span>'}</p>`;
    productList.appendChild(productItem);
  });
}

searchBox.addEventListener("input", renderApp);
categoryFilter.addEventListener("change", renderApp);
sortPriceBtn.addEventListener("click", function () {
    if (sortOrder === "none" || sortOrder === "desc") {
        sortOrder = "asc";
    } else {
        sortOrder = "desc";
    }
    renderApp();
})
renderApp();
