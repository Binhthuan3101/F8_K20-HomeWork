import { useShop } from "../context/ShopContext";
import { formatPrice } from "../data/Product";

export default function ProductItem({ product }) {
  const { dispatch } = useShop();
  return (
    <div className="bg-white border border-gray-300 rounded-xl rounded-t-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition">
      <div>
        <img
          className="w-full h-50 object-cover"
          src={product.thumbnail}
          alt={product.name}
        />
        <div className="p-4">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
            {product.category}
          </span>
          <h3 className="font-bold text-gray-800 text-lg mt-2">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>
      <div className="mt-4 p-4  border-t border-gray-100 flex items-center justify-between">
        <span className="font-bold text-blue-600 text-lg">
          {formatPrice(product.price)}
        </span>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
          onClick={() => {
            alert(`Đã thêm ${product.name} vào giỏ hàng`);
            return dispatch({ type: "ADD_TO_CART", payload: product });
          }}
        >
          Thêm
        </button>
      </div>
    </div>
  );
}
