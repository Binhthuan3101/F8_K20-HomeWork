"use strict";
// console.log("Hello");
// let a: string | number = "Hello";
// function processValue(value: string | number) {
//   if (typeof a === "string") {
//     console.log(a.length);
//   } else {
//     console.log(a.toFixed(2));
//   }
// }
// processValue(a);
function showDate(date) {
    if (date instanceof Date) {
        console.log(date.toISOString());
    }
    else {
        console.log(new Date(date).toISOString());
    }
}
// function isProduct(product: unknown): product is Product {
//   const p = product as Product;
//   return (
//     typeof p === "object" &&
//     p !== null &&
//     typeof p.name === "string" &&
//     typeof p.price === "number"
//   );
// }
// let a = { name: "Laptop", price: 1000 };
// if (isProduct(a)) {
//   console.log(a.name);
//   console.log(a.price);
// }
class Product1 {
    title = "Product1";
    price = 100;
    getPrice() {
        return this.price;
    }
}
const product1 = new Product1();
function isString(value) {
    return typeof value === "string";
}
function processData(data) {
    return typeof data === "object";
}
function processString(value) {
    console.log(value);
}
function sum(a, b) {
    return true;
}
// type position
// value position
sum(1, "2");
// type a =...;
let b = "1";
async function request(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}
(async () => {
    const users = await request("https://api.example.com/users");
    users.forEach((user) => {
        console.log(user.name);
    });
})();
const inputElement = document.querySelector(".greeting");
if (inputElement) {
    if (inputElement instanceof HTMLInputElement) {
        console.log(inputElement.value);
    }
}
inputElement?.addEventListener("input", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement))
        return;
    console.log(target.value);
});
