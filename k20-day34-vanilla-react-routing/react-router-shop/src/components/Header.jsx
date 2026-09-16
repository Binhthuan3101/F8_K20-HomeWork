import { NavLink, useLocation } from "react-router";

export default function Header() {
  const location = useLocation();
  const isProductsActive = location.pathname.startsWith("/products");

  const getNavLinkClass = ({ isActive }) =>
    `hover:text-indigo-400 font-medium ${isActive ? "text-indigo-400 border-b-2 border-indigo-400" : ""}`;

  return (
    <header className="bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-indigo-400">
          React Shop
        </NavLink>

        <nav className="flex gap-6">
          <NavLink to="/" end className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={`hover:text-indigo-400 font-medium ${isProductsActive ? "text-indigo-400 border-b-2 border-indigo-400" : ""}`}
          >
            Products
          </NavLink>

          <NavLink to="/cart" className={getNavLinkClass}>
            Cart
          </NavLink>
          <NavLink to="/sign-in" className={getNavLinkClass}>
            Sign In
          </NavLink>
          <NavLink to="/sign-up" className={getNavLinkClass}>
            Sign Up
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
