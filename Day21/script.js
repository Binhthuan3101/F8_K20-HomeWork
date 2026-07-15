// const customers = [
//   { id: 1, name: "John Doe", email: "john@example.com" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com" },
//   { id: 3, name: "Alice Johnson", email: "alice@example.com" },
//   { id: 4, name: "Bob Brown", email: "bob@example.com" },
//   { id: 5, name: "Charlie Green", email: "charlie@example.com" },
// ];

// const products = [
//   { id: 101, name: "Laptop", price: 1200 },
//   { id: 102, name: "Phone", price: 800 },
//   { id: 103, name: "Tablet", price: 500 },
//   { id: 104, name: "Smartwatch", price: 300 },
//   { id: 105, name: "Headphones", price: 150 },
// ];

// const orders = [
//   {
//     id: 1001,
//     customerId: 1,
//     items: [
//       { productId: 101, quantity: 2 },
//       { productId: 102, quantity: 1 },
//     ],
//   },
//   {
//     id: 1002,
//     customerId: 2,
//     items: [
//       { productId: 102, quantity: 1 },
//       { productId: 103, quantity: 3 },
//     ],
//   },
//   {
//     id: 1003,
//     customerId: 3,
//     items: [
//       { productId: 104, quantity: 5 },
//       { productId: 105, quantity: 2 },
//     ],
//   },
//   {
//     id: 1004,
//     customerId: 4,
//     items: [
//       { productId: 101, quantity: 1 },
//       { productId: 103, quantity: 2 },
//     ],
//   },
//   { id: 1005, customerId: 5, items: [{ productId: 105, quantity: 10 }] },
//   {
//     id: 1006,
//     customerId: 1,
//     items: [
//       { productId: 101, quantity: 1 },
//       { productId: 105, quantity: 3 },
//     ],
//   },
//   {
//     id: 1007,
//     customerId: 2,
//     items: [
//       { productId: 104, quantity: 2 },
//       { productId: 103, quantity: 1 },
//     ],
//   },
//   { id: 1008, customerId: 3, items: [{ productId: 102, quantity: 2 }] },
//   {
//     id: 1009,
//     customerId: 4,
//     items: [
//       { productId: 101, quantity: 1 },
//       { productId: 102, quantity: 1 },
//     ],
//   },
//   {
//     id: 1010,
//     customerId: 5,
//     items: [
//       { productId: 103, quantity: 4 },
//       { productId: 104, quantity: 3 },
//     ],
//   },
// ];

// function combineItems(...itemArr) {
//   const newArr = [];
//   itemArr.forEach((items) => {
//     if (!items) return;
//     items.forEach((item) => {
//       const existingItem = newArr.find(
//         (newItem) => item.productId === newItem.productId,
//       );
//       if (!existingItem) {
//         newArr.push(item);
//       } else {
//         existingItem.quantity += item.quantity;
//       }
//     });
//   });
//   return newArr.map((item) => {
//     const product = products.find((product) => product.id === item.productId);
//     delete item.productId;
//     item.name = product.name;
//     item.totalSpent = item.quantity * product.price;
//     return item;
//   });
// }

// function filterOrdersByCustomerId(customerId) {
//   return orders.filter((order) => order.customerId === customerId);
// }

// function calculateTotalSpent(order) {
//   return order.items.reduce((sum, item) => {
//     const product = products.find((product) => product.id === item.productId);
//     return sum + product.price * item.quantity;
//   }, 0);
// }

// function getCustomerStatistics(customers, products, orders) {
//   const result = customers.map((customer) => {
//     return {
//       id: customer.id,
//       name: customer.name,
//       totalSpent: filterOrdersByCustomerId(customer.id).reduce(
//         (result, order) => result + calculateTotalSpent(order),
//         0,
//       ),
//       products: combineItems(
//         ...filterOrdersByCustomerId(customer.id).map((order) => order.items),
//       ),
//     };
//   });
//   return result.sort((a, b)=>b.totalSpent - a.totalSpent);
// }

// console.log(getCustomerStatistics(customers, products, orders));

const products = [
  { name: "Áo thun", category: "Thời trang", price: 150000 },
  { name: "Laptop", category: "Điện tử", price: 15000000 },
  { name: "Quần jean", category: "Thời trang", price: 300000 },
  { name: "Tai nghe", category: "Điện tử", price: 500000 },
];

console.log(Object.groupBy(products, (product) => product.category));

const user = {
  name: "Nguyễn Văn A",
  age: 18,
};

Object.defineProperty(user, "address", {
  value: "Hà Nội",
  writable: true,
  enumerable: false,
  configurable: false,
});
console.log(user);

Object.defineProperty(user, "info", {
  get() {
    return `${this.name} - ${this.age}- ${this.address}`;
  },
  set(value) {
    const parts = value.split("-");
    this.name = parts[0];
    this.age = parts[1];
  },
});

Object.defineProperties(user, {
  className: {
    value: "K20",
    writable: true,
  },
  school: {
    value: "ABC",
    writable: true,
  },
});

console.log(user);
console.log(Object.getOwnPropertyDescriptor(user));

console.log(Object.getOwnPropertyDescriptors(user));

console.log(Object.getOwnPropertyNames(user));

console.log(Object.getPrototypeOf(user));

// Ngăn chặn việc thêm mới
Object.preventExtensions(user);
user.city = "Hà Nội";
console.log(user);
console.log(Object.isExtensible(user));

// Chỉ sửa được
Object.seal(user);
user.skill = "JavaScript";
console.log(user);
console.log(Object.isSealed(user));

// Không sửa thêm xóa được
Object.freeze(user);
console.log(Object.isFrozen(user));

function User(name, age) {
  this.name = name;
  this.age = age;
}

User.prototype.address = "Hà Nội";

const use = new User("Thuận", 20);
// user kế thừa , hay là con của User.prototype
console.log(use.address);

const string = "Hello";
string.length;
String.prototype;
const arr = [1, 2, 3, 4, 5];
console.log(arr);

// string sẽ kế thừa String.Prototype
// number sẽ kế thừa Number.Prototype
// Boolean sẽ kế thừa Boolean.Prototype
// Object sẽ kết thừa Object.Prototype
//bigint sẽ kết thừa BigInt.Prototype
//symbol sẽ kế thừa Symbol.Prototype
//function sẽ kế thừa function.Prototype
Array.prototype.map2 = function (callback, thisArg) {
  let arr = [];
  const length = this.length;
  for (let i = 0; i < length; i++) {
    arr.push(callback.call(thisArg, this[i], i, this));
  }
  return arr;
};
Object.prototype.xyz = "xyz";
console.log(use.hasOwnProperty("xyz"));

