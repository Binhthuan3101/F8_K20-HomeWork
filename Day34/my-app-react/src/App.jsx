import { useState } from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DefaultLayout from "./layouts/DefaultLayout";
import Card from "./pages/Card";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import Authlayout from "./layouts/AuthLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="card" element={<Card />} />
      </Route>
      <Route path="/" element={<Authlayout/>}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
