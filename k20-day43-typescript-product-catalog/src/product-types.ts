export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
}

export const PRODUCT_STATUSES = [
  "in-stock",
  "low-stock",
  "out-of-stock",
] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export type ProductUpdate = Partial<Product>;

export const STATUS_LABELS: Record<ProductStatus, string> = {
  "in-stock": "Còn hàng",
  "low-stock": "Sắp hết hàng",
  "out-of-stock": "Hết hàng",
};

export type ProductFieldErrors = {
  [K in keyof Product]: string;
};

export function getProductStatus(stock: number): ProductStatus {
  if (stock === 0) {
    return "out-of-stock";
  }
  if (stock <= 5) return "low-stock";
  return "in-stock";
}

export function getProductStatusLabel(stock: number): string {
  const status = getProductStatus(stock);
  return STATUS_LABELS[status];
}
