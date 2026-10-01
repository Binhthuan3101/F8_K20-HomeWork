import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCategories, getProductsCatalog } from "./api/productApi";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [productId, setProductId] = useState(1);
  const navigate = useNavigate();
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const productsQuery = useQuery({
    queryKey: ["products", "catalog", selectedCategory],
    queryFn: () => getProductsCatalog(selectedCategory),
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Cửa hàng trực tuyến</h1>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Danh mục sản phẩm</h2>
        {categoriesQuery.isPending && <p>Đang tải danh mục</p>}
        {categoriesQuery.isError && (
          <div className="flex items-center gap-2 text-red-500">
            <p>Lỗi tải danh mục</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => categoriesQuery.refetch()}
            >
              Thử lại
            </Button>
          </div>
        )}
        {categoriesQuery.isSuccess && (
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
            >
              Tất cả
            </Button>
            {categoriesQuery.data.map((cat) => {
              const slug = typeof cat === "string" ? cat : cat.slug;
              const name = typeof cat === "string" ? cat : cat.name;
              return (
                <Button
                  key={slug}
                  variant={selectedCategory === slug ? "default" : "outline"}
                  onClick={() => setSelectedCategory(slug)}
                >
                  {name}
                </Button>
              );
            })}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Danh sách sản phẩm</h2>
        {productsQuery.isPending && (
          <p className="text-gray-500">Đang tải sản phẩm...</p>
        )}
        {productsQuery.isError && (
          <div className="flex items-center gap-3 text-red-600 bg-red-50 p-4 rounded-md">
            <p>Không thể tải danh sách sản phẩm</p>
            <Button
              variant="destructive"
              onClick={() => productsQuery.refetch()}
            >
              Thử lại
            </Button>
          </div>
        )}
        {productsQuery.isSuccess && (
          <>
            {productsQuery.data.products.length === 0 ? (
              <p className="text-gray-500">Không có sản phẩm nào.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {productsQuery.data.products.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setProductId(item.id);
                      return navigate(`/products/${item.id}`);
                    }}
                    className="border rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <div>
                      <h3 className="font-semibold text-base line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-emerald-600 font-bold mt-1">
                        {item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
