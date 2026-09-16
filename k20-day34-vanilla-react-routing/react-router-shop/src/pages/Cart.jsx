import { Link } from "react-router";
import { formatPrice } from "../data/products.js";

export default function Cart({ cartItems = [], setCartItems }) {
  
  const updateQuantity = (id, change) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0) 
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
        <div className="bg-slate-900 border rounded-xl p-8 text-center shadow-sm">
          <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống.</p>
          <Link
            to="/products"
            className="inline-block bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h1>
      <div className="grid md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-slate-900 border rounded-xl p-4 flex gap-4 items-center shadow-sm">
              <img src={item.thumbnail} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
              
              <div className="flex-1">
                <h3 className="font-bold text-slate-200 line-clamp-1">{item.name}</h3>
                <p className="text-indigo-600 font-semibold text-sm">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center border rounded-lg bg-gray-50">
                <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition font-bold">-</button>
                <span className="px-3 py-1 font-semibold text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-gray-600 hover:bg-gray-200 transition font-bold">+</button>
              </div>

              <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1 transition">
                Xóa
              </button>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 border rounded-xl p-6 h-fit shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Hóa đơn điện tử</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Tổng số lượng:</span>
            <span className="font-semibold text-gray-800">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm</span>
          </div>
          <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-3">
            <span>Thành tiền:</span>
            <span className="text-indigo-600">{formatPrice(totalPrice)}</span>
          </div>
          <button onClick={() => alert("Cảm ơn bạn đã mua sắm tại hệ thống!")} className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-lg hover:bg-indigo-700 transition mt-4 text-sm">
            Tiến hành thanh toán
          </button>
        </div>

      </div>
    </div>
  );
}
