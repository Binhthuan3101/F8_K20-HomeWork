// const string = "Hello world"
// console.log(string.length);
// console.log(string);

// const user = {
//     name: "John",
//     age: 30
// }

// user.abc = "Hello"
// console.log(user);
// let greeting = "Hi F8"

// //literal types
// let a: "Hello F8" = "Hello F8";
// a = "Hi F8"
// console.log(a);

// let user: {
//   // readonly name: string ngăn gán giá trị
//   name: string;
//   age: number;
//   isActive?: boolean;
// };

// user = {
//     name: "John",
//     age: 30
// }
// user.name="John"
// user.age = 30
// console.log(user);

// const numbers: number[] = [1, 2, 3, 4, 5];

const user: [string, number, boolean] = ["John", 30, true];
// const [state, setState]: [boolean,(boolean)=>void] = useState(true);

// Function types
function add(a: number, b?: string, c = 10, ...parameters: number[]) {
  return a;
}

function loop(): never {
  while (true) {
    console.log("Hello");
  }
}
function throwError(): never {
  throw new Error("Something went wrong");
}

let func1: (a: number, b: number) => number;

func1 = (a: number) => a;
function func2() {
  console.log(arguments[0] + arguments[1]);

  return 10;
}

func1 = func2;
func1(1, 2);

// function A(a: number, b: number | undefined) {
//     return 10;
// }
// A(10,undefined)
