function classifyTriangle(a, b, c) {
  const a2 = a * a;
  const b2 = b * b;
  const c2 = c * c;
  if (a <= 0 || b <= 0 || c <= 0) {
    return "Cạnh không hợp lệ";
  }
  else if (((a + b) <= c) || ((a + c) <= b) || ((c + b) <= a)) {
    return "Không tạo thành tam giác";
  } else if (a === b && b === c) {
    return "Tam giác đều";
  } else if (a2 +b2===c2 || a2 +c2===b2||b2+c2===a2) {
    return "Tam giác vuông";
  }
  else {
    return "Tam giác thường";
  }
}
console.log(classifyTriangle(2, 2, 2));//Tam giác đều
console.log(classifyTriangle(3, 4, 5)); //Tam giác vuông
console.log(classifyTriangle(1, 2, 10));//Không tạo ra tam giác