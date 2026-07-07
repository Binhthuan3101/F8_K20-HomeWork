const customers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com" },
  { id: 4, name: "Bob Brown", email: "bob@example.com" },
  { id: 5, name: "Charlie Green", email: "charlie@example.com" },
];

const products = [
  { id: 101, name: "Laptop", price: 1200 },
  { id: 102, name: "Phone", price: 800 },
  { id: 103, name: "Tablet", price: 500 },
  { id: 104, name: "Smartwatch", price: 300 },
  { id: 105, name: "Headphones", price: 150 },
];

const orders = [
  {
    id: 1001,
    customerId: 1,
    items: [
      { productId: 101, quantity: 2 },
      { productId: 102, quantity: 1 },
    ],
  },
  {
    id: 1002,
    customerId: 2,
    items: [
      { productId: 102, quantity: 1 },
      { productId: 103, quantity: 3 },
    ],
  },
  {
    id: 1003,
    customerId: 3,
    items: [
      { productId: 104, quantity: 5 },
      { productId: 105, quantity: 2 },
    ],
  },
  {
    id: 1004,
    customerId: 4,
    items: [
      { productId: 101, quantity: 1 },
      { productId: 103, quantity: 2 },
    ],
  },
  { id: 1005, customerId: 5, items: [{ productId: 105, quantity: 10 }] },
  {
    id: 1006,
    customerId: 1,
    items: [
      { productId: 101, quantity: 1 },
      { productId: 105, quantity: 3 },
    ],
  },
  {
    id: 1007,
    customerId: 2,
    items: [
      { productId: 104, quantity: 2 },
      { productId: 103, quantity: 1 },
    ],
  },
  { id: 1008, customerId: 3, items: [{ productId: 102, quantity: 2 }] },
  {
    id: 1009,
    customerId: 4,
    items: [
      { productId: 101, quantity: 1 },
      { productId: 102, quantity: 1 },
    ],
  },
  {
    id: 1010,
    customerId: 5,
    items: [
      { productId: 103, quantity: 4 },
      { productId: 104, quantity: 3 },
    ],
  },
];

function getCustomerStatistics(customers, products, orders) {
  const stats = customers.map((customer) => {
    const customerOrder = orders.filter(
      (order) => order.customerId === customer.id,
    );
    const customerProduct = [];
    customerOrder.forEach((order) => {
      order.items.forEach((item) => {
        const productInfo = products.find(
          (product) => product.id === item.productId,
        );
        if (productInfo) {
          const existProduct = customerProduct.find(
            (cp) => cp.name === productInfo.name,
          );
          if (existProduct) {
            existProduct.quantity += item.quantity;
          } else {
            customerProduct.push({
              name: productInfo.name,
              quantity: item.quantity,
              totalSpent: 0,
            });
          }
        }
      });
    });
    let totalSpent = 0;
    customerProduct.forEach((cp) => {
      const productInfo = products.find((product) => product.name === cp.name);
      cp.totalSpent = productInfo.price * cp.quantity;
      totalSpent += cp.totalSpent;
    });
    customerProduct.sort((a, b) => b.totalSpent - a.totalSpent);
    return {
      id: customer.id,
      name: customer.name,
      totalSpent: totalSpent,
      products: customerProduct,
    };
  });
    stats.sort((a, b) => b.totalSpent - a.totalSpent);
  return stats;
}

console.log(getCustomerStatistics(customers, products, orders));
