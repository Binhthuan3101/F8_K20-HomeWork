import Badge from "./Badge";

const ProductItem = ({ product, onAddToCart }) => {
  const { name, price, image, inStock, discountPercent } = product;
  const finalPrice =
    discountPercent > 0 ? price * (1 - discountPercent / 100) : price;
  const formatPrice = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg overflow-hidden transition-all ${inStock ? "opacity-100" : "opacity-50 grayscale"} flex flex-col gap-2`}
    >
      <div className="relative aspect-video w-full">
        {!inStock && <Badge type="outOfStock" text="Hết hàng" />}
        {inStock && discountPercent > 0 && (
          <Badge type="discount" text={`Giảm ${discountPercent}%`} />
        )}
        <img src={image} alt={name} className="w-full object-cover h-full" />
      </div>

      <div className="p-4 flex flex-col flex-grow gap-2">
        <h4 className="font-semibold text-gray-800 line-clamp-2">{name}</h4>
        <div className="flex items-center gap-2 my-1">
          {discountPercent > 0 ? (
            <>
              <span className="text-lg font-bold text-red-600">
                {formatPrice(finalPrice)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </span>
          )}
        </div>
        <button
          disabled={!inStock}
          onClick={() => onAddToCart(name, finalPrice)}
          className={`mt-auto w-full flex items-center justify-center gap-2 py-2 rounded-lg font-semibold text-white transition-colors ${
            inStock
              ? "bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {inStock ? (
            <>
              <span>
                <i className="fa-solid fa-cart-shopping"></i>
              </span>
              <span>Thêm vào giỏ hàng</span>
            </>
          ) : (
            <span>Hết hàng</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
