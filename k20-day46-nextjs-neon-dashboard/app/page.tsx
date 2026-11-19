import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-3xl font-bold">Hệ thống quản lý hóa đơn & khách hàng</h1>
      <p className="max-w-xl text-gray-600">
        Ứng dụng Next.js kết nối trực tiếp tới Neon Postgres, hỗ trợ xem hóa đơn mới nhất,
        danh sách khách hàng, tìm kiếm theo tên và phân trang trên URL.
      </p>
      <div className="overflow-hidden rounded-lg border shadow-sm">
        <Image
          src="/slide-2.png"
          alt="Minh họa dashboard hóa đơn"
          width={720}
          height={405}
          priority
        />
      </div>
      <Link
        href="/dashboard"
        className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Vào Dashboard
      </Link>
    </main>
  );
}