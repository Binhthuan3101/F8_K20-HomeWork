const API_URL = process.env.API_URL || "http://localhost:3001";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type ProductInput = Omit<Product, "id">;

export type ProductPage = {
  items: Product[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export type ProductStats = {
  total: number;
  averagePrice: number;
};

async function request<T>(path: string, options?: RequestInit) {
  const res = await fetch(`${API_URL}/${path}`, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...{ ...options?.headers },
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store", 
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

export async function getProductStats() {
  try {
    const data = await request<ProductStats>("products/stats");
    return data;
  } catch (error) {
    console.error("Failed to fetch product stats:", error);
    return null;
  }
}

export async function getProductById(id: number) {
  try {
    const data = await request<Product>(`products/${id}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
}
