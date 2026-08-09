const productList = document.querySelector("#products-list");
const btnSearch = document.querySelector("#btn-search");
const textSearch = document.querySelector("#search");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort-select");
const statusContainer = document.querySelector("#status-container");
const statusText = document.querySelector("#status-text");
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const pageInfo = document.querySelector("#page-info");

let products = [];
let filteredProducts = [];
let currentPage = 1;
const limit = 8;

function showStatus(message, isShow = true) {
  if (!statusContainer || !statusText) return;
  if (isShow) {
    statusText.innerHTML = message;
    statusContainer.classList.remove("hidden");
    productList.innerHTML = "";
  } else {
    statusContainer.classList.add("hidden");
  }
}

function render(data) {
  if (!data || data.length === 0) {
    showStatus("Không tìm thấy sản phẩm phù hợp");
    updatePagination(0);
    return;
  }
  showStatus("", false);
  const html = data
    .map((product) => {
      const salePrice = (
        product.price *
        (1 - product.discountPercentage / 100)
      ).toFixed(2);
      return `
        <li class="shadow-xl rounded-lg space-y-3 bg-slate-300 p-3 flex flex-col justify-between">
            <img class="w-full bg-white rounded-lg object-cover aspect-[3/2]" src="${product.thumbnail}" alt="${product.title}"/>
            <div class="px-4 space-y-2 ">
                <p class="font-bold text-base line-clamp-1">${product.title}</p>
                <div class="flex items-center gap-2">
                    <p class="text-red-6 font-extrabold text-lg">$${salePrice}</p>
                    <p class="text-gray-500 line-through text-xs">$${product.price}</p>
                </div>
                <p class="text-xs text-red-500 font-semibold">Giảm: ${product.discountPercentage}%</p>  
                <p class="text-xs text-amber-600 font-semibold"><i class="fa-solid fa-star"></i> ${product.rating}</p>
                <p class="text-xs text-gray-600">Kho: ${product.stock}</p>  
            </div>
            <a href="./products-detail.html?id=${product.id}"
            class="block text-center bg-purple-900 text-white py-1.5 rounded-md font-bold text-sm hover:bg-purple-800 transition">
                Xem chi tiết
            </a>
        </li>`;
    })
    .join("");
  productList.innerHTML = html;
}


const fetchCategories = async () => {
  try {
    const res = await fetch("https://dummyjson.com/products/categories");
    const categories = await res.json();
    if (categoryFilter) {
      const optionHtml = categories
        .map((category) => {
          const value = typeof category === "string" ? category : category.slug;
          return `<option value="${value}">${value}</option>`;
        })
        .join("");
      categoryFilter.innerHTML =
        `<option value="">Tất cả danh mục</option>` + optionHtml;
    }
  } catch (error) {
    console.error("Lỗi khi tải thư mục", error);
  }
};

const fetchData = async () => {
  try {
    showStatus("Đang tải dữ liệu sản phẩm...");
    const body = await fetch("https://dummyjson.com/products?limit=100");
    const data = await body.json();
    products = data.products;
    filteredProducts = [...products];
    handleFilterAndSort();
  } catch (error) {
    showStatus("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại!");
  }
};

function handleFilterAndSort() {
  let result = [...products];
  const text = textSearch ? textSearch.value.trim().toLowerCase() : "";
  if (text) {
    result = result.filter((p) => p.title.toLowerCase().includes(text));
  }
  const category = categoryFilter ? categoryFilter.value : "";
  if (category) {
    result = result.filter((p) => p.category === category);
  }
  const sortType = sortSelect ? sortSelect.value : "";
  if (sortType === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortType === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sortType === "title-asc") {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortType === "title-desc") {
    result.sort((a, b) => b.title.localeCompare(a.title));
  }
  filteredProducts = result;
  currentPage = 1;
  renderCurrentPage();
}

function renderCurrentPage() {
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const pageProducts = filteredProducts.slice(startIndex, endIndex);
  render(pageProducts);
  updatePagination(filteredProducts.length);
}

function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / limit) || 1;
  if (pageInfo) {
    pageInfo.innerText = `Trang ${currentPage}/ ${totalPages}`;
  }

  if (btnPrev) {
    btnPrev.disable = currentPage === 1;
    btnPrev.classList.toggle("opacity-50", currentPage === 1);
  }
  if (btnNext) {
    btnNext.disable = currentPage >= totalPages || totalItems === 0;
    btnNext.classList.toggle(
      "opacity-50",
      currentPage >= totalPages || totalItems === 0,
    );
  }
}

btnSearch.addEventListener("click", handleFilterAndSort);
textSearch.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleFilterAndSort();
});

categoryFilter.addEventListener("change", handleFilterAndSort);
sortSelect.addEventListener("change", handleFilterAndSort);

btnPrev.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCurrentPage();
  }
});
btnNext.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProducts.length / limit);
  if (currentPage < totalPages) {
    currentPage++;
    renderCurrentPage();
  }
});
fetchCategories();
fetchData();
