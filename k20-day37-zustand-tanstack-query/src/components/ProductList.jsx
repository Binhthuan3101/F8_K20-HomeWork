import { useQuery } from "@tanstack/react-query";
import { useCartStore } from "../store/useCartStore";
import { useCategoryStore } from "../store/useCategoryStore";
import { fetchProductsByCategory } from "../api/productApi";

export default function ProductList() {
  const selectedCategory = useCategoryStore((state) => state.selectedCategory);
  const addToCart = useCartStore((state) => state.addToCart);

  const {
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: ()=>fetchProductsByCategory(selectedCategory),
    enabled: Boolean(selectedCategory),
  });

  if (!selectedCategory) {
    return (
      <div className="bg-blue-50 text-blue-700 p-8 rounded-xl text-center font-medium my-4">
        Vui lòng chọn danh mục để xem danh sách sản phẩm.
      </div>
    );
  }
  if (isPending) {
    return (
      <div className="text-center py-12 text-gray-500 font-medium">
        Đang tải sản phẩm...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center font-medium my-4">
        {error.message}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-medium">
        Không có sản phẩm nào trong danh mục này.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition flex flex-col justify-between"
        >
          <div>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover bg-gray-50"
            />
            <div className="p-4">
              <h4
                className="font-bold text-gray-800 line-clamp-1"
                title={product.title}
              >
                {product.title}
              </h4>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>
          </div>
          <div className="p-4 pt-0 flex items-center justify-between mt-2">
            <span className="text-lg font-extrabold text-gray-900">
              ${product.price}
            </span>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
