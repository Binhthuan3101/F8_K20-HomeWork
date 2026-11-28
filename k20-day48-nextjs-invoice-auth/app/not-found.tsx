import Link from "next/link";
import React from "react";

export default function notFound() {
  return (
    <div className="h-screen flex items-center flex-col justify-center">
      <h1 className="font-bold text-9xl text-slate-500">404</h1>
      <p className="">Trang không tồn tại</p>
      <Link className="py-2 px-8 rounded-xl mt-3 bg-white text-black" href={"/dashboard/invoices"}>Quay lại</Link>
    </div>
  );
}
