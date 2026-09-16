import { products } from "../data/products.js";
import  ProductCard  from "../components/ProductCard.jsx";

export default function Products() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Danh sách sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
