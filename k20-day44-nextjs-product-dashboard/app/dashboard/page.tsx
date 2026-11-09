import { getProductStats } from '@/app/lib/products';
import Link from 'next/link';

export default async function DashboardOverviewPage() {
  const stats = await getProductStats();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tổng quan hệ thống</h1>
        <p className="text-sm text-slate-400 mt-1">Số liệu thống kê trực tiếp từ API mẫu.</p>
      </div>

      {!stats ? (
        <div className="bg-slate-900 border border-red-500/30 rounded-xl p-6 text-center text-red-400">
          Không thể kết nối đến Express API (kiểm tra lại cổng 3001).
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tổng số sản phẩm (Total)</h3>
            <p className="text-4xl font-extrabold text-purple-400 mt-4">{stats.total}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Giá trung bình (Average Price)</h3>
            <p className="text-4xl font-extrabold text-yellow-400 mt-4">{stats.averagePrice}</p>
          </div>
        </div>
      )}

      <div className="pt-2">
        <Link href="/dashboard/products" className="text-sm font-medium text-purple-400 hover:text-purple-300 transition inline-flex items-center gap-1">
          Xem danh sách chi tiết sản phẩm &rarr;
        </Link>
      </div>
    </div>
  );
}