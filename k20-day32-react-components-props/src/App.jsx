import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./index.css";
import UserProfileCard from "./components/UserProfileCard";
import ProductList from "./components/ProductList";
import FaqAccordion from "./components/FaqAccordion";

function App() {
  const users = [
    {
      id: 1,
      avatar: "https://i.pravatar.cc/150?img=33",
      fullName: "Đậu Bình Thuận",
      jobTitle: "Frontend Developer",
      isOnline: true,
      skills: ["React", "Node.js", "Tailwind CSS", "JavaScript"],
    },
    {
      id: 2,
      avatar: "https://i.pravatar.cc/150?img=12",
      fullName: "Trần Thị B",
      jobTitle: "UI/UX Designer",
      isOnline: false,
      skills: ["Figma", "UI Design", "CSS Modules"],
    },
  ];

  const products = [
    {
      id: 1,
      name: "Bàn phím cơ Wireless K2",
      price: 1800000,
      image: "https://picsum.photos/300/200?random=1",
      inStock: true,
      discountPercent: 15,
    },
    {
      id: 2,
      name: "Chuột không dây Gaming",
      price: 850000,
      image: "https://picsum.photos/300/200?random=2",
      inStock: true,
      discountPercent: 0,
    },
    {
      id: 3,
      name: "Màn hình 27 inch 4K",
      price: 8500000,
      image: "https://picsum.photos/300/200?random=3",
      inStock: false,
      discountPercent: 10,
    },
    {
      id: 4,
      name: "Tai nghe Bluetooth Over-Ear",
      price: 2200000,
      image: "https://picsum.photos/300/200?random=4",
      inStock: true,
      discountPercent: 20,
    },
  ];


  const faqData = [
    {
      id: 101,
      question: "Props trong React dùng để làm gì?",
      answer:
        "Props giúp truyền dữ liệu từ component cha xuống component con một cách an toàn.",
      category: "React",
      isHot: true,
    },
    {
      id: 102,
      question: "Vite khác gì so với Create React App?",
      answer:
        "Vite sử dụng native ES modules giúp khởi tạo và HMR (Hot Module Replacement) nhanh hơn rất nhiều.",
      category: "Tooling",
      isHot: false,
    },
    {
      id: 103,
      question: "Tại sao cần truyền prop key khi sử dụng map()?",
      answer:
        "Key giúp React xác định phần tử nào đã thay đổi, thêm hoặc xóa, giúp tối ưu hiệu năng render.",
      category: "React",
      isHot: true,
    },
  ];

  const handleSelectFaq = (id) => {
    alert(`Bạn đã chọn xem chi tiết câu hỏi Faq có ID: ${id}`);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-12">
        <section>
          <h2 className="text-xl font-bold mb-2 pb-2 border-b border-slate-800">
            Bài 1: UserProfileCard
          </h2>
          <div className="flex flex-wrap gap-6">
            {users.map((user) => (
              <UserProfileCard
                key={user.id}
                avatar={user.avatar}
                fullName={user.fullName}
                jobTitle={user.jobTitle}
                isOnline={user.isOnline}
                skills={user.skills}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2 pb-2 border-b border-slate-800">
            Bài 2: ProductList
          </h2>
          <div className="flex flex-wrap gap-6">
            <ProductList products={products} />
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-2 pb-2 border-b border-slate-800">
            Bài 3: FAQ / Accordion
          </h2>
            <FaqAccordion faqData={faqData} onSelectFaq={handleSelectFaq}/>
        </section>
      </div>
    </div>
  );
}

export default App;
