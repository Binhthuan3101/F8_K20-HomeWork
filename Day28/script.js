// Bất đồng bộ ()
// js là ngôn ngữ đa nguồn
// js là ngôn ngữ bất đồng bộ
// setTimeout(() => {
//   console.log(2);
// }, 2000);
// console.log(3);

// Asynchronous  callback

// callback
// promise
// Async/await

// function executeNumber(num) {
//   return Number(num);
// }
// function sum(num1, num2, callback) {
//   return callback(num1 + num2);
// }

// console.log(sum(1,2,executeNumber));

const xhr = new XMLHttpRequest();
// xhr.open("GET", "https://api01.f8team.dev/api/products");
// xhr.onreadystatechange = function () {
//     if (xhr.readyState===4&&xhr.status===200) {
//         console.log(JSON.parse(xhr.responseText));

//     }
// }
// xhr.onerror = function () {
//     console.log("Error");

// }
// xhr.send();

// setTimeout(() => {
//     console.log(1);
//     setTimeout(() => {
//         console.log(2);

//     }, 1000);

// }, 1000);

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success 2");
  }, 2000);
});

// promise.then(result => {
//     console.log(result);
//     return promise2;
//     }).catch((error) => {
//     console.log(error);

//     })

// const fetchData = async () => {
//   const result = await promise;
//   console.log(result);

//   const result2 = await promise2;
//   console.log(result2);
// };
// fetchData();

// Đoạn code đồng bộ
// Đoạn code bất đồng bộ

// Bước 1: Đoạn code Tính toán ...->Gửi lên server
// Bước 2: Đoạn code Xử lý kết quả

// Gửi lên server
// const promise = new Promise((resolve, reject) => {
//   const num1 = 1;
//   const num2 = 2;
//   const sum = num1 + num2;
//   setTimeout(() => {
//     resolve("success");
//     // reject("Failed")
//   }, 4000);
// });
// promise.then(() => {
//   const result = {
//     id: 3,
//     name: "Iphone 18",
//     price: 1200,
//     stock: 100,
//   };
//   console.log(
//     `Tên sản phẩm: ${result.name}, giá: ${result.price}, Kho:${result.stock}`,
//   );
// });
// const promise = new Promise((resolve, reject) => {
//   const num1 = 1;
//   const num2 = 2;
//   const sum = num1 + num2;
//   setTimeout(() => {
//     resolve(sum);
//   }, 2000);
// });
// const fetchData = async () => {
//   await promise;
//   const result = {
//     id: 3,
//     name: "Iphone 18",
//     price: 1200,
//     stock: 100,
//   };
//   console.log(
//     `Tên sản phẩm: ${result.name}, giá: ${result.price}, Kho:${result.stock}`,
//   );
// };
// fetchData();
// const result = {
//     id: 3,
//     name: "Iphone 18",
//     price: 1200,
//     stock: 100,
// };
//    console.log(
//     `Tên sản phẩm: ${result.name}, giá: ${result.price}, Kho:${result.stock}`,
//   );
// const promise = new Promise((resolve, reject) => {
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       console.log(JSON.parse(xhr.responseText));
//     }
//   };
// });
function a() {
  console.log("hello");
}
// for (let i = 0; i < 100; i++){
//     console.log(i);

// }
a();

const promise = {
  then(callback) {
    callback();
  },
};
promise.then(() => {
  console.log("hello");
});
const productList = document.querySelector("#product-list");

function rendreProducts(products) {
  const htmlString = products.map((product) => {
    return `<li class="border border-gray-300 rounded-lg overflow-hidden">
        <a href="./product-detail.html?id=${product.id}" class="flex flex-col gap-3">
            <img class="w-full h-[100px]  object-cover" src="${product.thumbnail}" alt="${product.title}"/>
            <div class="p-4">
                <p class="font-bold">${product.title}</p>
                <p class="text-red-500 font-bold">${product.price}</p>
            </div>
        </a>
        </li>`;
  }).join("");
  productList.innerHTML = htmlString;
}

const fetchData = async () => {
  const result = await fetch("https://api01.f8team.dev/api/products");
  const body = await result.json();
  const products = body.data.items;
  rendreProducts(products);
};
fetchData();
