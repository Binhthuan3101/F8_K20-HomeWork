import { createContext, useRef, useState } from "react";
import ShopProvider, { useShop } from "./context/ShopContext";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import CartModal from "./components/CartModal";
import AudioPlayer from "./components/AudioPlayer";
import Stopwatch from "./components/Stopwatch";
import Modal from "./components/Modal";
function MainShop() {
  const { totalCartCount } = useShop();
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Cửa hàng</h2>
        <button
          className="relative bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          onClick={() => setIsCartOpen(true)}
        >
          Giỏ hàng
          {totalCartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalCartCount}
            </span>
          )}
        </button>
      </div>
      <SearchBar />
      <ProductList />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
function App() {
  const modalRef = useRef(null);

  return (
    <ShopProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <header className="border-b pb-4">
            <h1 className="text-3xl font-extrabold to-gray-900">
              React Hooks Practice
            </h1>
          </header>
          <section>
            <MainShop />
          </section>
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AudioPlayer />
            <Stopwatch />
          </section>
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Imperative Modal Demo</h2>
            <button
              onClick={() => modalRef.current?.open()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg transition"
            >
              Mở bảng điều khoản
            </button>
            <Modal ref={modalRef} />
          </section>
        </div>
      </div>
    </ShopProvider>
  );
}

export default App;
