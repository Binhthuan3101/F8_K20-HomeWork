const user = { name: "An" };

Object.defineProperty(user, "id", {
  value: 1001,
  writable: false,
  configurable: false,
  enumerable: true,
});
user.id = 999;
console.log(user);

for (const key in user) {
  console.log(key);
}
console.log(Object.keys(user));

const product = {};
Object.defineProperties(product, {
  name: {
    value: "Bàn Phím",
    writable: true,
    enumerable: true,
  },
  price: {
    value: 500000,
    writable: true,
    enumerable: true,
  },
  discountedPrice: {
    get() {
      return this.price * 0.9;
    },
  },
});
console.log(product.discountedPrice);
console.log(product);

// Ex:04

console.log(Object.getOwnPropertyDescriptor(product, "price"));
// Ẽ:05
console.log(Object.getOwnPropertyNames(product));
console.log(Object.keys(product));

const appConfig = {
  theme: "dark",
  fontSize: 16,
  language: "vi",
};

Object.preventExtensions(appConfig);
appConfig.abc = "abc";
appConfig.fontSize = 20;
delete appConfig.language;
console.log(appConfig);
console.log(Object.isExtensible(appConfig));
// Ex: 06
// seal không thêm chỉ sửa
const session = {
  userId: 101,
  username: "minh le",
  role: "student",
  lastActive: Date.now(),
};

Object.seal(session);

const APP_CONSTANTS = {
  API_BASE_URL: "https://api.example.com",
  MAX_RETRIES: 3,
  TIMEOUT_MS: 5000,
};
// Object APP_CONSTANTS về nguyên tắc không được thay đổi nên nếu dùng seal vẫn có thể gán lại giá trị nên sẽ dễ gây bug với Object yêu cầu không sửa không thêm không xóa
Object.freeze(APP_CONSTANTS);
APP_CONSTANTS.MAX_RETRIES = 10;
delete APP_CONSTANTS.TIMEOUT_MS;
APP_CONSTANTS.NEW_FLAG = true;
console.log(APP_CONSTANTS);
console.log(Object.isFrozen(APP_CONSTANTS));

function Product(name, price) {
  this.name = name;
  this.price = price;
  
}

Product.prototype.getInfo = function () {
    return `Tên: ${this.name}, Giá: ${this.price}`;
  };

const product1 = new Product("Bàn phím", 1000000);
const product2 = new Product("Loa", 1500000);
console.log(product1.getInfo());
console.log(product2.getInfo());
console.log(product1 instanceof Product);
console.log(Object.getPrototypeOf(product1));
console.log(Object.getPrototypeOf(Product.prototype));
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Product.prototype)));

const greeter = {
  greet() {
    return `Xin chào, tôi là ${this.name}`;
  },
};

const student1 = { name: "Hoa" };
const student2 = { name: "An" };


// các iterable: Array, String
const points = [10, 20, 30, 40, 50];
// for (const point of points) {
//     console.log(point);
    
// }
console.log(points[Symbol.iterator]().next());


// Object Math
// Math.PI
// Math.E
// Math.SQRT2
console.log(Math.floor(Math.random()*10)+1);


const date = new Date("2026-05-10T10:20:30+07:00");
console.log(date.toString());
// Tiêu chuẩn ISO Date (YYYY-MM-DDTHH:mm:ss.sssZ)
// Short 
console.log(date);

console.dir(Date.parse("1970-01-01T00:00:01Z"));
console.log(Date.now());

