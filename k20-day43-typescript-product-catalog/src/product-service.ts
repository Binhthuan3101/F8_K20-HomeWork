import { Product, ProductUpdate } from "./product-types";

const products: Product[] = [
  {
    id: 101,
    name: "Laptop Air",
    price: 24990000,
    category: "computer",
    stock: 8,
  },
  {
    id: 102,
    name: "Chuột không dây",
    price: 450000,
    category: "accessory",
    stock: 4,
  },
  {
    id: 103,
    name: "Bàn phím cơ",
    price: 1290000,
    category: "accessory",
    stock: 12,
  },
  {
    id: 104,
    name: "Màn hình 27 inch",
    price: 5990000,
    category: "computer",
    stock: 0,
  },
  {
    id: 105,
    name: "Tai nghe Bluetooth",
    price: 1890000,
    category: "audio",
    stock: 5,
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function findProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id);
}

export function updateProduct(
  id: number,
  update: ProductUpdate,
): Product | undefined {
  const index = products.findIndex((product) => product.id === id);
  if (index === -1) {
    return undefined;
  }
  const updateProduct: Product = {
    ...products[index],
    ...update,
    id: products[index].id,
  };
  products[index] = updateProduct;
  return updateProduct;
}

export function filterBy<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K],
): T[] {
  return items.filter((item) => item[key] === value);
}
