import { useState } from "react";
import { fetchProductsByCategory } from "./api/productApi";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import ProductList from "./components/ProductList";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onOpenCart={() => setIsCartOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <CategoryFilter />
        <ProductList />
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
