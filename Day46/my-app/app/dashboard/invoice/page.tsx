import Pagination from "@/app/ui/Pagination";
import Search from "@/app/ui/Search";
import React from "react";

export default function Page() {
  return (
    <div className="space-y-4">
      <div>invoice</div>
          <Search placeholder="Search invoice" />
          <Pagination totalPage={10}/>
    </div>
  );
}
