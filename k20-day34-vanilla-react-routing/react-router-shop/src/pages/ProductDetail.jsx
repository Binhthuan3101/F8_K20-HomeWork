import { Link, useParams } from "react-router";
import { products, formatPrice } from "../data/products.js";

export default function ProductDetail({ onAddToCart }) {
  const { productId } = useParams();
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Không tìm thấy sản phẩm
        </h2>
        <Link to="/products" className="text-indigo-600 hover:underline">
          Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 grid md:grid-cols-2 gap-8">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="w-full h-80 object-cover rounded-lg"
      />
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.name}
        </h1>
        <p className="text-2xl font-bold text-indigo-600 mb-4">
          {formatPrice(product.price)}
        </p>
        <p className="text-gray-600 mb-6">{product.description}</p>
        
        <button
          onClick={() => onAddToCart(product)}
          className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition w-full md:w-auto"
        >
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}
