import { NavLink, Outlet, useNavigate } from "react-router";

export default function DefaultLayout() {
  const Navigate = useNavigate();
  return (
    <>
      <header className="p-4 bg-gray-100 flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : "text-black"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : "text-black"
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/card"
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : "text-black"
          }
        >
          Card
        </NavLink>
        <button
          onClick={() => Navigate("/login")}
          className="px-2 py-1 border border-slate-100 rounded-md"
        >
          Sign in
        </button>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
}
