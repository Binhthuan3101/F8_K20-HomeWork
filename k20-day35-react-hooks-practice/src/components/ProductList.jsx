import { useShop } from "../context/ShopContext";
import ProductItem from "./ProductItem";

export default function ProductList() {
    const { products } = useShop();
    if (products.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">Không tìm thấy sản phẩm phù hợp.</div>
        )
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductItem key={product.id} product={product}/>
            ))}
        </div>
    )
}