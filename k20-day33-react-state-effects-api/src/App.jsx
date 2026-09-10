import { useState, useEffect } from "react";
import UserProfileCard from "./components/UserProfileCard";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

function App() {
  // Bài 1
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false); // Sửa UserLoading -> userLoading
  const [userError, setUserError] = useState(null);

  // Bài 2
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productLoading, setProductLoading] = useState(false);
  const [productError, setProductError] = useState(null);

  // Bài 1: Fetch User Info
  useEffect(() => {
    const controller = new AbortController();
    async function fetchUser() {
      setUserLoading(true);
      setUserError(null);
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Không thể tải dữ liệu người dùng");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setUserError(err.message || "Có lỗi xảy ra");
        }
      } finally {
        setUserLoading(false);
      }
    }
    fetchUser();
    return () => controller.abort();
  }, [userId]);

  // Bài 2: Fetch Products
  useEffect(() => {
    const controller = new AbortController();
    async function fetchProduct() {
      setProductLoading(true);
      setProductError(null);
      try {
        const url = searchTerm.trim()
          ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchTerm)}`
          : "https://dummyjson.com/products?limit=10";

        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Không thể tải danh sách sản phẩm");
        }
        const data = await response.json();
        setProducts(data.products || []);
        console.log(products);
        
      } catch (err) {
        if (err.name !== "AbortError") {
          setProductError(err.message || "Có lỗi xảy ra khi tải sản phẩm");
        }
      } finally {
        setProductLoading(false);
      }
    }
    fetchProduct();
    return () => controller.abort();
  }, [searchTerm]);

  const handleAddToCart = (title, discountPrice) => {
    alert(`Đã thêm ${title} vào giỏ hàng với giá ${discountPrice}!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* SECTION BÀI 1 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">
            Bài 1: Single User Profile Card
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => setUserId((prev) => Math.max(1, prev - 1))}
              disabled={userId <= 1 || userLoading}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              User trước
            </button>
            <span className="font-semibold text-slate-600 min-w-[90px] text-center">
              ID: {userId}
            </span>
            <button
              onClick={() => setUserId((prev) => prev + 1)}
              disabled={userLoading}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              User tiếp theo
            </button>
          </div>

          {userLoading && (
            <div className="text-center py-8 text-blue-600 font-medium animate-pulse">
              Đang tải dữ liệu người dùng...
            </div>
          )}
          {userError && (
            <div className="text-center p-4 bg-rose-50 text-rose-600 rounded-lg font-medium">
              {userError}
            </div>
          )}
          {!userLoading && !userError && user && (
            <UserProfileCard user={user} />
          )}
        </section>

        {/* SECTION BÀI 2 */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-800 border-b border-slate-100 pb-4 mb-6">
            Bài 2: E-commerce Product Explorer
          </h1>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          
          {productLoading && (
            <div className="text-center py-12 text-blue-600 font-medium animate-pulse">
              Đang tải danh sách sản phẩm...
            </div>
          )}
          {productError && (
            <div className="text-center p-4 bg-rose-50 text-rose-600 rounded-lg font-medium">
              {productError}
            </div>
          )}
          {!productLoading && !productError && (
            <ProductList products={products} onAddToCart={handleAddToCart} />
          )}
        </section>

      </div>
    </div>
  );
}

export default App;