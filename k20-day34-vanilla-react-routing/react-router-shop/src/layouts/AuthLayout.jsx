import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center px-4">
      <div className=" mb-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          React Shop
        </Link>
      </div>
      <div className=" w-full max-w-md  p-8 rounded-xl shadow-md border border-gray-800">
        <Outlet />
      </div>
      <Link
        to="/"
        className="mt-6 text-sm text-gray-200 hover:text-indigo-600 hover:underline"
      >
        Quay lại trang chủ
      </Link>
    </div>
  );
}
