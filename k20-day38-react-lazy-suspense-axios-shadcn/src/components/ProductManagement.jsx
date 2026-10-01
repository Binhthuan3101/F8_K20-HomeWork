import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addProduct, getProducts, updateProduct } from "./api/productApi";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function ProductManagement() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      stock: "",
    },
  });

  const {
    data: products,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // Mutation thêm sản phẩm
  const addMutation = useMutation({
    mutationFn: addProduct,

    onSuccess: (responseData) => {
      setSuccessMessage(`Thêm sản phẩm "${responseData.title}" thành công`);

      setIsOpen(false);
      reset();

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (err) => {
      setApiError(err.message || "Có lỗi xảy ra khi thêm sản phẩm");
    },
  });

  // Mutation sửa sản phẩm
  const updateMutation = useMutation({
    mutationFn: updateProduct,

    onSuccess: (responseData) => {
      setSuccessMessage(`Cập nhật sản phẩm "${responseData.title}" thành công`);

      setIsOpen(false);

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (err) => {
      setApiError(err.message || "Có lỗi xảy ra khi cập nhật sản phẩm");
    },
  });

  // Mở Dialog thêm sản phẩm
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setApiError("");

    reset({
      title: "",
      price: "",
      stock: "",
    });

    setIsOpen(true);
  };

  // Mở Dialog sửa sản phẩm
  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setApiError("");

    reset({
      title: product.title,
      price: String(product.price),
      stock: String(product.stock),
    });

    setIsOpen(true);
  };

  // Hàm submit form
  const onSubmit = (data) => {
    setApiError("");

    const payload = {
      title: data.title.trim(),
      price: Number(data.price),
      stock: Number(data.stock),
    };

    // Nếu đang sửa
    if (editingProduct) {
      updateMutation.mutate({
        id: editingProduct.id,
        ...payload,
      });
    }

    // Nếu đang thêm
    else {
      addMutation.mutate(payload);
    }
  };

  // Kiểm tra đang thêm hoặc sửa
  const isSubmitting = addMutation.isPending || updateMutation.isPending;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>

        <Button onClick={handleOpenAdd}>Thêm sản phẩm</Button>
      </div>

      {/* Thông báo thành công */}
      {successMessage && (
        <div className="p-3 bg-green-100 text-green-700 rounded-md transition-all">
          {successMessage}
        </div>
      )}

      {/* Loading */}
      {isPending && <p>Đang tải danh sách sản phẩm...</p>}

      {/* Lỗi lấy dữ liệu */}
      {isError && (
        <div className="flex gap-2 items-center text-red-600">
          <p>Không thể tải dữ liệu</p>

          <Button onClick={() => refetch()}>Thử lại</Button>
        </div>
      )}

      {/* Danh sách sản phẩm */}
      {products && (
        <div className="border rounded-lg overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3">Tên sản phẩm</th>

                <th className="p-3">Giá</th>

                <th className="p-3">Tồn kho</th>

                <th className="p-3 text-right">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((prod) => (
                <tr key={prod.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{prod.title}</td>

                  <td className="p-3">{prod.price}</td>

                  <td className="p-3">{prod.stock}</td>

                  <td className="p-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(prod)}
                    >
                      Chỉnh sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Dialog thêm / sửa */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </DialogTitle>

            <DialogDescription>
              {editingProduct
                ? "Cập nhật thông tin chi tiết cho sản phẩm đã chọn"
                : "Nhập thông tin sản phẩm mới để thêm vào danh sách."}
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-2">
            {/* Lỗi API */}
            {apiError && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {apiError}
              </p>
            )}

            {/* Tên sản phẩm */}
            <div className="space-y-1">
              <Label htmlFor="product-title">Tên sản phẩm</Label>

              <Input
                type="text"
                id="product-title"
                {...register("title", {
                  required: "Tên không được để trống.",

                  validate: (value) =>
                    value.trim() !== "" ||
                    "Tên không được chỉ chứa khoảng trắng",
                })}
              />

              {errors.title && (
                <p className="text-xs text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Giá */}
            <div className="space-y-1">
              <Label htmlFor="product-price">Giá</Label>

              <Input
                type="number"
                id="product-price"
                step="any"
                {...register("price", {
                  required: "Giá không được để trống.",

                  validate: (value) => {
                    const p = Number(value);

                    return (!isNaN(p) && p > 0) || "Giá phải lớn hơn không";
                  },
                })}
              />

              {errors.price && (
                <p className="text-xs text-red-500">{errors.price.message}</p>
              )}
            </div>

            {/* Tồn kho */}
            <div className="space-y-1">
              <Label htmlFor="product-stock">Tồn kho</Label>

              <Input
                id="product-stock"
                type="number"
                {...register("stock", {
                  required: "Tồn kho không được để trống.",

                  validate: (value) => {
                    const s = Number(value);

                    if (isNaN(s) || s < 0) {
                      return "Tồn kho phải là số không âm.";
                    }

                    if (!Number.isInteger(s)) {
                      return "Tồn kho phải là số nguyên.";
                    }

                    return true;
                  },
                })}
              />

              {errors.stock && (
                <p className="text-xs text-red-500">{errors.stock.message}</p>
              )}
            </div>

            {/* Nút */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Hủy
              </Button>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Đang xử lý..."
                  : editingProduct
                    ? "Lưu thay đổi"
                    : "Thêm mới"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
