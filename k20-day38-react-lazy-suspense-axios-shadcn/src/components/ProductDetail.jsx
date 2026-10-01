import { useQuery } from "@tanstack/react-query";
import { lazy, Suspense, useState } from "react";
import { getProductById } from "./api/productApi";
import { Button } from "./ui/button";
import { useNavigate, useParams } from "react-router";

const ProductReviews = lazy(() => import("./ProductReviews"));
export default function ProductDetail() {
  const [showReviews, setShowReviews] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <header className="border-b pb-3">
        <h1 className="text-xl font-black text-indigo-600">
          THUAN STORE OFFICIAL
        </h1>
      </header>

      {isPending && <p>Đang tải thông tin sản phẩm...</p>}
      {isError && (
        <div className="flex gap-3 items-center text-red-600">
          <p>Có lỗi xảy ra khi tải sản phẩm</p>
          <Button onClick={() => refetch()}>Thử lại</Button>
        </div>
      )}

      {product && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-64 object-cover rounded-lg border"
            />

            <div className="space-y-3">
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="text-2xl font-semibold text-emerald-600">
                {product.price}
              </p>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <Button onClick={() => setShowReviews((prev) => !prev)}>
                {showReviews ? "Ẩn đánh giá" : "Xem đánh giá"}
              </Button>
            </div>
          </div>
          {showReviews && (
            <Suspense
              fallback={
                <p className="text-gray-500 italic mt-4">
                  Đang tải giao diện đánh giá...
                </p>
              }
            >
              <ProductReviews reviews={product.reviews} />
            </Suspense>
          )}
        </div>
      )}
    </div>
  );
}
