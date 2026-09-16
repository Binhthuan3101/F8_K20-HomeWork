import { formatPrice, products } from "../data/products.js";

export const ProductsDetail = (params) => {
    if (!params || !params.id) {
        return `<div class="text-center py-12">
            <h2 class="text-2xl font-bold text-red-500 mb-2">Đường dẫn sản phẩm không hợp lệ</h2>
            <a href="/products" data-link class="text-indigo-600 hover:underline">Quay lại trang sản phẩm</a>
        </div>`;
    }
    const product = products.find(p => String(p.id) === String(params.id));

    if (!product) {
        return `<div class="text-center py-12">
            <h2 class="text-2xl font-bold text-red-500 mb-2">Không tìm thấy sản phẩm (ID: ${params.id})</h2>
            <a href="/products" data-link class="text-indigo-600 hover:underline">Quay lại trang sản phẩm</a>
        </div>`;
    }

    return `
    <div class="bg-white rounded-xl shadow-md border p-6 md:p-8 grid md:grid-cols-2 gap-8">
        <img src="${product.thumbnail}" alt="${product.name}" class="w-full h-80 object-cover rounded-lg"/>
        <div class="flex flex-col justify-center">
            <h1 class="text-3xl font-bold text-gray-900">${product.name}</h1>
            <p class="text-2xl font-bold text-indigo-600 mb-4">${formatPrice(product.price)}</p>
            <p class="text-gray-600 mb-6">${product.description}</p>
            <button onclick="alert('Đã thêm sản phẩm vào giỏ hàng!')" class="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition w-full md:w-auto">Thêm vào giỏ hàng</button>
        </div>
    </div>`;
};
