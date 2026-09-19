import { useShop } from "../context/ShopContext";

export default function SearchBar() {
  const { allProducts, searchKey, selectedCategory, dispatch } = useShop();
  const categories = ["Tất cả", ...new Set(allProducts.map((p) => p.category))];
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <input
        type="text"
        placeholder="Tìm kiếm sản phẩm..."
        onChange={(e) =>
          dispatch({
            type: "SET_FILTER",
            payload: { searchKey: e.target.value },
          })
        }
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus: ring-blue-500"
      />
      <select
        value={selectedCategory}
        onChange={(e) =>
          dispatch({
            type: "SET_FILTER",
            payload: { selectedCategory: e.target.value },
          })
        }
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
