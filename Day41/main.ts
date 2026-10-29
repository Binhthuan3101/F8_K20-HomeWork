// type CartItem = {
//   readonly productId: string;
//   name: string;
//   unitPrice: number;
//   quantity: number;
// };

// type Cart = {
//   CartId: string;
//   currents: "VND";
//   items: readonly CartItem[];
//   couponCode?: string;
// };

// function addItem(cart: Cart, item: CartItem): Cart | never {
//   if (item.quantity <= 0 || item.unitPrice < 0 || item.productId === "") {
//     throw new Error("Invalid item");
//   }
//   const existItem = cart.items.find((i) => i.productId === item.productId);

//   if (existItem) {
//     existItem.quantity += item.quantity;
//     return {
//       ...cart,
//     };
//   }
//   return {
//     ...cart,
//     items: [...cart.items, item],
//   };
// }

// function subtotal(cart: Cart): number {
//   return cart.items.reduce(
//     (sum, item) => sum + item.quantity * item.unitPrice,
//     0,
//   );
// }

// function discount(cart: Cart): number {
//   if (cart.couponCode === "SALE10") {
//     return Math.round(subtotal(cart) * 0.1);
//   }
//   return 0;
// }

// function shippingFee(cart: Cart) {
//   if (subtotal(cart) >= 500_000) {
//     return 0;
//   }
//   return 30_000;
// }

// function formatMoney(value: number) {
//   return `${value.toLocaleString("vi-VN")} đ`;
// }

// function priceRange(cart: Cart) {
//   if (cart.items.length === 0) {
//     throw new Error("Cart is empty");
//   }
//   const min = Math.min(...cart.items.map((item) => item.unitPrice));
//   const max = Math.max(...cart.items.map((item) => item.unitPrice));
//   return [min, max];
// }

// async function validateCoupon(code: string): Promise<boolean> {
//   const response = await new Promise<boolean>((resolve) => {
//     setTimeout(() => {
//       if (code.trim().toUpperCase() === "SALE10") {
//         resolve(true);
//       } else {
//         resolve(false);
//       }
//     }, 500);
//   });
//   return response;
// }

// async function func1(): Promise<string> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve("hello");
//     }, 600);
//   });
// }

//Interface, type alias và declaration
// interface User {
//   name: string;
//   age: number;
// }

// const user1: User = {
//   name: "John",
//   age: 35,
// };

// const user2: User = {
//   name: "jane",
//   age: 20,
// };

// interface User {
//   address: {
//     street: string;
//   };
// }

// const user3: User = {
//   name: "Jerry",
//   age: 20,
//   address: {
//     street: "Hà Nội",
//   },
// };

// interface Response1 {
//   status: number;
// }

// interface Response1 {
//   data: {
//     name: string;
//     age: number;
//   };
// }
// const response1 = {
//   status: 200,
//   data: {
//     name: "John",
//     age: 20,
//   },
// };

// function handleResponse(response:Response1) {
//   console.log(response.data.name);

// }

// handleResponse(response1)

// type User = {
//   name: string;
//   age: number;
// };

// const user1: User = {
//   name: "John",
//   age: 20,
// };

// type NumberArray = number[];
// type StringNumberTuple = [string, number];
// type StringOrNumber = string | number | boolean;
// let value: StringOrNumber;
// value = "Hello";
// value = 20;
// value = true;

// function printValue(value: StringOrNumber) {
//   if (typeof value === "string") {
//     console.log(value.length);
//   }
// }

// type SuccessResult = {
//   status: "Success";
//   data: string[];
// };

// type ErrorResult = {
//   status: "Error";
//   message: string;
// };
// type Result =
//   | {
//       status: "Success";
//       data: string[];
//     }
//   | {
//       status: "Error";
//       message: string;
//     };

// function showResult(result: Result) {
//   if (result.status === "Success") {
//     console.log(result.data);
//   } else {
//     console.log(result.message);
//   }
// }

// type StringNumberArray = (string | number)[];
// const array: StringNumberArray = ["hello", 123, "world", 456];

// type User = {
//   name: string;
//   age: number;
// };
// type Employee = User & {
//   salary: number;
// } & {
//   address: {
//     street: string;
//   };
// };

// const employee: Employee = {
//   name: "John",
//   age: 20,
//   salary: 50000,
//   address: {
//     street: "123 lĩnh nam",
//   },
// };


// type StringAndNumber = string & number;

// type Type2 = string & "hello";
// let value: null = null;
// let value2: undefined = undefined;

// let username: string = null;
// let value3: unknown = "hello";
// value3 = 123;

// if (typeof value3 === "string") {
//   console.log(value3.length);
// }

// function funcB(value) {
  
// }

const inputEl = document.querySelector(".greeting") as HTMLInputElement;
if (inputEl) {
  console.log(inputEl.value);

}