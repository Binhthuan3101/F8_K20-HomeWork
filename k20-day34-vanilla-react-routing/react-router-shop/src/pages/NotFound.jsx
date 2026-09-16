import { Link } from "react-router";
export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-extrabold text-indigo-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Trang không tồn tại</h2>
      <p className="text-gray-500 mb-6">Đường dẫn bạn truy cập không chính xác.</p>
      <Link
        to="/"
        className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
