function sum(...args) {
  let sum = 0;
  for (let arg of args) {
    sum += arg;
  }
  return sum;
}

console.log(sum(1, 2, 3, 4));
const user = { name: "Minh", age: 22, email: "minh@example.com" };
user.phone = "0901234567";
user.age = 23;
console.log(user);
console.log(user.name);
console.log(user.email);
delete user.email;
console.log(user);
const car = { brand: "Toyota", year: 2020 };
console.log("color" in car);
console.log("brand" in car);

const school = {
  name: "Nguyễn Huệ",
  address: { street: "123 Lê Lợi", city: "Hồ Chí Minh" },
};

console.log(school.name);
console.log(school.address.city);

const num = 10;
const stringNum = String(num);
const stringUser = String(user);
console.log(num);
console.log(stringNum);
console.log(stringUser);
console.log([user.name, user.age]);

console.log(JSON.stringify(user));
console.log(JSON.parse(JSON.stringify(user)));

console.log(Object.keys(user));
console.log(Object.values(user));

for (const key in user) {
  console.log(key);
}

console.log(Object.entries(user));

//Destructuring
for (const [key, value] of Object.entries(user)) {
  console.log(`${key}: ${value}`);
}

console.log(Object.fromEntries(Object.entries(user)));

const { name, age } = user;
console.log(name);

const product = { id: 1, name: "Laptop" };
console.log("Sản phẩm: " + product); //Tại vì dấu + đây ép kiểu nối chuỗi nên ra Sản phẩm: Sản phẩm: [object Object]
console.log("Sản phẩm:", product);

console.log(JSON.stringify(product));
console.log(JSON.stringify(product, null, 2));
//về mặt giống thì đều chuyển về string về mặt khác thì cái dưới vẫn giữ nguyên kiểu dạng object
const person = { name: "Hoa", age: 25, city: "Đà Nẵng" };
for (const key in person) {
    console.log(`${key}: ${person[key]}`);
    
}

function sum(a, b) {
    console.log(this);
    return a+ b    
}

sum(2, 3);

//constructors
const people1 = {
    name: "Đậu Bình Thuận",
    age: 20,
}

const people2 = new Object({
    name: "Khánh Ly",
    age: 19,
})

function User(name, age, language) {
    this.name = name;
    this.age = age;
    this.language = language;
    this.address = "Việt Nam"
}

const user1 = new User("Đậu Bình Thuận", 20,"JavaScript");
console.log(user1);
User.prototype.learning = "Python";
console.log(user1.learning );
