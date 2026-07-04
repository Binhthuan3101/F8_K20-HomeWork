let x = 3.14; //Số thập phân
let y = 2; //Số nguyên;

const number = 10;
const number1 = -1;
const number2 = 10.33;
const number3 = 123e2;

//số nguyên độ chính xác tới 15 chữ số
const number4 = 123456789123456789; //15 chữ số
console.log(number4);

const number5 = 0.1;
const number6 = 0.2;
console.log(number5 + number6);

//64 bit để biểu diễn số(kiểu number)
//1 bit: dấu
//11 bit: mũ
//51 bit: phần thập phân

//12345->1.2345*(10**4)=>12345
//1x10^10->10000000000
//2^52-1->

//mình có 2 bit biểu diễn số lớn nhất có thể biểu điễn là gì
//11
//Có hệ thập phân:0, 1, 2, 3, 4, 5, 6, 7, 8, 9
//Có hệ nhị phân:0, 1
//Có hệ thập lục phân:0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F
//#fff
//10->2^1+2^0=3
//|1|1|->2^1+2^0=3
//100-1=2^2-1

const value = 80.123456789;
const value1 = new Number(80);
console.log(value.toString(2));
console.log(value.toString());
console.log(value.valueOf());
console.log(value.toExponential(5));
console.log(value.toFixed(5));

// const prices = [1000.157, 59.9797, 1.1];
// console.log(prices.map(price => price.toFixed(2)));

//Làm tròn đến n số
//toPrecision(n): làm tròn đến n chữ số chõ nghĩa
const score = 123.456789;
const score1 = 1234.56789;
console.log(score.toPrecision(5));
console.log(parseInt(10));
console.log(parseInt("10 Year"));
console.log(parseFloat("10.33"));
console.log(Number.isInteger(10));
console.log(Number.isNaN(NaN));
console.log(Number.isFinite(Infinity));
console.log(Number.isSafeInteger(37287493548033));
console.log(Number.MAX_SAFE_INTEGER - (2 ** 53 - 1));
console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.POSITIVE_INFINITY);
console.log(Number.NEGATIVE_INFINITY);
console.log(Number.NaN);

//Number property
//Number.EPSILON
//Number.MAX_VALUE
//Number.MIN_VALUE
//Number.MAX_SAFE_INTEGER
//Number.MIN_SAFE_INTEGER
//Number.POSITION_INFINITY
//Number.NEGATIVE_INFINITY
//Number.NaN

//Declaration function
// function name() {

// }
//Expression function
// const name = function () {

// }

// //arrow function
// const name = () => {

// }

// //Anonymous function
// function () {

// }
// () => { }

//IIFE
(function () {
  console.log("Hello");
})();

const prices = [100, 200, 300, 400, 500];
const total = prices.reduce((prev, curr) => {
  return prev + curr;
}, 0);

//Lần 1:
//Có đối số thứ 2: 0
//(0, 100)=>{return prev + curr;}
//kết quả: 100

//Lần 2:
//Lấy kết quả lần 1 làm prev: 100
//(100, 200)=>{return 100+200}
//Kết quả : 300

//Lần 3:
//Lấy kết quả lần 2 làm prev: 300
//(300, 300)=>{return 300+300}
//Kết quả: 600

const entries = [
  ["name", "Đậu Bình Thuận"],
  ["age", 20],
];

const obj = entries.reduce((prev, curr) => {
  let key = curr[0];
  let value = curr[1];
  prev[key] = value;
  return prev;
});
const str = entries.reduce((prev, curr, index) => {
  let key = curr[0];
  let value = curr[1];
  if (index === 0) {
    return key + "=" + value;
  }
  return prev +";"+ key + "=" + value;
}, "");
console.log(obj);
console.log(str);
