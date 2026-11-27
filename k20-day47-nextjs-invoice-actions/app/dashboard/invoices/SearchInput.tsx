"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "antd";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({
  initialSearch,
}: {
  initialSearch: string;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    if (term.trim()) {
      params.set("search", term.trim());
    } else {
      params.delete("search");
    }
    replace(`${pathname}/${params.toString()}`);
  }, 300);

  return (
    <Input.Search
      type="text"
      allowClear
      defaultValue={initialSearch}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="Tìm theo tên khách hàng..." 
    />
  );
}
