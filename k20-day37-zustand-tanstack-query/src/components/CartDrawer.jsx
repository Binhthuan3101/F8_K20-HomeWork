import { Minus, Plus, Trash, X } from "lucide-react";
import { useCartStore } from "../store/useCartStore";

export default function CartDrawer({ isOpen, onClose }) {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeQuantity = useCartStore((state) => state.removeFromCart);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-lg font-bold text-gray-800">
              Giỏ hàng của bạn
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 divide-y">
            {items.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-medium">
                Giỏ hàng trống
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex items-center gap-4">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded border"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Đơn giá: ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm font-bold text-blue-600 mt-1">
                      Thành tiền: {item.price * item.quantity.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 border rounded p-1">
                    <button
                      disabled={item.quantity <= 1}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeQuantity(item.id)}
                    title="Xóa sản phẩm"
                    className="py-1.5 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between text-base font-bold text-gray-900 mb-4">
              <span>Tổng tiền thanh toán: </span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button
              disabled={items.length === 0}
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
