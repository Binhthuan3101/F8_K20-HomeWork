import { useState } from "react";
import AppRoute from "./components/AppRoute";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const exist = prevItems.find((item) => item.id === product.id);
      if (exist) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    alert(`Đã thêm ${product.name} vào giỏ hàng!`);
  };

  return (
    <>
      <ScrollToTop />
      <AppRoute
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        setCartItems={setCartItems}
      />
    </>
  );
}

export default App;
