import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/productApi";
import { useCategoryStore } from "../store/useCategoryStore";

export default function CategoryFilter() {
  // 1. Dùng selector riêng biệt cho an toàn
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);

  const {
    data: categories = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isPending) {
    return <div className="text-gray-500 py-2">Đang tải danh mục...</div>;
  }

  if (isError) {
    return (
      <div className="text-red-500 p-3 bg-red-50 rounded-lg text-sm">
        {error.message}
      </div>
    );
  }

  if (!Array.isArray(categories) || categories.length === 0) {
    return <div className="text-gray-500 py-2">Không có danh mục nào.</div>;
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Danh mục sản phẩm
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          // 2. Ép kiểu an toàn: Lấy slug/value để lưu state và name/label để hiển thị
          const categorySlug = typeof cat === "object" ? cat.slug || cat.name : cat;
          const categoryLabel = typeof cat === "object" ? cat.name : cat;

          const isSelected = selectedCategory === categorySlug;

          return (
            <button
              key={categorySlug}
              onClick={() => setSelectedCategory(categorySlug)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition capitalize ${
                isSelected
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {String(categoryLabel).replace(/-/g, " ")}
            </button>
          );
        })}
      </div>
    </div>
  );
}