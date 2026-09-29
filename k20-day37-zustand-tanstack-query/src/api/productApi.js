const BASE_URL = "https://dummyjson.com/products";
export const fetchCategories = async () => {
    const res = await fetch(`${BASE_URL}/category-list`);
    if (!res.ok) {
        throw new Error(`Lỗi khi tải danh mục :HTTP ${res.status}`)
    }
    return res.json();
};

export const fetchProductsByCategory=async (categoryName) => {
    if (!categoryName) return [];
    const res = await fetch(`${BASE_URL}/category/${categoryName}`);
    if (!res.ok) {
        throw new Error(`Lỗi tải sản phẩm thất bại: HTTP ${res.status}`)
    }
    const data = await res.json();
   
    
    return data.products || [];
    
}