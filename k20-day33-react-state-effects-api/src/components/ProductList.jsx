import ProductItem from "./ProductItem";

export default function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500 font-medium">
        Không tìm thấy sản phẩm nào hết
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
