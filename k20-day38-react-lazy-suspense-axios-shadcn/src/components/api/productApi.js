import { axiosInstance } from "./axiosInstance";

// fetch danh mục
export const getCategories = async () => {
  const res = await axiosInstance.get("/products/categories");
  return res.data;
};

// fetch sản phẩm theo danh mục
export const getProductsCatalog = async (category) => {
  const url =
    category === "all"
      ? "/products"
      : `/products/category/${encodeURIComponent(category)}`;
  const res = await axiosInstance.get(url);
  return res.data;
};

// fetch danh sách sản phẩm
export const getProducts = async () => {
  const res = await axiosInstance.get("/products");
  return res.data.products;
};

// fetch thêm sản phẩm
export const addProduct = async (productData) => {
  const res = await axiosInstance.post("/products/add", productData);
  return res.data;
};

// fetch chỉnh sửa sản phẩm
export const updateProduct = async ({ id, ...productData }) => {
  const res = await axiosInstance.patch(`/products/${id}`, productData);
  return res.data;
};

// fetch chi tiết 1 sản phẩm
export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};
