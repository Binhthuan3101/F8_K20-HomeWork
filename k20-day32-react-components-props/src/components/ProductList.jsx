import ProductItem from "./ProductItem";

const ProductList = ({ products }) => {
  if (!products.length) {
    return "Không có sản phẩm";
  }

  const handleAddToCart = (productName, actualPrice) => {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(actualPrice);
      alert(`Đã thêm "${productName}" vào giỏ hàng với giá ${formattedPrice}`)
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 py-1">
      {products.map((product,index) => (
        <ProductItem key={index} product={product} onAddToCart={handleAddToCart}/>
      ))}
    </div>
  );
};

export default ProductList;
