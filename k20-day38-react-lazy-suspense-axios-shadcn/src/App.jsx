import { Routes, Route, Link } from "react-router";
import { Button } from "./components/ui/button";
import ProductCatalog from "./components/ProductCatalog";
import ProductManagement from "./components/ProductManagement";
import ProductDetail from "./components/ProductDetail";
import { useState } from "react";
import { set } from "zod";

function App() {
  const [tab, setTab] = useState("bai1");
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b p-4 flex justify-center gap-4">
        <Link to="/" onClick={() => setTab("bai1")}>
          <Button variant={tab === "bai1" ? "default" : "outline"}>
            Bài 1: Danh mục
          </Button>
        </Link>

        <Link to="/management" onClick={() => setTab("bai2")}>
          <Button variant={tab === "bai2" ? "default" : "outline"}>
            Bài 2: Quản lý
          </Button>
        </Link>

        <Link to="/products/1" onClick={() => setTab("bai3")}>
          <Button variant={tab === "bai3" ? "default" : "outline"}>
            Bài 3: Chi tiết && Review
          </Button>
        </Link>
      </nav>

      <main className="py-6">
        <Routes>
          <Route path="/" element={<ProductCatalog />} />

          <Route path="/management" element={<ProductManagement />} />

          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
