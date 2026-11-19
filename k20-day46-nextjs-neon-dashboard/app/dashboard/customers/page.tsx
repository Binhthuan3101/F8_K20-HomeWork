import { fetchCustomer } from "@/app/data";
import React from "react";

export default async function customerPage() {
  const customers = await fetchCustomer();
  console.log(customers);

  return (
    <div>
      <section>
        <h1 className="mb-4 text-2xl font-bold">Danh sách khách hàng</h1>
        <ul className="divide-y rounded-lg border">
          {customers.map((customer, index) => (
            <li key={index} className="px-4 py-2.5 text-sm">
              {customer.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
