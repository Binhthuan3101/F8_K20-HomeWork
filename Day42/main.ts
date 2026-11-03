// // console.log("Hello");
// // let a: string | number = "Hello";
// // function processValue(value: string | number) {
// //   if (typeof a === "string") {
// //     console.log(a.length);
// //   } else {
// //     console.log(a.toFixed(2));
// //   }
// // }
// // processValue(a);

// function showDate(date: Date | string) {
//   if (date instanceof Date) {
//     console.log(date.toISOString());
//   } else {
//     console.log(new Date(date).toISOString());
//   }
// }

// // function isProduct(product: unknown): product is Product {
// //   const p = product as Product;
// //   return (
// //     typeof p === "object" &&
// //     p !== null &&
// //     typeof p.name === "string" &&
// //     typeof p.price === "number"
// //   );
// // }

// // let a = { name: "Laptop", price: 1000 };
// // if (isProduct(a)) {
// //   console.log(a.name);
// //   console.log(a.price);
// // }

// class Product1 {
//   title = "Product1";
//   price = 100;
//   getPrice() {
//     return this.price;
//   }
// }
// const product1 = new Product1();

// function isString(value: unknown): value is string {
//   return typeof value === "string";
// }

// function processData(data: unknown): data is object {
//   return typeof data === "object";
// }

// function processString(value: string) {
//   console.log(value);
// }

// function sum<T, K>(a: T, b: K) {
//   return true;
// }

// // type position
// // value position

// sum<number, string>(1, "2");
// // type a =...;

// let b: "1" = "1";
// type Product<T> = {
//   id: T;
//   name: string;
//   price: number;
// };
// type Product2<T> = {
//   id: T;
//   name: T;
// };

// type StringProduct = Product<string>;
// type NumberProduct = Product<number>;

// async function request<T>(url: string): Promise<T> {
//   const res = await fetch(url);
//   const data = await res.json();
//   return data as Promise<T>;
// }

// type User = {
//   id: number;
//   name: string;
//   email: string;
// };

// (async () => {
//   const users = await request<User[]>("https://api.example.com/users");
//   users.forEach((user) => {
//     console.log(user.name);
//   });
// })();

// const inputElement = document.querySelector<HTMLInputElement>(".greeting");
// if (inputElement) {
//   if (inputElement instanceof HTMLInputElement) {
//     console.log(inputElement.value);
//   }
// }

// inputElement?.addEventListener("input", (e) => {
//   const target = e.target;
//   if (!(target instanceof HTMLInputElement)) return;
//   console.log(target.value);
// });

// class Order {
//   constructor(
//     private id: number,
//     private status: "pending" | "shipped" | "delivered" | "canceled",
//   ) {}
//   cancel() {
//     if (this.status === "pending") {
//       this.status = "canceled";
//     } else {
//       console.log("Can't cancel order");
//     }
//   }
// }

class BankAccount {
  constructor(private balance: number) {
    this.balance = balance;
  }
  deposit(amount: number) {
    this.balance += amount;
  }
  withdraw(amount: number) {
    if (amount > this.balance) {
      console.log("Số tiền rút quá số dư");
      return;
    }
    this.balance -= amount;
  }
  getBalance() {
    return this.balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance());

// interface Animal {
//   name: string;
//   sound(): ()=>void;
// }

// const cat: Animal = {
//   name: "Mèo",
//   sound() {
//     console.log("Meo");
//   },
// };
abstract class Animal {
  constructor(public name: string) {}
  abstract sound(): void;
}

interface Payment {
  isOnlinePayment(): boolean;
}

interface Payment2 {
  showCertificate(): void;
}

abstract class Order {
  constructor(
    private id: number,
    private status: "pending" | "paid" | "shipped" | "canceled",
  ) {}
  abstract payment(): void;
  showStatus() {
    console.log(`Order ${this.id} is ${this.status}`);
  }
  changeStatus(status: "pending" | "paid" | "shipped" | "canceled") {
    this.status = status;
  }
}

class SePayOrder extends Order implements Payment, Payment2 {
  isOnlinePayment(): boolean {
    return true;
  }

  showCertificate(): void {
    console.log("Certificate");
  }
  payment(): void {
    console.log("Pay with Sepay");
    this.changeStatus("paid");
  }
}
class VNPayOrder extends Order {
  payment(): void {
    console.log("Pay with VNPay");
    this.changeStatus("paid");
  }
}

const order1 = new SePayOrder(1, "pending");
order1.payment();
order1.showStatus();
const order2 = new VNPayOrder(2, "pending");
order2.payment();
order2.showStatus();
// Tính kế thừa
class User {
  constructor(
    private id: number,
    private name: string,
    private age: number,
  ) {}
  showInfo() {
    console.log(`User ${this.id}: ${this.name}, ${this.age} year old`);
  }
}

class Employee extends User {
  constructor(
    id: number,
    name: string,
    age: number,
    private salary: number,
  ) {
    super(id, name, age);
  }
  override showInfo(): void {
    console.log("Child showInfo");
  }
  showSalary() {
    console.log(`Salary: ${this.salary}`);
  }
  showValue(value: string): string;
  showValue(value: number): number;
  showValue(value: string | number): string | number {
    if (typeof value === "string") {
      return `String: ${value}`;
    } else {
      return value * 2;
    }
  }
}
const employee = new Employee(1, "john", 20, 17000000);
employee.showInfo();
employee.showSalary();

// Tính đa hình
// Tính nạp chồng

const employee2 = new Employee(2, "Jane Doe", 25, 6000);
employee2.showInfo();
employee2.showSalary();
employee2.showValue(200);
