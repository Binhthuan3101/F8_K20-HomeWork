export const products = [
  {
    id: "1",
    name: "Tai nghe Wireless Over-Ear",
    price: 1250000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNDYlIulCsyWk0n8m0WDG5Xn_oK4aO0V11xOiTykKxnQ&s=10",
    description: "Tai nghe chống ồn chủ động, thời lượng pin 30 giờ liên tục.",
  },
  {
    id: "2",
    name: "Bàn phím cơ Mechanical Keyboard",
    price: 1890000,
    thumbnail:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSWJ2JI8pvGYREbooe-bkycaS0W4bN6oDX0QzGB2Ek7Lj2maycVfVFnvYrFXkPBXXy9I3Set54OYy6a63iAkTJ8HFe61qS-gzFFG1AG7Wrk&usqp=CAc",
    description: "Bàn phím cơ Switch Brown gõ êm, đèn nền RGB 16.8 triệu màu.",
  },
  {
    id: "3",
    name: "Chuột Gaming Ergonomic",
    price: 850000,
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtvZW42ixYYYuqvjOJtf6f64fj7n-BJHJGAjdxjVoEsQ&s",
    description:
      "Cảm biến quang học 16.000 DPI, thiết kế công thái học chống mỏi tay.",
  },
  {
    id: "4",
    name: "Đồng hồ thông minh Smartwatch",
    price: 3200000,
    thumbnail:
      "https://donghoduyanh.com/images/news/2023/06/12/large/dong-ho-thong-minh_1686508180.jpg",
    description: "Đo nhịp tim, theo dõi giấc ngủ, kháng nước chuẩn 5ATM.",
  },
];

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
