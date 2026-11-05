import { User2, User3 } from "./child";

let user = {
  name: "Vũ Quốc Dũng",
  age: 28,
  email: "example@gmail.com",
};

type User = typeof user;

console.log(typeof user);
type MyString = User["age"];

function getValue<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}

let a1: string = "hello";
type User1 = {
  name: string;
  age: number;
};
type KeyOfUser = keyof User;

console.log(getValue(user, "name"));

type OptionalUser = Partial<User>;

type RecordUser = Record<keyof User, number>;
let recordUser: RecordUser = {
  name: 20,
  age: 30,
  email: 30,
};

console.log(recordUser);

type status = "success" | "error" | "loading";
type StatusObject = Record<status, string>;
let statusObject: StatusObject = {
  success: "Thành công",
  error: "Lỗi",
  loading: "Đang tải",
};

console.log(statusObject);

type Order = "pending" | "shipped" | "delivered";

function showValue(value1: string, value2: number) {
  console.log(value1, value2);

  let params: [string, number] = ["hello", 20];
  showValue(...params);
}
type ParameterType = Parameters<typeof showValue>;

type Flags<T> = {
  [K in keyof T]: boolean;
};

type Product = { id: number; name: string; price: number };

type ProductFlags = Flags<Product>;

type MyOptional<T> = {
  [K in keyof T]: T[K];
};

type ProductOptional = MyOptional<Product>;

let n: string = "hello";
type StringOrNumber = string | number;
let m: StringOrNumber = n;

type A = string extends StringOrNumber ? "true" : "false";

// infer
type Parameters2<T extends (...arg: any) => any> = T extends (
  ...arg: infer P
) => any
  ? P
  : never;

type Size = "sm" | "md";
type Button = `btn-${Size}`;

let button1: Button = "btn-md";
let button2: Button = "btn-sm";

let user2: User2 = {
  name: "Vũ Quốc Dũng",
  age: 20,
  email: "example@gmail.com",
};

const user3 = new User3("Vũ Quốc Dũng", 20);
const user4: User3 = user3;
console.log(user3);
console.log(user4);

type B = typeof User3;

let C: B = User3;
console.log(C);
