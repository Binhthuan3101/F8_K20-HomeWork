const API_URL = process.env.API_URL || "http://localhost:3001";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type ProductInput = Omit<Product, "id">;

type ProductPage = {
  items: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
};

async function request<T>(path: string, option?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/${path}`, {
    method: option?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...option?.headers,
    },
    body: option?.body ? JSON.stringify(option.body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  const data = await res.json();
  return data as T;
}

export async function getProducts(query = "", page = 1, pageSize = 5) {
  const params = new URLSearchParams({
    query: query,
    page: page.toString(),
    pageSize: pageSize.toString(),
  });
  const data = await request<ProductPage>(`products?${params.toString()}`);
  return data;
}
