const baseProto = {
  introduce() {
    return `Tôi là ${this.name}, ${this.age} tuổi`;
  },
};

const levelTwoProto = Object.create(baseProto);
levelTwoProto.getInfo = function () {
  return `${this.name} làm ở ${this.department}, lương ${this.salary}`;
};
const item1 = Object.create(levelTwoProto);
item1.name = "Nguyễn Văn A";
item1.age = 28;
item1.department = "IT";
item1.salary = 15000000;
console.log(item1);

const item2 = Object.create(levelTwoProto);
item2.name = "Trần Thị B";
item2.age = 30;
item2.department = "Marketing";
item2.salary = 12000000;
console.log(item2);

const item3 = Object.create(levelTwoProto);
item3.name = "Lê Văn C";
item3.age = 25;
item3.department = "Sales";
item3.salary = 10000000;
console.log(item3);

const item4 = Object.create(levelTwoProto);
item4.name = "Phạm Thị D";
item4.age = 27;
item4.department = "HR";
item4.salary = 11000000;
console.log(item4);

const item5 = Object.create(levelTwoProto);
item5.name = "Nguyễn Văn E";
item5.age = 32;
item5.department = "Finance";
item5.salary = 13000000;
console.log(item5);

const items = [item1, item2, item3, item4, item5];

function checkOwnProperty(obj, property) {
  return Object.hasOwn(obj, property);
}

console.log(item1.introduce());
// Output: "Tôi là Nguyễn Văn A, 28 tuổi"

console.log(item1.getInfo());
// Output: "Nguyễn Văn A làm ở phòng IT, lương 15000000"

console.log(checkOwnProperty(item1, "name"));
// Output: true

console.log(checkOwnProperty(item1, "introduce"));
// Output: false

const newProto = {
  getInfo() {
    return `Câu mô tả khác hẳn, lấy từ newProto`;
  },
};
console.log(Object.getPrototypeOf(item1) === levelTwoProto);
// Output: true
console.log(Object.getPrototypeOf(levelTwoProto) === baseProto);
// Output: true

Object.setPrototypeOf(item4, newProto);
console.log(item4.getInfo());
// Output: câu mô tả khác hẳn, lấy từ newProto

console.log(Object.getOwnPropertyNames(item1));
// Output: ["name", "age", "department", "salary"]

console.log(Object.getOwnPropertyDescriptor(item1, "salary"));
// Output: { value: 15000000, writable: true, enumerable: true, configurable: true }


Object.seal(item2);
item2.bonus = 1000000;
console.log(item2.bonus);
// Output: undefined

item2.salary = 20000000;
console.log(item2.salary);
// Output: 20000000

console.log(Object.isSealed(item2));
// Output: true

const grouped = Object.groupBy(items, item => item.department);
console.log(grouped);
// Output: object chứa các mảng item, đã nhóm theo phòng ban

const lookup = Object.fromEntries([["A001", "Nguyễn Văn A"], ["A002", "Trần Thị B"]]);
console.log(lookup);
// Output: { A001: "Nguyễn Văn A", A002: "Trần Thị B" }
console.log(lookup["A002"]);
// Output: "Trần Thị B"