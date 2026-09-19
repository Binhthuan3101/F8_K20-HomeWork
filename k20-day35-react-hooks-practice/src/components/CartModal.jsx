import { useShop } from "../context/ShopContext";
import { formatPrice } from "../data/Product";

export default function CartModal({ isOpen, onClose }) {
  const { cart, totalCartCount, totalCartPrice, dispatch } = useShop();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b pb-4">
          <h2>Giỏ hàng ({totalCartCount})</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto my-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-50 py-8">Giỏ hàng trống</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-3 gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-20 object-cover rounded-md"
                    src={item.thumbnail}
                    alt={item.name}
                  />
                  <div>
                    <h4>{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-30"
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity - 1 },
                        })
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 font-medium text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      if (
                        confirm(`Bạn có chắc chắn muốn xóa ${item.name} không?`)
                      ) {
                        return dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item.id,
                        });
                      }
                      return;
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-center text-lg font-bold mb-4">
            <span>Tổng thanh toán:</span>
            <span>{formatPrice(totalCartPrice)}</span>
          </div>
          <div className=" flex justify-between items-center">
            <button
              className="w-[40%] bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition font-medium"
              onClick={onClose}
            >
              Đóng giỏ hàng
            </button>
            <button
              className="w-[40%] bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition font-medium"
              onClick={() => {
                alert("Đã thanh toán thành công!");
                onClose();
                cart.forEach((item) =>
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id }),
                );
              }}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
