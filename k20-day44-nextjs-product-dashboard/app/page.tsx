import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl text-center space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-purple-400">
          Product Dashboard
        </h1>
        <p className="text-slate-300 text-sm leading-relaxed">
          Ứng dụng quản lý sản phẩm tích hợp Nextjs App Route và Express Api mẫu
          (Buổi 44). Hỗ trợ đọc dữ liệu trực tiếp qua Server Components.
        </p>
        <div>
          <Link
            className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-medium px-6 py-3 rounded-xl transition shadow-lg shadow-purple-600/20"
            href="/dashboard"
          >
            Vào trang quản lý (Dashboard) &rarr
          </Link>
        </div>
      </div>
    </main>
  );
}
