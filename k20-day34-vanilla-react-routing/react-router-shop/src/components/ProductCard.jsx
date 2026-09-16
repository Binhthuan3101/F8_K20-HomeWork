import { Link } from "react-router";
import { formatPrice } from "../data/products.js";

export default function ProductCard({ product }) {
  return (
    <div className="bg-slate-500 border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col h-full">
      <img
        src={product.thumbnail}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="flex-1 flex flex-col justify-between">
          <h3 className="text-lg font-bold mb-1 text-gray-800 line-clamp-2">{product.name}</h3>
          <p className="text-indigo-600 font-semibold mb-4">{formatPrice(product.price)}</p>
        </div>
        
        <Link 
          to={`/products/${product.id}`} 
          className="block text-center bg-gray-900 text-white py-2 rounded-lg hover:bg-indigo-600 transition text-sm font-medium mt-auto"
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
}
