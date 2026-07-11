const config = {
  mucPhuPhi: 120000,
  phienBan: "1.0.0",
  toiDaPhanTu: 100,
};

Object.freeze(config);
config.mucPhuPhi = 0.5;
console.log(config.mucPhuPhi);

console.log(Object.isFrozen(config));
// Output: true

class MyClass {
  constructor(name) {
    this.name = name;
    this.items = [];
    this._discountPercent = 0;
    Object.defineProperty(this, "id", {
      value: "ID_INITIAL_VALUE",
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }
  addItem(name, price, quantity) {
    this.items.push({ name, price, quantity });
  }
  get total() {
    const totalItems = this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const totalWithFee = totalItems + config.mucPhuPhi;
    const finalTotal =
      totalWithFee - totalWithFee * (this._discountPercent / 100);
    return finalTotal;
  }
  set discountPercent(percent) {
    if (percent < 0 || percent > 100) {
      throw new Error("Discount phải từ 0 đến 100");
    }
    this._discountPercent = percent;
  }
}

function logSummary() {
  console.log(`${this.name}: ${this.total}`);
}

const instance = new MyClass("Danh sách của An");
instance.addItem("Bàn phím", 500000, 2);
instance.addItem("Chuột", 200000, 1);
console.log(instance);
console.log(instance.total);
// Output: 1320000

instance.discountPercent = 10;
console.log(instance.total);
// Output: 1188000

try {
  instance.discountPercent = 150;
} catch (e) {
  console.log(e.message);
}
// Output: một câu báo lỗi cho dễ hiểu, kiểu "Discount phải từ 0 đến 100"

setTimeout(logSummary.bind(instance), 100);
// Output sau 100ms: "Danh sách của An: 1188000"

console.log(Object.keys(instance));
// Output: mảng không có chữ "id" trong đó

instance.id = "hack123";
console.log(instance.id);
console.log(instance);

const obj1 = { name: "An", age: 20, languages: ["JS", "Python"] };
const obj2 = { name: "Bình", age: 20, address: { city: "Hà Nội", country: "Việt Nam" } };

const merger = Object.assign({}, obj1, obj2);
console.log(merger);
console.log(obj1);
console.log(obj2);