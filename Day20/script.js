// - Exercise 6 (this trong object method): Tạo object `dog` với `name: "Milo"` và method `bark()` in ra `"Woof! I'm " + this.name`. Gọi `dog.bark()`.

const dog = {
  name: "Milo",
  bark() {
    console.log(`Woof! I'm ${this.name}`);
  },
};
dog.bark();
console.log(dog.bark());

const person = {
  name: "Hoa",
  age: 25,
  city: "Đà Nẵng",
};

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}

// exercise 9:
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person("Bình Thuận", 20);
console.log(`Bạn ${person1.name} ${person1.age} tuổi`);

function Animal(name, sound) {
  this.name = name;
  this.sound = sound;
  this.makeSound = function () {
    console.log(`${this.name} say ${this.sound}`);
  };
}

const dogs = new Animal("Chó", "Gâu Gâu");
console.log(dogs.makeSound());

function Student(name, age) {
  this.name = name;
  this.age = age;
  this.scores = [];
  this.addScore = function (score) {
    this.scores.push(score);
  };
  this.getAverage = function () {
    if (this.scores.length === 0) {
      return 0;
    }
    const total = this.scores.reduce((total, score) => total + score, 0);
    return total / this.scores.length;
  };
  this.getInfo = function () {
    console.log(`Học viên ${this.name}-${this.age} tuổi`);
  };
}

// cách tạo object
// const user = {};
// const user = new Object({});
// const User(name){
//     this.name = name;
// }
// console.log(Object.assign({}, { name: "Bình Thuận", age: 20 }, { language: "JavaScript" }))
// const userArr = [
//     {
//         name: "Nguyễn Văn A",
//         age: 20,
//     },
//     {
//         language: "JavaScript",
//     }, {
//         Skill: "soft Skills",
//     }
// ]
// const newObject = Object.create({
//     name: "Nguyễn Văn A",
//     age: 20,
// })
// console.log(newObject.name);
// console.log(newObject.age);

const arr = [
  ["Name", "Nguyễn Văn A"],
  ["age", 20],
];
const newObject = Object.fromEntries(arr);
console.log(newObject);

// this trong function thường xác định qua cách gọi :
// Gọi trực tiếp thì this trỏ đến window (trong trình duyệt) hoặc global object (trong nodejs)
// Gọi qua object thì this trỏ đến object đó
// this trong arrow function không có nên mượn this từ context bên ngoài, nên this trong arrow function sẽ trỏ đến object bên ngoài nếu arrow function được khai báo trong object
const address = {
  city: "Đà Nẵng",
  street: "Nguyễn Văn Linh",
  getAddress() {
    return `${this.street}, ${this.city}`;
  },
  country: "Việt Nam",
};
const user = {
  name: "Nguyễn Văn A",
  age: 20,
  intro() {
    console.log(this.address.getAddress());
  },
  address: address,
};
user.intro();

// undefined, vì this trong func() không trỏ đến user mà trỏ đến global object (window trong trình duyệt)

console.log(address.getAddress());

function greeting() {
  console.log(this);
  console.log("hello");
}

const newGreeting = greeting.bind(user);
newGreeting(); // this trỏ đến user
// bind() tạo ra một hàm mới với this được gán cố định, không thể thay đổi được
// call() và apply() gọi hàm ngay lập tức với this được gán cố định, có thể thay đổi được

const user1 = {
  name: "Nguyễn Văn A",
  age: 20,
  intro() {
    console.log(`Xin chào, tôi là ${this.name}, ${this.age} tuổi`);
  },
};

const user2 = {
  name: "Nguyễn Văn B",
  age: 25,
};
user1.intro.call(user2); // this trỏ đến user2
user1.intro.apply(user2); // this trỏ đến user2

const arr2 = [1, 2, 3, 4, 5];
const user5 = {
  name: "Nguyễn Văn A",
  age: 20,
  points: [10, 20, 30, 40, 50],
  intro() {
    this.points.forEach(function(point){
      console.log(`${this.name} có ${point} điểm`);
    }.bind(user5)); // bind() để this trỏ đến user5
  },
};

user5.intro();

// function User(name, age) {
//   this.name = name;
//   this.age = age;
// }
// const user6 = new User("Nguyễn Văn A", 20);
// console.log(user6.name);
// console.log(user6.age);

// Getters và Setters trong object
// getters và setters là các phương thức đặc biệt trong object, cho phép bạn truy cập và thiết lập giá trị của các thuộc tính của object một cách linh hoạt hơn. Getters được sử dụng để lấy giá trị của một thuộc tính, trong khi setters được sử dụng để thiết lập giá trị của một thuộc tính. Getters và setters có thể được định nghĩa bằng cách sử dụng từ khóa `get` và `set` trước tên phương thức.
const user7 = {
  name: "Nguyễn Văn A",
  age: 20,
  get UpperCaseName() {
    return this.name.toUpperCase();
  },
  set toUpperCase(name) {
    return (this.name = name.toUpperCase());
  },
};

console.log(user7.name);
user7.toUpperCase = "Nguyễn Văn B";
console.log(user7.name);

const thermometer = {
  _celsius: 0,
  get fahrenheit() {
    return (this._celsius * 9) / 5 + 32;
  },
  set fahrenheit(value) {
    this._celsius = ((value - 32) * 5) / 9;
  },
};

thermometer.fahrenheit = 212;
console.log(thermometer._celsius); // Output: 100
