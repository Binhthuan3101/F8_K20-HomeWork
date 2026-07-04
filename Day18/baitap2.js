const createCalculator = function () {
  return {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => (b === 0 ? "Lỗi chia cho 0" : a / b),
  };
};

const calculator = createCalculator();
console.log(calculator.add(2, 3));
// 5
console.log(calculator.subtract(10, 4));
// 6
console.log(calculator.multiply(3, 5));
// 15
console.log(calculator.divide(10, 2));
// 5
console.log(calculator.divide(10, 0));

function average(...numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((prev, curr) => prev + curr, 0);
  return sum / numbers.length;
}

console.log(average(10, 20, 30)); //20
console.log(average(5)); //5
console.log(average()); //0
console.log(average(1, 2, 3, 4, 5)); //3

function applyDiscount(price, discountPercent = 10) {
  if (!Number.isFinite(price) || price < 0) {
    return "Giá không hợp lệ";
  }
  return parseInt(price - price * (discountPercent / 100));
}

console.log(applyDiscount(100000));
console.log(applyDiscount(100000, 20));
console.log(applyDiscount(100000, 0));
console.log(applyDiscount("abc", 10));
console.log(applyDiscount(NaN, 10));

function safeCalculate(operation, ...numbers) {
    const validOperations = ["add", "subtract", "multiply", "average"];
    if (!validOperations.includes(operation)) {
        return "Phép tính không được hỗ trợ";
    }
    const hasInvalidNumber = numbers.some(number => !Number.isFinite(number));
    if (hasInvalidNumber || numbers.length === 0) {
        return "Kết quả không hợp lệ";
    }

    switch (operation) {
        case "add":
            return numbers.reduce((prev, curr) => prev + curr, 0);
        case "subtract":
            return numbers.reduce((prev, curr) => prev - curr);
        case "multiply":
            return numbers.reduce((prev, curr) => prev * curr, 1);
        case "average":
            const sum = numbers.reduce((prev, curr) => prev + curr, 0);
            return sum / numbers.length;
    }
}

console.log(safeCalculate("add", 1, 2, 3)); // 6
console.log(safeCalculate("multiply", 2, 3, 4)); // 24
console.log(safeCalculate("average", 10, 20)); // 15
console.log(safeCalculate("divide", 10, 2)); // "Phép tính không được hỗ trợ"
console.log(safeCalculate("add", 1, "abc", 3)); // "Kết quả không hợp lệ"
