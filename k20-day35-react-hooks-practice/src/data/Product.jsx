export const PRODUCTS = [
  {
    id: 1,
    name: "Tai nghe Bluetooth Wireless",
    price: 750000,
    category: "Âm thanh",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIZR73fgj82YLO5_8UXqVPUdh3hm_CWKAIl_v6sMLwLw&s=10",
    description: "Âm thanh sống động, pin 24 giờ.",
  },
  {
    id: 2,
    name: "Bàn phím Cơ RGB Red Switch",
    price: 1200000,
    category: "Phụ kiện",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD03QnCL41BEzhMFE3tNiO6Nnq_Fn7xFr8X44nc0Z_HA&s=10",
    description: "Gõ êm ái, đèn LED nhiều chế độ.",
  },
  {
    id: 3,
    name: "Chuột Không Dây Ergonomic",
    price: 450000,
    category: "Phụ kiện",
    thumbnail: "https://cohotech.vn/wp-content/uploads/2023/06/Chuot-khong-day-INPHIC-PX2-01-01.jpg",
    description: "Thiết kế ergonomic chống mỏi cổ tay.",
  },
  {
    id: 4,
    name: "Loa Bluetooth Mini Bass",
    price: 600000,
    category: "Âm thanh",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxG6OButyZBEPbl5akHvQ5TJFAslilPODRWvNVzgMfsl4iUGhTH2IfFpop&s=10",
    description: "Kháng nước IPX7, công suất 10W.",
  },
  {
    id: 5,
    name: "Màn hình Gaming 27 inch 144Hz",
    price: 4500000,
    category: "Màn hình",
    thumbnail: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_1_13_638092135855426777_man-hinh-gaming-4k.jpg",
    description: "Tấm nền IPS 1ms, độ phân giải FHD.",
  },
  {
    id: 6,
    name: "Laptop Ultrabook Slim 14",
    price: 18500000,
    category: "Máy tính",
    thumbnail: "https://cellphones.com.vn/sforum/wp-content/uploads/2022/08/laptop-4k-10.jpg",
    description: "Mỏng nhẹ 1.2kg, CPU Intel Core i5.",
  },
  {
    id: 7,
    name: "Sạc Dự Phòng Fast Charge 20000mAh",
    price: 380000,
    category: "Phụ kiện",
    thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5XthTtsx-6OOspDYPkfcv_uu3zcXBwdEXsxp_7cUf4g&s=10",
    description: "Sạc nhanh PD 22.5W kép USB-C.",
  },
  {
    id: 8,
    name: "Webcam Full HD 1080p",
    price: 550000,
    category: "Phụ kiện",
    thumbnail: "https://cdn.hstatic.net/200000722513/file/webcam-la-gi-1_41123d8184e1403cab27a6708c9d0f22.jpg",
    description: "Tích hợp Micro lọc ồn kép tự động.",
  },
];


export function formatPrice(price) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
}