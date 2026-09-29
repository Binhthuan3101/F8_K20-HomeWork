import { useCartStore } from "../store/useCartStore";
import { ShoppingCart } from "lucide-react";
export default function Header({ onOpenCart }) {
  const items = useCartStore((state) => state.items);
  const totalQuantity = useCartStore((state) => state.getTotalQuantity);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Shop Z-Query</h1>
        <button
          className="relative cursor-pointer p-2 text-gray-700 hover:text-blue-600 transition flex items-center gap-2 border rounded-lg px-3 py-1.5"
          onClick={onOpenCart}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-medium">Giỏ hàng</span>
          {totalQuantity > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center  justify-center">
              {totalQuantity}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
