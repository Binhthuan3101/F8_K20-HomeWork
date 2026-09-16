import { formatPrice, products } from "../data/products.js";
export const Products = () => {
  const productCards = products
    .map(
      (product) => `
        <div class="bg-slate-200 border rounded-xl overflow-hidden shadow-sm cursor-pointer hover:border-slate-200 transition flex flex-col">
            <img src="${product.thumbnail}" alt="${product.name}" class="h-48 object-cover w-full"/>
            <div class="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <h3 class="font-bold text-lg text-gray-800 mb-1">${product.name}</h3>
                    <p class="text-indigo-600 font-semibold mb-4">${formatPrice(product.price)}</p>
                </div>

                <a href="/products/${product.id}" data-link class="block text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-indigo-600 transition text-sm font-medium">Xem chi tiết</a>
            </div>
        </div>
        `,
    )
    .join("");
  return `<div>
        <h1 class="text-2xl text-white font-bold mb-6">Danh sách sản phẩm</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            ${productCards}
        </div>
    </div>`;
};
