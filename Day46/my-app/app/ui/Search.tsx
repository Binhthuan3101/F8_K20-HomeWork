"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search({ placeholder }: { placeholder: string }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const newParams = new URLSearchParams(params);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    replace(`${pathname}?${newParams}`);
  };

  return (
      <input
          className="p-3"
      type="text"
      placeholder={placeholder}
      defaultValue={params.get("search") || ""}
      onChange={handleChange}
    />
  );
}
