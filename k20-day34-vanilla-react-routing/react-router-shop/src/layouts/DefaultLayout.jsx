import { Outlet } from "react-router";
import Header from "../components/Header"; 

export default function DefaultLayout({cartItems}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />
      
      <main className="max-w-6xl bg-slate-950 mx-auto px-4 py-8 flex-1 w-full">
        <Outlet />
      </main>     
      
      <footer className="bg-slate-800 border-t py-4 text-center text-sm text-gray-600">
        © 2026 React Router Shop. All rights reserved.
      </footer> 
    </div>
  );
}
