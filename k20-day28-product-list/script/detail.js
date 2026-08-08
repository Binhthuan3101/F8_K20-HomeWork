const params = new URLSearchParams(location.search);
const productId = params.get("id");
console.log(productId);
const productContainer = document.querySelector("#product-detail");

function showMessage(message) {
  if (productContainer) {
    productContainer.innerHTML = `
        <div class="text-center text-white py-10 text-lg font-medium></div>`;
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
    }catch(Error){}
}

function renderDetail(product) {
    const salePrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
    const imagesHtml = product.images ? product.images.map(img => `
        <img class="w-20 h-20 object-cover rounded-lg border-2 border-transparent cursor-pointer hover:border-purple-600 bg-white" src="${img}" alt="${product.title}" onclick="document.querySelector('#main-image').src='${img}'"/>
        `).join("") : "";
    
    const html = `
    <div class="grid grid-cols-1 gap-8 bg-slate-300 p-6 rounded-xl shadow-xl text-slate-800 md:grid-cols-3">
        <div class="space-y-4">
            <img id="main-image" class="w-full h-80 object-cover rounded-lg bg-white shadow" src="${product.thumbnail}" alt="${product.title}"/>
            <div class="flex gap-2 overflow-x-auto pb-2">
                ${imagesHtml}
            </div>
        </div>

        <div>
            <h1 class="text-2xl font-bold text-slate-900 ">${product.title}</h1>  
            <p class="text-gray-700 text-sm leading-relaxed">${product.description}</p>  

            <div>
                <span class="text-2xl font-extrabold text-red-600">$${salePrice}</span>  
                <span class="text-base line-through">$${product.price}</span>  
                <span class="bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold">Giảm: ${product.discountPercentage}%</span>
            </div>

            <div class="text-sm space-y-1.5 text-slate-700">
                <p><strong>Danh mục: </strong><span class="uppercase">${product.category}</span></p>
                <p><strong>Thương hiệu: </strong><span class="uppercase">${product.brand || "Không rõ"}</span></p>
                <p><strong>Đánh giá:</strong> <span class="text-amber-600 font-semibold">★ ${product.rating}</span></p>
                <p><strong>Kho hàng:</strong> ${product.stock} sản phẩm</p>
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