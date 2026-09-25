import { use, useMemo, useState } from "react";

// Khởi tạo sẵn 1.000 sản phẩm mẫu
const PRODUCTS = Array.from({ length: 1000 }, (_, index) => {
  const categories = ["Điện thoại", "Laptop", "Thời trang", "Gia dụng", "Sách"];

  return {
    id: index + 1,
    name: `Sản phẩm ${index + 1}`,
    category: categories[index % categories.length],
    price: (index % 50) * 20 + 100, // Giá từ 100 đến 1080 (k)
    rating: (index % 5) + 1, // Rating từ 1 đến 5 sao
  };
});

export default function ProductFilter() {
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortOption, setSortOption] = useState("Mặc định");

  const filterProducts = useMemo(() => {
    console.log("ĐANG LỌC VÀ SẮP XẾP LẠI DANH SÁCH...");
    let result = [...PRODUCTS];

    //   Tìm kiếm theo tên sản phẩm
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(term),
      );
    }

    //   Lọc theo category
    if (selectedCategory !== "Tất cả") {
      result = result.filter(
        (product) => product.category === selectedCategory,
      );
    }

    if (sortOption === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption.trim() === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchTerm, selectedCategory, sortOption]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
      <div className="border-b border-slate-200 pb-4 mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Bài 1: Tối ưu bộ lọc 1.000 sản phẩm
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Sử dụng{" "}
          <code className="bg-slate-100 px-1.5 py-0.5 rounded text-rose-600 font-mono">
            useMemo
          </code>{" "}
          để tối ưu hiệu năng render.
        </p>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex justify-between items-center">
        <div>
          <span className="font-semibold text-amber-900 block">
            Khu vực kiểm tra re-render:
          </span>
          <span className="text-amber-700 text-sm">
            Giá trị count:{" "}
            <strong className="text-lg text-amber-900">{count}</strong>
          </span>
        </div>
        <button
          onClick={() => setCount((prev) => prev + 1)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm active:scale-95"
        >
          Tăng count
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider">
            Tìm kiếm sản phẩm:{" "}
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="danh_muc"
            className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider"
          >
            Danh mục
          </label>
          <select
            value={selectedCategory}
            id="danh_muc"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            <option value="Điện thoại">Điện thoại</option>
            <option value="Laptop">Laptop</option>
            <option value="Thời trang">Thời trang</option>
            <option value="Gia dụng">Gia dụng</option>
            <option value="Sách">Sách</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="sort"
            className="block text-xs font-semibold text-slate-600 mb-1 uppercase tracking-wider"
          >
            Sắp xếp
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            id="sort"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="Mặc định">Mặc định</option>
            <option value="asc">Giá tăng dần</option>
            <option value="desc">Giá giảm dần</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-100">
        <span className="text-sm font-semibold text-slate-600">
          Tìm thấy{" "}
          <span className="text-blue-600 font-bold">
            {filterProducts.length}
          </span>{" "}
          / {PRODUCTS.length}
        </span>
      </div>
      {filterProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
          {filterProducts.map((product) => (
            <div
              key={product.id}
              className="p-3 border border-slate-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-slate-800 text-sm">
                    {product.name}
                  </span>
                  <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                <span className="text-emerald-600 font-bold text-sm">
                  {product.price}.000đ
                </span>
                <span>
                  {"★".repeat(product.rating)}
                  {"☆".repeat(5 - product.rating)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-dashed border-slate-300">
          <p className="text-slate-500 font-medium">
            Không tìm thấy sản phẩm phù hợp điều kiện lọc.
          </p>
        </div>
      )}
    </div>
  );
}
