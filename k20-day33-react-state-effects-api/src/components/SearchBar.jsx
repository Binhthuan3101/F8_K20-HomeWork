export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Nhập tên sản phẩm cần tìm..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
      />
    </div>
  );
}
