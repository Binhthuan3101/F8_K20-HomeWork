const params = new URLSearchParams(location.search);
const productId = params.get("id");
console.log(productId);
const productContainer = document.querySelector("#product-detail");

function showMessage(message) {
  if (productContainer) {
    productContainer.innerHTML = `
        <div class="text-center text-white py-10 text-lg font-medium">${message}</div>`;
  }
}

const fetchProductDetail=async () => {
    if (!productId) {
        showMessage("Không tìm thấy ID sản phẩm trong URL!");
        return;
    }

    try {
        showMessage("Đang tải thông tin sản phẩm...");
        const res = await fetch(`https://dummyjson.com/products/${productId}`);

        if (!res.ok) {
            throw new Error("Không thể tải dữ liệu sản phẩm.")
        }
        const product = await res.json();
        renderDetail(product);        
    } catch (Error) {
        console.log(Error);
        
    }
}

function renderDetail(product) {
    const salePrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    const imagesHtml = product.images ? product.images.map(img => `
        <img class="w-20 h-20 object-cover rounded-lg border-2 border-transparent cursor-pointer hover:border-purple-600 bg-white" src="${img}" alt="${product.title}" onclick="document.querySelector('#main-image').src='${img}'"/>
        `).join("") : "";
    
    // Thêm phần render tags
    const tagsHtml = product.tags && product.tags.length > 0 
        ? product.tags.map(tag => `<span class="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">${tag}</span>`).join(" ")
        : "Không có";

    // Thêm phần render reviews
    const reviewsHtml = product.reviews && product.reviews.length > 0
        ? product.reviews.map(review => `
            <div class="bg-slate-100 p-3 rounded-lg">
                <div class="flex items-center gap-2 mb-1">
                    <span class="font-semibold text-sm">${review.reviewerName}</span>
                    <span class="text-amber-600 text-xs">★ ${review.rating}</span>
                </div>
                <p class="text-xs text-slate-600">${review.comment}</p>
                <p class="text-xs text-slate-400 mt-1">${new Date(review.date).toLocaleDateString('vi-VN')}</p>
            </div>
        `).join("")
        : "<p class='text-sm text-slate-500'>Chưa có đánh giá</p>";
    
    const html = `
    <div class="grid grid-cols-1 gap-8 bg-slate-300 p-6 rounded-xl shadow-xl text-slate-800 md:grid-cols-2">
        <div class="space-y-4">
            <img id="main-image" class="w-full h-80 object-cover rounded-lg bg-white shadow" src="${product.thumbnail}" alt="${product.title}"/>
            <div class="flex gap-2 overflow-x-auto pb-2">
                ${imagesHtml}
            </div>
        </div>

        <div class="space-y-4">
            <h1 class="text-2xl font-bold text-slate-900">${product.title}</h1>  
            <p class="text-gray-700 text-sm leading-relaxed">${product.description}</p>  

            <div class="flex items-center gap-2 flex-wrap">
                <span class="text-2xl font-extrabold text-red-600">${salePrice}</span>  
                <span class="text-base line-through text-slate-500">${product.price}</span>  
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">Giảm: ${product.discountPercentage}%</span>
            </div>

            <div class="text-sm space-y-2 text-slate-700">
                <p><strong>Danh mục:</strong> <span class="uppercase">${product.category}</span></p>
                <p><strong>Thương hiệu:</strong> <span class="uppercase">${product.brand || "Không rõ"}</span></p>
                <p><strong>SKU:</strong> ${product.sku || "Không rõ"}</p>
                <p><strong>Đánh giá:</strong> <span class="text-amber-600 font-semibold">★ ${product.rating}</span></p>
                <p><strong>Kho hàng:</strong> ${product.stock} sản phẩm</p>
                <p><strong>Trọng lượng:</strong> ${product.weight || "Không rõ"} kg</p>
                <p><strong>Kích thước:</strong> ${product.dimensions ? `${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm` : "Không rõ"}</p>
                <p><strong>Tags:</strong> ${tagsHtml}</p>
            </div>

            <div class="space-y-2">
                <h3 class="font-bold text-lg">Đánh giá từ khách hàng:</h3>
                <div class="space-y-2 max-h-64 overflow-y-auto">
                    ${reviewsHtml}
                </div>
            </div>

            <div class="pt-4 flex gap-4">
                <button class="bg-purple-900 hover:bg-purple-800 text-white font-bold px-6 py-2 rounded-lg transition shadow cursor-pointer">Thêm vào giỏ hàng</button>
                <a href="./index.html" class="bg-gray-600 hover:bg-gray-500 text-white font-bold px-6 py-2 rounded-lg transition inline-flex items-center justify-center">Quay lại</a>
            </div>
        </div>
    </div>
    `;
    productContainer.innerHTML = html;
}


fetchProductDetail();