import { fetchCustomers } from "@/app/data";
import CreateForm from "@/app/ui/CreateForm";
import React from "react";

export default async function page() {
  const customers = await fetchCustomers();
  return (
    <div>
      <h1 className="font-bold text-2xl">Create</h1>
      <CreateForm customers={customers} />
    </div>
  );
}
