'use client';
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function Pagination({ totalPage }: { totalPage: number }) {
  const pathname = usePathname();
  const params = useSearchParams();

  const newParams = new URLSearchParams(params);
  const currentPage = newParams.get("page")||"1";

  newParams.delete("page");
  return (
    <div>
      <ul className="flex gap-2">
        {Array(totalPage)
          .fill(null)
          .map((_, i) => (
            <li key={i}>
              <Link
                className={currentPage===String(i+1)?"font-bold":""}
                href={`${pathname}?${newParams.size?"page="+(i+1)+"&"+newParams:"page="+(i+1)}`}
              >
                {i + 1}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
