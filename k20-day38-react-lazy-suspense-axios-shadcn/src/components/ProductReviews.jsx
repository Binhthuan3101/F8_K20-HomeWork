export default function ProductReviews({ reviews = [] }) {
  return (
    <div className="mt-6 border-t pt-4 space-y-4">
      <h3 className="text-lg font-bold">
        Đánh giá từ khách hàng ({reviews.length})
      </h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">Sản phẩm chưa có đánh giá</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((rev, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg border">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-sm">
                  {rev.reviewerName}
                </span>
                <span className="text-amber-500 font-bold text-sm">
                  ★ {rev.rating}/5
                </span>
              </div>
              <p>{rev.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
