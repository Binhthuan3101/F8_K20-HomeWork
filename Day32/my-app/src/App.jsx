import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import Menu from "./components/menu";

function App() {
  const products = [
    { name: "Iphone 18 pro max", price: 1299, color: "red" },
    { name: "macbook pro m6", price: 1000, color: "white" },
  ];

  const users = [
    { name: "John Doe", age: 30 },
    { name: "Jack Smith", age: 20 },
    { name: "Jack Ma", age: 45 },
  ];
  return (
    <div>
      <h1 className="text-red-500 font-bold text-3xl">Hello react</h1>
      <Menu items={products} />
      <Menu items={ users} />
    </div>
  );
}

export default App;
