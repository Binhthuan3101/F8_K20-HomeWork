import { getProducts, ProductPage, Product } from '@/app/lib/products';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query || '';
  const page = Number(resolvedSearchParams.page || '1');

  const data: ProductPage = await getProducts(query, page);
  const products: Product[] = data.items || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Danh sách sản phẩm</h1>
        <p className="text-sm text-slate-400 mt-1">
          Tất cả sản phẩm hiện có trong cơ sở dữ liệu (Tổng số: {data.total}).
        </p>
      </div>

      {products.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          Không tìm thấy sản phẩm nào hoặc chưa khởi động API.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/40 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Tên sản phẩm</th>
                  <th className="py-4 px-6">Giá</th>
                  <th className="py-4 px-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-sm">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-4 px-6 font-mono text-slate-400">{product.id}</td>
                    <td className="py-4 px-6 font-medium text-slate-200">{product.name}</td>
                    <td className="py-4 px-6 text-yellow-400 font-semibold">{product.price.toFixed(3)}đ</td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        className="inline-block bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                      >
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}