import { getProducts } from "@/app/lib/products";

export default async function Page() {
  const result = await getProducts();

  return (
    <div>
      <h1>Product</h1>
      <div>
        {result.items.length === 0 ? (
          <p>Không có sản phẩm</p>
        ) : (
          <div>
            {result.items.map((product) => (
              <div key={product.id}>
                <p>id: {product.id}</p>
                <p>name: {product.name}</p>
                <p>Giá: {product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
