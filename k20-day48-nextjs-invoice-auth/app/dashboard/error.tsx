"use client";

import React from "react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 rounded-lg border border-red-900/50 bg-red-950/20 p-8 text-center">
      <h2 className="text-xl font-bold text-red-400">Đã xảy ra lỗi</h2>
      <p className="max-w-md text-sm text-slate-300">
        {error.message || "Không thể hiển thị dữ liệu lúc này."}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Thử lại
      </button>
    </div>
  );
}
