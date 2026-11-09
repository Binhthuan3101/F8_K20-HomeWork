import Link from "next/link";
import Image from "next/image";
export default function Home() {
  return (
    <div className="p-4 mx-auto">
      <h1 className="font-bold text-2xl">Trang chủ</h1>
      <p>Ứng dụng quản lý sản phẩm viết bằng Next.js</p>
      <Link
        href="/dashboard"
        className="inline-block mt-2 py-2 px-5 rounded-lg bg-white text-black"
      >
        Vào trang Quản trị (Dashboard)
      </Link>
      <Image
        src="/images.jpg"
        width={200}
        height={200}
        alt="chào"
        loading="eager"
        className="mt-4 w-auto h-auto"
      />
    </div>
  );
}
