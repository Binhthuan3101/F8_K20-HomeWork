import { useTheme } from "./store/store";

function App() {
  // 1. Lấy dữ liệu state và hàm từ Zustand Store
  const theme = useTheme((state) => state.theme);
  const toggleTheme = useTheme((state) => state.toggleTheme);
  // 2. Tự động thay đổi Style dựa theo giá trị của biến theme
  const appStyle = {
    backgroundColor: theme === "light" ? "#ffffff" : "#1a1a1a",
    color: theme === "light" ? "#000000" : "#ffffff",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    transition: "all 0.3s ease", // Giúp hiệu ứng chuyển màu mượt mà hơn
  };

  const buttonStyle = {
    padding: "8px 16px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: theme === "light" ? "#1a1a1a" : "#ffffff",
    color: theme === "light" ? "#ffffff" : "#1a1a1a",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px",
  };

  return (
    <div style={appStyle}>
      <h1>hello f8</h1>
      <p>Current theme: <strong>{theme}</strong></p>
      
      {/* Đã sửa lỗi: Truyền trực tiếp hàm toggleTheme vào onClick */}
      <button style={buttonStyle} onClick={toggleTheme}>
        Toggle theme
      </button>
    </div>
  );
}

export default App;
