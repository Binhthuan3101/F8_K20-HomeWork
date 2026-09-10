import Badge from "./Badge";

export default function ProductItem({ product, onAddToCart }) {
  const isOutOfStock =
    product.stock === 0 || product.availabilityStatus === "Out of Stock";
  
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);
    
  const image = product.thumbnail || product.images?.[0];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div
      className={`bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col transition-all duration-200 hover:shadow-lg ${
        isOutOfStock ? "opacity-60 bg-slate-50" : ""
      }`}
    >
      {/* Container Ảnh & Badge */}
      <div className="relative h-48 bg-slate-100">
        <img 
          src={image} 
          alt={product.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discountPercentage > 0 && !isOutOfStock && (
            <Badge
              type="discount"
              text={`Giảm ${Math.round(product.discountPercentage)}%`}
            />
          )}
          {isOutOfStock && <Badge type="out-of-stock" text="Hết hàng" />}
        </div>
      </div>

      {/* Thông tin sản phẩm */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-800 line-clamp-2 h-12 mb-1">
          {product.title}
        </h3>

        <div className="flex gap-2 items-baseline mb-2">
          <span className="text-lg font-bold text-blue-600">
            {formatCurrency(discountedPrice)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-slate-400 line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-500 mb-4">Tồn kho: {product.stock}</p>

        {/* Button Thêm vào giỏ hàng */}
        <button 
          onClick={() => onAddToCart(product.title, formatCurrency(discountedPrice))}
          disabled={isOutOfStock}
          className={`mt-auto w-full py-2 px-3 rounded-md font-medium text-sm transition-colors ${
            isOutOfStock
              ? "bg-slate-200 text-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          }`}
        >
          {isOutOfStock ? "Hết hàng" : "Thêm vào giỏ"}
        </button>
      </div>
    </div>
  );
}