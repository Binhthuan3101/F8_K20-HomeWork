import { useState } from "react";
import ProductFilter from "./components/ProductFilter";
import RegisterForm from "./components/RegisterForm";
import Header from "./components/Header";

function App() {
  const [activeTab, setActiveTab] = useState("ex1");
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Header />

      <div className="flex justify-center mb-8 border-b border-slate-200">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab("ex1")}
            className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === "ex1"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Bài 1: Bộ lọc 1.000 sản phẩm
          </button>

          <button onClick={()=>setActiveTab("ex2")} className={`py-3 px-6 font-semibold text-sm border-b-2 transition-colors ${
              activeTab === "ex2"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}>Bài 2: Form đăng ký</button>
        </nav>
      </div>
      <main>
        {activeTab==="ex1"&&<ProductFilter />}
        {activeTab==="ex2"&&<RegisterForm />}
      </main>
    </div>
  );
}

export default App;
