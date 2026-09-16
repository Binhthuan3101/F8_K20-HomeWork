import { Route, Routes } from "react-router";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Products from "../pages/Products";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/Sign-In";
import NotFound from "../pages/NotFound";
import SignUp from "../pages/Sign-Up";

// Nhận các dữ liệu giỏ hàng được truyền từ file App.jsx sang
export default function AppRoute({ cartItems, onAddToCart, setCartItems }) {
  return (
    <Routes>
      <Route element={<DefaultLayout cartItems={cartItems} />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        
        <Route path="products/:productId" element={<ProductDetail onAddToCart={onAddToCart} />} />
        
        <Route path="cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
