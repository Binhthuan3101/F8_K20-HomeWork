"use client";
import { Input } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function SearchInput({
  initialSearch,
}: {
  initialSearch: string;
}) {
  const pathname = usePathname();
  const { replace } = useRouter();

  const [value, setValue] = useState(initialSearch);
  useEffect(() => {
    setValue(initialSearch);
  }, [initialSearch]);
  const handleChange = (nextValue: string) => {
    setValue(nextValue);
    const params = new URLSearchParams();
    const trimmed = nextValue.trim();

    if (trimmed) {
      params.set("search", nextValue);
    } else { 
      params.delete("search");
    }
    params.delete("page");

    const queryString = params.toString();
    replace(queryString ? `${pathname}?${queryString}` : pathname);
  };
  return (
    <Input.Search
      value={value}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Tìm theo tên khách hàng"
      allowClear
    />
  );
}
