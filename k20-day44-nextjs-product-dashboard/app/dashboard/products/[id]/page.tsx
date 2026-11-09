import { getProductById } from "@/app/lib/products";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}
export default async function ProductById({ params }: PageProps) {
  const resolvedParams = await params;
  const rawId = resolvedParams.id;

  const parsedId = Number(rawId);
  const isValidNumber = Number.isInteger(parsedId) && parsedId > 0;
  let product = null;

  if (isValidNumber) {
    product = await getProductById(parsedId);
  }

  if (!isValidNumber || !product) {
    return (
      <div className="max-w-md mx-auto mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-xl">
        <div className="w-12 h-12 bg-red-500/10  text-red-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-slate-100">
          Không tìm thấy sản phẩm
        </h2>
        <p className="text-sm text-slate-400">
          Sản phẩm với mã <span>"{rawId}"</span>
        </p>
        <div className="pt-2">
          <Link
            href="/dashboard/products"
            className="inline-block bg-purple-600 hover:bg-purple-500 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition shadow-lg shadow-purple-600/20"
          >
            &larr; Quay về danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <Link
          className="text-sm text-purple-400 hover:text-purple-300 font-medium inline-flex items-center gap-1 mb-4 transition"
          href="/dashboard/products"
        >
          &larr; Quay về danh sách sản phẩm
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          Chi tiết sản phẩm
        </h1>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="grid grid-cols-2 gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              ID sản phẩm
            </span>
            <p className="text-lg font-mono font-semibold text-slate-300 mt-1">
              {product.id}
            </p>
          </div>
          <div>
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
              Giá bán
            </span>
            <p className="text-lg font-semibold text-yellow-400 mt-1">
              {product.price.toFixed(3)}đ
            </p>
          </div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">
            Tên sản phẩm
          </span>
          <p className="text-2xl font-bold text-slate-100 mt-1">
            {product.name}
          </p>
        </div>
      </div>
    </div>
  );
}
