import { fetchCustomers } from "@/app/data"; // Sửa lại đường dẫn tới file data.ts của bạn cho đúng

export default async function CustomersPage() {
  const customers = await fetchCustomers();

  return (
    <div className="p-6">
      <section>
        <h1 className="mb-4 text-2xl font-bold">Danh sách khách hàng</h1>

        {customers.length === 0 ? (
          <p className="text-sm text-gray-500">Chưa có khách hàng nào.</p>
        ) : (
          <ul className="divide-y rounded-lg border ">
            {customers.map((customer) => (
              <li key={customer.id} className="px-4 py-2.5 text-sm">
                {customer.name}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
